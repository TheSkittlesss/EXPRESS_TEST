import { Test, TestingModule } from '@nestjs/testing';
import { EthSendController } from './send.controller';

describe('SendController', () => {
  let controller: EthSendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EthSendController],
    }).compile();

    controller = module.get<EthSendController>(EthSendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
