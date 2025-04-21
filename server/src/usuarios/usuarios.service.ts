import { Injectable, NotFoundException, HttpException, HttpStatus, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/UpdateUsuarioDto';
import * as bcrypt from 'bcrypt';
import { UsuarioListadoDto } from './dto/UsuarioListadoDto';
import { UpdateContactDto } from './dto/update-contact.dto';
import * as jwt from 'jsonwebtoken';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async findByEmail(correo: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { correo } });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: Number(id) } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  /* async desactivarUsuario(id: number): Promise<void> {
     // Busca al usuario por ID
     const usuario = await this.usuarioRepository.findOne({ where: { id } });
   
     if (!usuario) {
       throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
     }
   
     // Actualiza el estado directamente a inactivo
     await this.usuarioRepository.update(id, { activo: false });
   }
   */

  async cambiarEstadoUsuario(id: number, activo: boolean) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    // Actualizamos el campo 'activo'
    usuario.activo = activo;

    // Guardamos el cambio en la base de datos
    await this.usuarioRepository.update(id, { activo });

    return { message: `Usuario ${activo ? 'activado' : 'desactivado'} con éxito.` };
  }


  async registrarTutor(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
    const nuevoTutor = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
      rol: 'Tutor', // Asignamos el rol automáticamente
    });

    return this.usuarioRepository.save(nuevoTutor);
  }

  async findAll(): Promise<UsuarioListadoDto[]> {
    const usuarios = await this.usuarioRepository.find({
      select: ['id', 'nombre', 'apellido', 'correo', 'rol'], // Selección de atributos directamente desde la BD
    });

    return plainToInstance(UsuarioListadoDto, usuarios);
  }


  async registrarParticipante(datos: {
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
  }): Promise<Usuario> {

    const hashedPassword = await bcrypt.hash(datos.password, 10);
    const nuevoUsuario = this.usuarioRepository.create({
      ...datos,
      password: hashedPassword,
      rol: 'Participante',
      fecha_nacimiento: null,

    });

    try {
      return await this.usuarioRepository.save(nuevoUsuario);
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY' || error?.errno === 1062) {
        // Manejo de error para correos duplicados
        throw new ConflictException('El correo ya está registrado');
      }
      // Si el error no es de unicidad, lo volvemos a lanzar
      throw error;
    }
    //  return this.usuarioRepository.save(nuevoUsuario);
  }

  //actualizar usuario

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    // Actualizamos solo los campos enviados en el DTO
    Object.assign(usuario, updateUsuarioDto);

    try {
      const usuarioActualizado = await this.usuarioRepository.save(usuario);
      //return await this.usuarioRepository.save(usuario);
      console.log('Usuario actualizado en el servicio:', usuarioActualizado);
      return usuarioActualizado;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new ConflictException('Error al actualizar el usuario.');
    }
  }

  async updateContactInfo(id: number, updateContactDto: UpdateContactDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    
    // Actualizamos únicamente los campos de contacto: carrera y numero_contacto
    Object.assign(usuario, {
      carrera: updateContactDto.carrera !== undefined ? updateContactDto.carrera : usuario.carrera,
      numero_contacto: updateContactDto.numero_contacto !== undefined ? updateContactDto.numero_contacto : usuario.numero_contacto,
    });
    
    try {
      const usuarioActualizado = await this.usuarioRepository.save(usuario);
      console.log('Usuario actualizado (contacto) en el servicio:', usuarioActualizado);
      return usuarioActualizado;
    } catch (error) {
      console.error('Error al actualizar el usuario (contacto):', error);
      throw new ConflictException('Error al actualizar la información de contacto del usuario.');
    }
  }
  

  async updateProfilePicture(id: number, imageUrl: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
  
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
  
    usuario.foto = imageUrl; // Guardamos la nueva URL de la imagen
  
    return await this.usuarioRepository.save(usuario);
  }
  

}
