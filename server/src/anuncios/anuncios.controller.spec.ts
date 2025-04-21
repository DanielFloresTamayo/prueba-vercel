import { Test, TestingModule } from '@nestjs/testing';
import { AnunciosController } from './anuncios.controller';
import { AnunciosService } from './anuncios.service';

describe('AnunciosController', () => {
  let controller: AnunciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnunciosController],
      providers: [AnunciosService],
    }).compile();

    controller = module.get<AnunciosController>(AnunciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
