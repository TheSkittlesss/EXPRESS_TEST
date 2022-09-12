import { Test, TestingModule } from '@nestjs/testing';
import { BtcbalanceController } from './balance.controller';

describe('BtcbalanceController', () => {
  let controller: BtcbalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcbalanceController],
    }).compile();

    controller = module.get<BtcbalanceController>(BtcbalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
