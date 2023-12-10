import { Test, TestingModule } from '@nestjs/testing';
import { VijayService } from './vijay.service';

describe('VijayService', () => {
  let service: VijayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VijayService],
    }).compile();

    service = module.get<VijayService>(VijayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
