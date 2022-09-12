import { Controller, Param, Post } from '@nestjs/common';
import * as Request from 'request-promise';
import * as bitcore from 'bitcore-lib';
import axios from 'axios';
//const axios = require("axios");
const sochain_network = 'BTCTEST';

function SendTransaction(address2) {
  try {
    const promises = [];
    const PKWIF = 'cToPiHW9LxC5UU3tKpCvW4PF4XXhLXqS8nBBgB2zNbwYqtG85gre';
    const address = new bitcore.PrivateKey(PKWIF).toAddress();
    console.log(address.toString());
    const inputs = [];
    let totalAmountAvailable = 0;
    let fee = 0;
    let inputCount = 0;
    const outputCount = 2;
    //const address = "mibJp8dZVGj75p2Yie7bMDEdK3ixJ26XQn"
    //mk4fnzdiVcJczBx7AYDpDkvM8qy3WSYj5T

    promises.push(
      Request(
        'https://api.bitcore.io/api/BTC/testnet/address/' +
          address.toString() +
          '/?unspent=true',
      ),
    );

    return Promise.all(promises).then(async (result) => {
      try {
        const obj = result.reduce((a, b) => JSON.parse(b));

        const jsonObject = JSON.parse(obj);

        jsonObject.forEach((element) => {
          //console.log(element.value);
          const utxo = {
            satoshis: element.value,
            script: element.script,
            address: address.toString(),
            txId: element.mintTxid,
            outputIndex: element.mintIndex,
          };

          //utxo.satoshis = element.value;
          //utxo.script = element.script;
          //utxo.address = address.toString();
          //utxo.txId = element.mintTxid;
          //.outputIndex = element.mintIndex;

          totalAmountAvailable += utxo.satoshis;
          inputCount += 1;
          inputs.push(utxo);

          //console.log(totalAmountAvailable);
          //console.log("+++++++++++++++++++++++++++++++")
        });
        const balance = result.reduce(
          (a, b) =>
            JSON.parse(b).reduce((sum, el) => ({
              value: sum.value + el.value,
            })),
          0,
        );

        const privateKey = new bitcore.PrivateKey(PKWIF);
        const satoshiToSend = 5;
        const transaction = new bitcore.Transaction();

        transaction.from(inputs);
        const transactionSize =
          inputCount * 146 + outputCount * 34 + 10 - inputCount;
        fee = transactionSize * 20;

        if (totalAmountAvailable - satoshiToSend - fee < 0) {
          throw new Error('Balance is too low for this transaction');
        }
        transaction.to(address2.toString(), satoshiToSend);
        transaction.change(address.toString());
        transaction.fee(fee);
        transaction.sign(privateKey);
        const serializedTransaction = transaction.toString();
        const axios_par = {
          method: 'POST',
          url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
          data: {
            tx_hex: serializedTransaction,
          },
        };
        const res = axios(axios_par);

        console.log(res);
        return {
          result: serializedTransaction,
          balance: balance.value,
          fee: fee,
        };

        //var address2 = new bitcore.PrivateKey(bn).toAddress('testnet');
      } catch (err) {
        console.log(`Возникла ошибка!`);
      }
    });
  } catch (err) {
    console.log(`Возникла ошибка!`);
  }
}

@Controller('btc/send')
export class BtcSendController {
  @Post(':id')
  EthBalance(@Param() params) {
    const send = SendTransaction(params.id);
    return send;
  }
}
