import { PartialType } from '@nestjs/mapped-types';
import { CreateClasesParticulareDto } from './create-clases_particulare.dto';

export class UpdateClasesParticulareDto extends PartialType(CreateClasesParticulareDto) {}
