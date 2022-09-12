import { Controller, Param, Post } from '@nestjs/common';
//import Request from "request-promise";
import * as Request from 'request-promise';

function getWalletBalance(address) {
  try {
    const promises = [];
    promises.push(
      Request(
        'https://api.bitcore.io/api/BTC/testnet/address/' +
          address.toString() +
          '/?unspent=true',
      ),
    );
    return Promise.all(promises).then((result) => {
      try {
        const balance = result.reduce(
          (a, b) =>
            JSON.parse(b).reduce((sum, el) => ({
              value: sum.value + el.value,
            })),
          0,
        );
        return new Promise((resolve, reject) => {
          //console.log(balance.value)
          resolve({ balance: balance.value });
        });
      } catch (err) {
        console.log(`Возникла ошибка!`);
      }
    });
  } catch (err) {
    console.log(`Возникла ошибка!`);
  }
}

@Controller('btc/balance')
export class BtcbalanceController {
  @Post(':id')
  EthBalance(@Param() params) {
    const balance = getWalletBalance(params.id);
    return balance;
  }
}
