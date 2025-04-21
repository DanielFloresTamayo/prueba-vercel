import { Test, TestingModule } from '@nestjs/testing';
import { AnunciosService } from './anuncios.service';

describe('AnunciosService', () => {
  let service: AnunciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnunciosService],
    }).compile();

    service = module.get<AnunciosService>(AnunciosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
