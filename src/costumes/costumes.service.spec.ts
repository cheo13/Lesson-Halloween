import { Test, TestingModule } from '@nestjs/testing';
import { CostumesService } from './costumes.service';

describe('CostumesService', () => {
  let service: CostumesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostumesService],
    }).compile();

    service = module.get<CostumesService>(CostumesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
