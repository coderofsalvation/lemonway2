unofficial LEMONWAY nodejs client using DIRECTKITJSON2 + es6 (soapless)

![](https://github.com/coderofsalvation/lemonway2/raw/master/lemonway.png)

## Usage

    var lemonway = require('lemonway2')

    var client = lemonway({
      "endpoint": process.env.LEMONWAY_DIRECTKIT || "https://sandbox-api.lemonway.fr/mb/demo/dev/directkitjson2/Service.asmx/",
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

## Important Sandbox Notes

Lemonway only allows access thru validated ip, so run this in your (local) console:

    ssh -v -i ~/.ssh/id_rsa.penna -p 2222 -N -C -D 9000 username@yourproductionserver.com

now run your nodejs server like this:

    SOCKS5_HOST=127.0.0.1 SOCKS5_PORT=9000 node app.js


> TIP: the same applies to the lemonway backoffice in the browser. Install the switchyomega chrome-extension to automatically enable socks5 proxy when visiting urls matching *.lemonway.fr

#### Payment flow backend-lemonway-frontend

![](https://lh6.googleusercontent.com/oW_LBulEri5QMk0nTiji1vDXGVwdcuToNFyndVzTlRxIPyM7xtOcxJpvIyKpaOb5gIjF5EAOqGMkO5Y=w1919-h966-rw)

## Features

* uses DirectkitJSON2
* no soap
* debug output
* custom errorhandling
* tiny codebase (~60 lines) using es6 proxy
* specify version of function according to [docs](http://documentation.lemonway.fr/api-en/directkit)

## More info 

Just read the [docs](http://documentation.lemonway.fr/api-en/directkit) or checkout the [test](https://github.com/coderofsalvation/lemonway2/raw/master/test/tests/test.js)
