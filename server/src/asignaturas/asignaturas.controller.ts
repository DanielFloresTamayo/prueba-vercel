import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  // Crear una nueva asignatura
  @Post()
  create(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.asignaturasService.create(createAsignaturaDto);
  }

  // Obtener todas las asignaturas (visualización en la tabla)
  @Get()
  findAll() {
    return this.asignaturasService.findAll();
  }

  // Obtener una asignatura específica por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignaturasService.findOne(+id);
  }

  // Actualizar una asignatura específica
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignaturaDto: UpdateAsignaturaDto) {
    return this.asignaturasService.update(+id, updateAsignaturaDto);
  }

  // Eliminar una asignatura específica
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignaturasService.remove(+id);
  }
}
