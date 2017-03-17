const request = require('request')
var debug = require('debug')('lemonway')

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

    // Use promise to avoid callback hell
    var promise = new Promise(function (resolve, reject) {
      // Request
      request(options, function (error, response, body) {
        if(error) {
          // Handle request error
          lib.error(methodName, postData.version, postData, error, response)
        } else if (response.statusCode != 200) {
          // Handle HTTP error
          lib.error(methodName, postData.version, postData, "Error " + response.statusCode + ": " + body.Message, response)
        } else {
          if (body.d.E) {
            // Handle API error
            lib.error(methodName, postData.version, postData, body.d.E, response)
          } else {
            resolve(body.d)
          }
        }
      })
    })

    return promise
  }

  lib.error = function(method, version, data, error, response){
    console.error(method+":"+version+" "+error)
    console.dir({"postData":data, response:response})
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
