import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClasesParticularesService } from './clases_particulares.service';
import { CreateClasesParticulareDto } from './dto/create-clases_particulare.dto';
import { UpdateClasesParticulareDto } from './dto/update-clases_particulare.dto';

@Controller('clases-particulares')
export class ClasesParticularesController {
  constructor(private readonly clasesParticularesService: ClasesParticularesService) {}

  @Post()
  create(@Body() createClasesParticulareDto: CreateClasesParticulareDto) {
    return this.clasesParticularesService.create(createClasesParticulareDto);
  }

  @Get()
  findAll() {
    return this.clasesParticularesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clasesParticularesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClasesParticulareDto: UpdateClasesParticulareDto) {
    return this.clasesParticularesService.update(+id, updateClasesParticulareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasesParticularesService.remove(+id);
  }
}
