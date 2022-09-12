import { Test, TestingModule } from '@nestjs/testing';
import { EthbalanceController } from './balance.controller';

describe('EthbalanceController', () => {
  let controller: EthbalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EthbalanceController],
    }).compile();

    controller = module.get<EthbalanceController>(EthbalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
