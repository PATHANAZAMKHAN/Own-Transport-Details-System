import { Test, TestingModule } from '@nestjs/testing';
import { VijayController } from './vijay.controller';
import { VijayService } from './vijay.service';

describe('VijayController', () => {
  let controller: VijayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VijayController],
      providers: [VijayService],
    }).compile();

    controller = module.get<VijayController>(VijayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
