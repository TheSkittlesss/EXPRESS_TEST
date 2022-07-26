const Request = require("request-promise");
const bitcore = require('bitcore-lib');
const axios = require("axios");
const sochain_network = "BTCTEST";

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
        
    },



    SendTransaction: function(address2) {
        try{
            let promises = [];
            const PKWIF = 'cToPiHW9LxC5UU3tKpCvW4PF4XXhLXqS8nBBgB2zNbwYqtG85gre';
            const address = new bitcore.PrivateKey(PKWIF).toAddress();
            console.log(address.toString())
            let inputs = [];
            let totalAmountAvailable = 0;
            let fee = 0;
            let inputCount = 0;
            let outputCount = 2;
            //const address = "mibJp8dZVGj75p2Yie7bMDEdK3ixJ26XQn"
            //mk4fnzdiVcJczBx7AYDpDkvM8qy3WSYj5T
            
            promises.push(Request('https://api.bitcore.io/api/BTC/testnet/address/' + address.toString() + '/?unspent=true'));

            return Promise.all(promises).then(result => {
                try{
                    
                    
                    obj = result.reduce((a, b) => JSON.parse(b));
                    
                    
                    jsonObject = JSON.parse(obj)
                    
                    jsonObject.forEach(element => {
                        //console.log(element.value);
                        let utxo = {};
                        
                        utxo.satoshis = element.value;
                        utxo.script = element.script;
                        utxo.address = address.toString();
                        utxo.txId = element.mintTxid;
                        utxo.outputIndex = element.mintIndex;
                        
                        totalAmountAvailable += utxo.satoshis;
                        inputCount += 1;
                        inputs.push(utxo);
                
                       
                        
                        //console.log(totalAmountAvailable);
                        //console.log("+++++++++++++++++++++++++++++++")
                    });
                    let balance = result.reduce((a, b) => JSON.parse(b).reduce((sum, el) => ({value: sum.value + el.value})),0);
                    
                    const privateKey = new bitcore.PrivateKey(PKWIF);
                    satoshiToSend = 5
                    const transaction = new bitcore.Transaction()
                    
                    
                    transaction.from(inputs);
                    transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
                    fee = transactionSize * 20
                     
                    if (totalAmountAvailable - satoshiToSend - fee  < 0) {
                    throw new Error("Balance is too low for this transaction");
                    }
                    transaction.to(address2.toString(), satoshiToSend);
                    transaction.change(address.toString());
                    transaction.fee(fee);
                    transaction.sign(privateKey);
                    var serializedTransaction = transaction.toString();

                    const res = axios({
                        method: 'POST',
                        url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
                        data: {
                            tx_hex: serializedTransaction,
                        },
                        });
                        
                        console.log(res);
                        return { "result": serializedTransaction,
                                 "balance": balance.value,
                                 "fee": fee  }

                    

                    

                    //var address2 = new bitcore.PrivateKey(bn).toAddress('testnet');


                 
                } catch(err) {
                    console.log(`Возникла ошибка!`); 
                  }  
                
            });
        } catch(err) {
            console.log(`Возникла ошибка!`); 
          }  
        


    }



 }