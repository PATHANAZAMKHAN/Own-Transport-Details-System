import { Test, TestingModule } from '@nestjs/testing';
import { OtsService } from './ots.service';

describe('OtsService', () => {
  let service: OtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtsService],
    }).compile();

    service = module.get<OtsService>(OtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
