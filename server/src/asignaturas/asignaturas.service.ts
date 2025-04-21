import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';

@Injectable()
export class AsignaturasService {
  constructor(
    @InjectRepository(Asignatura)
    private asignaturasRepository: Repository<Asignatura>,
  ) {}

  // Obtener todas las asignaturas
  findAll(): Promise<Asignatura[]> {
    return this.asignaturasRepository.find({ relations: ['anuncios'] }); // Incluir los anuncios
  }

  // Obtener una asignatura por ID
  async findOne(id: number): Promise<Asignatura> {
    const asignatura = await this.asignaturasRepository.findOne({
      where: { id },
      relations: ['anuncios'], // Incluir anuncios
    });

    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }

    return asignatura;
  }

  // Crear una asignatura
  async create(createAsignaturaDto: CreateAsignaturaDto): Promise<Asignatura> {
    const nuevaAsignatura = this.asignaturasRepository.create(createAsignaturaDto);
    return this.asignaturasRepository.save(nuevaAsignatura);
  }

  // Actualizar una asignatura
  async update(id: number, updateAsignaturaDto: UpdateAsignaturaDto): Promise<Asignatura> {
    const asignatura = await this.findOne(id); // Verificar que exista
    Object.assign(asignatura, updateAsignaturaDto); // Aplicar cambios
    return this.asignaturasRepository.save(asignatura); // Guardar cambios
  }

  // Eliminar una asignatura
  async remove(id: number): Promise<void> {
    const result = await this.asignaturasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }
  }
}
