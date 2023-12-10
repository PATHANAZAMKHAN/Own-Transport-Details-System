import { Test, TestingModule } from '@nestjs/testing';
import { OtsController } from './ots.controller';
import { OtsService } from './ots.service';

describe('OtsController', () => {
  let controller: OtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtsController],
      providers: [OtsService],
    }).compile();

    controller = module.get<OtsController>(OtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
