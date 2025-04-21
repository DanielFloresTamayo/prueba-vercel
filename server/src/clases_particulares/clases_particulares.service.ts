import { Injectable } from '@nestjs/common';
import { CreateClasesParticulareDto } from './dto/create-clases_particulare.dto';
import { UpdateClasesParticulareDto } from './dto/update-clases_particulare.dto';

@Injectable()
export class ClasesParticularesService {
  create(createClasesParticulareDto: CreateClasesParticulareDto) {
    return 'This action adds a new clasesParticulare';
  }

  findAll() {
    return `This action returns all clasesParticulares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clasesParticulare`;
  }

  update(id: number, updateClasesParticulareDto: UpdateClasesParticulareDto) {
    return `This action updates a #${id} clasesParticulare`;
  }

  remove(id: number) {
    return `This action removes a #${id} clasesParticulare`;
  }
}
