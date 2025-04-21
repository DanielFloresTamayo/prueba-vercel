import { Controller, Get, Post, Body, Patch, Param, Req, HttpException, HttpStatus, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/UpdateUsuarioDto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService, private readonly authService: AuthService) { }

  @Post('registrar-tutor')
  async registrarTutor(@Body() createTutorDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.registrarTutor(createTutorDto);
  }

  @Post()
  async registrarParticipante(
    @Body() datos: { nombre: string; apellido: string; correo: string; password: string },
  ): Promise<Usuario> {
    return this.usuarioService.registrarParticipante(datos);
  }

  @Get()
  async findAll() {
    try {
      const usuarios = await this.usuarioService.findAll();
      return { success: true, data: usuarios };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  async getPerfil(@Req() req: any) {
    // El JwtStrategy coloca los datos decodificados en req.user.
    // Dependiendo de cómo esté configurada, podría ser req.user.userId o req.user.sub.
    const userId = req.user?.userId || req.user?.sub;
    //const userId = req.headers['x-user-id'] || 1;
    const perfil = await this.usuarioService.findById(userId);
    return { success: true, data: perfil };
  }

  @Patch('perfil/contacto')
  @UseGuards(JwtAuthGuard)
  async updateContactInfo(
    @Req() req: any,
    @Body() updateContactDto: UpdateContactDto
  ) {
    // Extraemos el ID del usuario autenticado desde req.user (proporcionado por JwtAuthGuard)
    const userId = req.user?.userId || req.user?.sub;
    console.log('Actualizando información de contacto para usuario ID:', userId);
    console.log('Datos recibidos para actualizar:', updateContactDto);

    // Llamamos al método específico que actualiza solo los campos de contacto
    const usuarioActualizado = await this.usuarioService.updateContactInfo(userId, updateContactDto);
    console.log('Perfil actualizado:', usuarioActualizado);

    return { success: true, data: usuarioActualizado };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<{ success: boolean; data?: Usuario; message?: string }> {
    try {
      const usuarioActualizado = await this.usuarioService.update(+id, updateUsuarioDto);
      return { success: true, data: usuarioActualizado };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  /*@Patch('desactivar/:id')
  async desactivarUsuario(
    @Param('id') id: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.usuarioService.desactivarUsuario(id);
      return { success: true, message: 'Usuario desactivado con éxito.' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }*/


  @Patch(':id/estado')
  async cambiarEstadoUsuario(
    @Param('id') id: number,
    @Body('activo') activo: boolean
  ) {
    if (activo === undefined) {
      throw new HttpException('El estado "activo" es obligatorio.', HttpStatus.BAD_REQUEST);
    }

    return this.usuarioService.cambiarEstadoUsuario(id, activo);
  }


  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    console.log('🎯 Recibiendo petición de login con:', loginUsuarioDto); // 🟢 LOG 1: Ver credenciales que llegan al controller

    const response = await this.authService.login(loginUsuarioDto);

    console.log('📨 Respuesta enviada al frontend:', response); // 🟢 LOG 2: Ver la respuesta enviada

    return response;
  }


  @Post('upload')
@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('image', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }
}))
async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
  if (!file) {
    throw new HttpException('No se subió ninguna imagen', HttpStatus.BAD_REQUEST);
  }

  const userId = req.user?.userId || req.user?.sub; // 🔥 Ahora el ID viene del token JWT
  const imageUrl = `/uploads/${file.filename}`; 

  // Guardar la imagen en la base de datos
  const usuarioActualizado = await this.usuarioService.updateProfilePicture(userId, imageUrl);

  return {
    success: true,
    message: 'Imagen subida y guardada exitosamente',
    imageUrl: imageUrl,
    usuario: usuarioActualizado
  };
}
}
