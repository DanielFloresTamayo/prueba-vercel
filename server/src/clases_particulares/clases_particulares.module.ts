import { Module } from '@nestjs/common';
import { ClasesParticularesService } from './clases_particulares.service';
import { ClasesParticularesController } from './clases_particulares.controller';

@Module({
  controllers: [ClasesParticularesController],
  providers: [ClasesParticularesService],
})
export class ClasesParticularesModule {}
