const express = require('express');
const router = express.Router();
const BTC_Services = require('../../services/BTC/services.js');

router.get('/', (req, res) => {
    res.send('BTC home page');
  });

router.post("/balance/:id", (req, res) => {

    try{
        let balance = BTC_Services.getWalletBalance(req.params.id)
        balance.then(function(result){
                req.body = result
                //console.log(result.balance)
                res.status(200).json({ status: "Success !", data: { body: 
                    req.body } }); 
        })
    } catch(err) {
        console.log(`Возникла ошибка!`); 
      }  
    });



    router.post("/send/:id", (req, res) => {

      try{
          let send = BTC_Services.SendTransaction(req.params.id)
          send.then(function(result){
                  req.body = result
                  //console.log(result.balance)
                  res.status(200).json({ status: "Success !", data: { body: 
                      req.body } }); 
          })
      } catch(err) {
          console.log(`Возникла ошибка!`); 
        }  
      });
module.exports = router;


