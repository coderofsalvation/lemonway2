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

    client.onError = function(method, version, data, error, response){
      console.error(method+":"+version+" "+error)
      console.dir({"postData":data, response:response})
    }

    client.RegisterWallet("1.1", {
      "wallet":       payerWallet,
      "clientMail":     payerWallet + "@lemonway.com",
      "clientFirstName":  "Payer",
      "clientLastName":   "Payer"
    }).then(function(RegisterWalletResult) {
      console.log("\n---------- Payer Wallet created: " + payerWallet + " ----------")
      console.log(RegisterWalletResult.WALLET)
      resolve("Done.")
    })

## Features

* uses DirectkitJSON2
* no soap
* debug output
* custom errorhandling
* tiny codebase (~60 lines) using es6 proxy
* specify version of function according to [docs](http://documentation.lemonway.fr/api-en/directkit)

## More info 

Just read the [docs](http://documentation.lemonway.fr/api-en/directkit) or checkout the [test](https://github.com/coderofsalvation/lemonway2/raw/master/test/tests/test.js)
