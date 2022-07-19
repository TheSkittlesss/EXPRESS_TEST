const Request = require("request-promise");

module.exports = {
    getWalletBalance: function(address) {
        try{
            let promises = [];
            promises.push(Request('https://api.bitcore.io/api/BTC/testnet/address/' + address.toString() + '/?unspent=true'));
            return Promise.all(promises).then(result => {
                try{
                    let balance = result.reduce((a, b) => JSON.parse(b).reduce((sum, el) => ({value: sum.value + el.value})),0);
                    return new Promise((resolve, reject) => {
                        //console.log(balance.value)
                        resolve({ "balance": balance.value });
                });
                } catch(err) {
                    console.log(`Возникла ошибка!`); 
                  }  
                
            });
        } catch(err) {
            console.log(`Возникла ошибка!`); 
          }  
        
    }
 }