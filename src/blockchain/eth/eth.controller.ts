import { Controller, Param, Post } from '@nestjs/common';
//const ETH_Services = require('../../../services/ETH/services.js');
import { getWalletBalance, SendTransaction } from './eth.services';

@Controller('eth/balance')
export class EthbalanceController {
  @Post(':id')
  EthBalance(@Param() params) {
    const balance = getWalletBalance(params.id);
    return balance;
  }
}

@Controller('eth/send')
export class EthSendController {
  @Post(':id')
  EthBalance(@Param() params) {
    const send = SendTransaction(params.id);
    return send;
  }
}
