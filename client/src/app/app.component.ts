/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule aquí


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



}*/

import { Component, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HttpClientModule, ReactiveFormsModule, RouterOutlet] // Importa HttpClientModule en el componente raíz
    //providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }]
})
export class AppComponent {
  title = 'PROYECTO FINAL';

  constructor() {}
}

