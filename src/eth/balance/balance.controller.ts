import { Controller, Param, Post } from '@nestjs/common';
//const ETH_Services = require('../../../services/ETH/services.js');
import { providers as _providers, Wallet, utils } from 'ethers';
const providers = _providers;
const provider = providers.getDefaultProvider('ropsten');

function getWalletBalance(address) {
  try {
    return provider.getBalance(address).then(function (balance) {
      const etherString = utils.formatEther(balance);
      return { balance: etherString };
    });
  } catch (err) {
    console.log('Возникла ошибка!');
  }
}

@Controller('eth/balance')
export class EthbalanceController {
  @Post(':id')
  EthBalance(@Param() params) {
    const balance = getWalletBalance(params.id);
    return balance;
  }
}
