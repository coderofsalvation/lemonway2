const request = require('request')
var debug = require('debug')('lemonway')
var Socks5ClientHttpsAgent = require('socks5-https-client/lib/Agent')

module.exports = function(config){

  var lib = {}

  lib.sendRequest = function(methodName, postData) {
    Object.assign(postData, config)
    debug(methodName+":"+postData.version+" "+JSON.stringify(postData))

    var options = {
      url: config.endpoint + methodName,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      json: { "p": postData }
    }

	if( process.env.SOCKS5_HOST )
		options.agent = new Socks5ClientHttpsAgent({socksHost: process.env.SOCKS5_HOST, socksPort: process.env.SOCKS5_PORT })

    // Use promise to avoid callback hell
    var promise = new Promise(function (resolve, reject) {
      // Request
      request(options, function (error, response, body) {
        if(error) {
          // Handle request error
          lib.error(methodName, postData.version, postData, error, response, reject)
        } else if (response.statusCode != 200) {
          // Handle HTTP error
          lib.error(methodName, postData.version, postData, "Error " + response.statusCode + ": " + body.Message, response, reject)
        } else {
          if (body.d.E) {
            // Handle API error
            lib.error(methodName, postData.version, postData, body.d.E, response, reject)
          } else {
            resolve(body.d)
          }
        }
      })
    })

    return promise
  }

  lib.error = function(method, version, data, error, response, cb) {
	  console.log("lib.error lemonway2")
  	var message = method + ":" + version + " " + JSON.stringify(error)
  	var info = { error: message, "postData": data, response: response }
	debug(info)
  	cb(error)
  }

  var proxy = new Proxy(lib, {
    get: function(target, name, receiver){
      return function(version, data){
        data.version = version 
        return lib.sendRequest(name,data)
      }
    }
  })

  return proxy

}.bind({})
