import { Test, TestingModule } from '@nestjs/testing';
import { ClasesParticularesController } from './clases_particulares.controller';
import { ClasesParticularesService } from './clases_particulares.service';

describe('ClasesParticularesController', () => {
  let controller: ClasesParticularesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClasesParticularesController],
      providers: [ClasesParticularesService],
    }).compile();

    controller = module.get<ClasesParticularesController>(ClasesParticularesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
