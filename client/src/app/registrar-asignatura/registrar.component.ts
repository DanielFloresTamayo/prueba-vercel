import { Component } from '@angular/core';
//import { DataSource } from '@angular/cdk/collections';
//import { Observable, ReplaySubject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsignaturasService } from './registrar.service';

export interface PeriodicElement {
  // name: string;
  //  position: number;

}

/*const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Física' },
  { position: 2, name: 'Matemáticas' },
  { position: 3, name: 'Química' },
  { position: 4, name: 'Inglés' },
  { position: 5, name: 'Programación' },
  { position: 6, name: 'Base de datos' },
  { position: 7, name: 'Lengua' },
  { position: 8, name: 'Ciencias sociales' },
  { position: 9, name: 'Matemáticas avanzadas' },
  { position: 10, name: 'Historia' },
];
*/

@Component({
  selector: 'app-registrar',
  imports: [MatButtonModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})

export class RegistrarComponent {
  dataSource: { id: number; position: number; name: string }[] = [];
  newSubjectName: string = '';
  selectedIndex: number | null = null;

  constructor(private asignaturasService: AsignaturasService) { }

  ngOnInit() {
    this.fetchAsignaturas(); // Cargar asignaturas al iniciar el componente
  }

  // Obtener asignaturas del backend
  fetchAsignaturas() {
    this.asignaturasService.getAsignaturas().subscribe(
      (asignaturas) => {
        this.dataSource = asignaturas.map((asignatura, index) => ({
          id: asignatura.id,
          position: index + 1,
          name: asignatura.nombre,
        }));
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  // Agregar o actualizar asignatura
  addData() {
    const trimmedName = this.newSubjectName.trim();

    //if (this.newSubjectName.trim() === '') return;

    if (this.dataSource.some((asignatura) => asignatura.name === trimmedName)) {
      alert('Esta asignatura ya existe.');
      return;
    }

    if (this.selectedIndex !== null) {
      // Actualizar asignatura existente
      const selectedAsignatura = this.dataSource[this.selectedIndex];
      this.asignaturasService
        .updateAsignatura(selectedAsignatura.id,trimmedName)
        .subscribe(
          () => {
            selectedAsignatura.name = trimmedName;
            this.newSubjectName = '';
            this.selectedIndex = null;
          },
          (error) => {
            console.error('Error al actualizar la asignatura:', error);
          }
        );
    } else {
      // Crear nueva asignatura
      this.asignaturasService.createAsignatura(this.newSubjectName.trim()).subscribe(
        (nuevaAsignatura) => {
          this.dataSource.push({
            id: nuevaAsignatura.id,
            position: this.dataSource.length + 1,
            name: nuevaAsignatura.nombre,
          });
          this.newSubjectName = '';
        },
        (error) => {
          console.error('Error al agregar la asignatura:', error);
        }
      );
    }
  }

  // Eliminar asignatura específica
  removeSpecificData(index: number) {
    const asignaturaId = this.dataSource[index].id;
    this.asignaturasService.deleteAsignatura(asignaturaId).subscribe(
      () => {
        this.dataSource.splice(index, 1);
        this.dataSource.forEach((item, i) => (item.position = i + 1)); // Recalcular posiciones
      },
      (error) => {
        console.error('Error al eliminar la asignatura:', error);
      }
    );
  }

  // Editar asignatura (preparar para actualizar)
  editData(index: number) {
    this.selectedIndex = index;
    this.newSubjectName = this.dataSource[index].name;
  }

}

