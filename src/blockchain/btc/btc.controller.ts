import { Controller, Param, Post } from '@nestjs/common';
import { getWalletBalance, SendTransaction } from './btc.services';
//import Request from "request-promise";
//const axios = require("axios");

@Controller('btc/balance')
export class BtcbalanceController {
  @Post(':id')
  EthBalance(@Param() params) {
    const balance = getWalletBalance(params.id);
    return balance;
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
