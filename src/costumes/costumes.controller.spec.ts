import { Test, TestingModule } from '@nestjs/testing';
import { CostumesController } from './costumes.controller';
import { CostumesService } from './costumes.service';

describe('CostumesController', () => {
  let controller: CostumesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostumesController],
      providers: [CostumesService],
    }).compile();

    controller = module.get<CostumesController>(CostumesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
