import { Test, TestingModule } from '@nestjs/testing';
import { ClasesParticularesService } from './clases_particulares.service';

describe('ClasesParticularesService', () => {
  let service: ClasesParticularesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClasesParticularesService],
    }).compile();

    service = module.get<ClasesParticularesService>(ClasesParticularesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
