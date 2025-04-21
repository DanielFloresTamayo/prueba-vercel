import { Component, OnInit } from '@angular/core';
import { RegistroParticipanteService } from '../registro-participante/registro-participante.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./gestion-usuario.component.css'],
})
export class GestionUsuarioComponent implements OnInit {
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  selectedRol: string = ''; // Rol seleccionado para filtrar
  sortColumn: string = '';
  // currentPage: number = 1;
  //pageSize: number = 5;
  sortDirection: boolean = true; // true = ascendente, false = descendente

  UpdateUser = {
    nombre: '',
    apellido: '',
    correo: '',
    // rol: '',
  };

  constructor(private usuarioService: RegistroParticipanteService) { }



  sortTable(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true;
    this.sortColumn = column;

    this.filteredUsuarios.sort((a, b) => {
      const valueA = a[column].toLowerCase();
      const valueB = b[column].toLowerCase();

      if (valueA < valueB) return this.sortDirection ? -1 : 1;
      if (valueA > valueB) return this.sortDirection ? 1 : -1;
      return 0;
    });
  }

  ngOnInit() {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data.data ;
        this.filteredUsuarios = [...this.usuarios];
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  /*fetchUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data.data.map(user => ({
          ...user,
          botonAccion: user.activo === 1 ? 'Desactivar' : 'Activar', // Define el texto del botón basado en el estado
        }));
        this.filteredUsuarios = [...this.usuarios];
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
*/

  filterByRole() {
    console.log('Selected Role:', this.selectedRol);
    console.log('Usuarios:', this.usuarios);

    if (this.selectedRol) {
      this.filteredUsuarios = this.usuarios.filter(
        (user) => user.rol.toLowerCase() === this.selectedRol.toLowerCase()
      );
    } else {
      this.filteredUsuarios = [...this.usuarios];
    }
    console.log('Filtered Usuarios:', this.filteredUsuarios);
  }
  /*
    removeUser(index: number) {
      const usuario = this.usuarios[index];
      this.usuarioService.eliminarUsuario(usuario.id).subscribe(
        (response) => {
          this.fetchUsuarios(); // Recargar la lista de usuarios
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }*/

 toggleUserStatus(user: any) {
    // Si el usuario está activo, queremos desactivarlo (cambiar a 0)
    // Si el usuario está desactivado, queremos activarlo (cambiar a 1)
    user.activo = (user.activo === 1) ? 0 : 1;

    // Ahora enviamos la petición al backend para cambiar el estado en la base de datos
    this.usuarioService.cambiarEstadoUsuario(user.id, user.activo).subscribe(
      () => {
        // Después de la respuesta exitosa, mostramos el mensaje correspondiente
        alert(`Usuario ${user.activo === 1 ? 'activado' : 'desactivado'} con éxito.`);
      },
      (error) => {
        // Si ocurre un error, revertimos el cambio en el estado local
        user.activo = (user.activo === 1) ? 0 : 1;
        console.error('Error al cambiar el estado del usuario:', error);
        alert('Ocurrió un error al intentar cambiar el estado del usuario.');
      }
    );
  }

  /*  toggleUserStatus(user: any) {
      const nuevoEstado = user.activo === 1 ? 0 : 1;
    
      // Actualizar en el backend
      this.usuarioService.cambiarEstadoUsuario(user.id, nuevoEstado).subscribe(
        () => {
          // Si la actualización es exitosa, actualiza el estado local
          user.activo = nuevoEstado;
          user.botonAccion = nuevoEstado === 1 ? 'Desactivar' : 'Activar';
          alert(`Usuario ${nuevoEstado === 1 ? 'activado' : 'desactivado'} con éxito.`);
        },
        (error) => {
          console.error('Error al cambiar el estado del usuario:', error);
          alert('Ocurrió un error al intentar cambiar el estado del usuario.');
        }
      );
    }*/
    

  updateUser(user: any) {
    // Carga los datos del usuario seleccionado en el formulario
    this.UpdateUser = {
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
    };
    (this.UpdateUser as any).id = user.id;
  }


  saveUserUpdates(user: any) {

    if (!user.id) {
      alert('El usuario no tiene un ID válido. No se puede actualizar.');
      return;
    }
    const updatedData = {
      id: user.id,
      nombre: this.UpdateUser.nombre,
      apellido: this.UpdateUser.apellido,
      correo: this.UpdateUser.correo,
    };

    // Encontrar el ID del usuario desde la lista de usuarios
    const usuario = this.usuarios.find((u) => u.correo === user.correo);


    if (!usuario) {
      alert('No se encontró el usuario a actualizar.');
      return;
    }

    // Llamar al servicio para actualizar el usuario
    this.usuarioService.actualizarUsuario(user.id, updatedData).subscribe(
      (response) => {
        if (response.success) {
          // Recargar la lista de usuarios
          this.fetchUsuarios();
          alert('Usuario actualizado exitosamente');
          this.resetForm(); // Reiniciar el formulario
        } else {
          alert('No se pudo actualizar el usuario: ' + response.message);
        }
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
        alert('Ocurrió un error al intentar actualizar el usuario.');
      }
    );
  }


  resetForm() {
    this.UpdateUser = { nombre: '', apellido: '', correo: '' };
  }
}
