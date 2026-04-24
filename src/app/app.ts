import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. Importar el componente de la librería
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  // 2. Agregarlo aquí para que Angular lo reconozca
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
}