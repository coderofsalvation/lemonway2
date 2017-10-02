unofficial LEMONWAY nodejs client using DIRECTKITJSON2 + es6 (soapless)

![](https://github.com/coderofsalvation/lemonway2/raw/master/lemonway.png)

## Usage

    var lemonway = require('lemonway2')

    var client = lemonway({
      "endpoint":"https://sandbox-api.lemonway.fr/mb/demo/dev/directkitjson2/Service.asmx/",
      "wlLogin":  process.env.LEMONWAY_LOGIN, 
      "wlPass":   process.env.LEMONWAY_PASSWORD, 
      "language": "en",
      "walletIp": "1.1.1.1",
      "walletUa": "lemonway2",
    })

    client.error = function(method, version, data, error, response, cb){
	  var message = method+":"+version+" "+JSON.stringify(error)
	  var info = {error:message, "postData":data, response:response}
	  if( !cb ) console.dir(info)
	  else cb(info)
    }

    client.RegisterWallet("1.1", {
      "wallet":       payerWallet,
      "clientMail":     payerWallet + "@lemonway.com",
      "clientFirstName":  "Payer",
      "clientLastName":   "Payer"
    }).then( (RegisterWalletResult) => {
      console.log("\n---------- Payer Wallet created: " + payerWallet + " ----------")
      console.log(RegisterWalletResult.WALLET)
      resolve("Done.")
    })

for debug output run:

    $ DEBUG=lemonway node foo.js
    lemonway RegisterWallet:1.1 {"wallet":"ZmXGZfjgEF7ifzGg","clientMail":"ZmXGZfjgEF7ifzGg@lemonway. ... } +0ms
    ...

## Features

* uses DirectkitJSON2
* no soap
* debug output
* custom errorhandling
* tiny codebase (~60 lines) using es6 proxy
* specify version of function according to [docs](http://documentation.lemonway.fr/api-en/directkit)

## More info 

Just read the [docs](http://documentation.lemonway.fr/api-en/directkit) or checkout the [test](https://github.com/coderofsalvation/lemonway2/raw/master/test/tests/test.js)
