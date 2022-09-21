import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EthbalanceController,
  EthSendController,
} from './blockchain/eth/eth.controller';
import {
  BtcbalanceController,
  BtcSendController,
} from './blockchain/btc/btc.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Postgres/pg.module';
import { LOGProviders } from './blockchain/blockchain.providers';
import { LOGService } from './blockchain/blockchain.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    DatabaseModule,
  ],
  controllers: [
    AppController,
    EthbalanceController,
    BtcbalanceController,
    EthSendController,
    BtcSendController,
  ],
  providers: [AppService, ...LOGProviders, LOGService],
})
export class AppModule {}
