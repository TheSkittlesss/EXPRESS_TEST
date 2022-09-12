import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthbalanceController } from './eth/balance/balance.controller';
import { BtcbalanceController } from './btc/balance/balance.controller';
import { EthSendController } from './eth/send/send.controller';
import { BtcSendController } from './btc/send/send.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    EthbalanceController,
    BtcbalanceController,
    EthSendController,
    BtcSendController,
  ],
  providers: [AppService],
})
export class AppModule {}
