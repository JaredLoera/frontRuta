import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para @if y @for
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-sites',
  standalone: true, // Si usas standalone components
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-sites.html',
  styleUrl: './my-sites.css'
})
export class MySites {
  // Control del Modal
  showModal: boolean = false;
  
  // Formulario Reactivo
  sitioForm: FormGroup;

  // Lista simulada de sitios para mostrar en el diseño
  sitios = [
    { 
      id: 1, 
      nombre: 'Sitio Central', 
      direccion: 'Av. Juárez 102, Centro', 
      telefono: '5551234567', 
      encargado: 'Juan Pérez', 
      capacidad: 20, 
      estado: 'Activo' 
    },
    { 
      id: 2, 
      nombre: 'Sitio Norte', 
      direccion: 'Calle 15 #404, Col. Industrial', 
      telefono: '5559876543', 
      encargado: 'María García', 
      capacidad: 15, 
      estado: 'Inactivo' 
    }
  ];

  constructor(private fb: FormBuilder) {
    // Inicialización de campos basados en lo que necesita una base de taxis
    this.sitioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      encargado: ['', [Validators.required]],
      capacidad: [5, [Validators.required, Validators.min(1)]],
      horario: ['24h', Validators.required]
    });
  }

  // Lógica para el Modal
  openAddModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.sitioForm.reset({ horario: '24h', capacidad: 5 });
  }

  // Acción de guardar
  onSubmit(): void {
    if (this.sitioForm.valid) {
      const nuevoSitio = {
        id: this.sitios.length + 1,
        ...this.sitioForm.value,
        estado: 'Activo'
      };

      // Agregamos a la lista local (esto después vendrá de tu API)
      this.sitios.unshift(nuevoSitio);
      
      console.log('Guardando en TURUTA App:', nuevoSitio);
      
      this.closeModal();
    } else {
      // Marcar campos como tocados para mostrar errores en el HTML
      this.sitioForm.markAllAsTouched();
    }
  }

  // Funciones para Editar y Eliminar (Stubs)
  editarSitio(sitio: any): void {
    this.showModal = true;
    this.sitioForm.patchValue(sitio); // Carga los datos en el form
  }

  eliminarSitio(id: number): void {
    if(confirm('¿Estás seguro de eliminar esta base?')) {
      this.sitios = this.sitios.filter(s => s.id !== id);
    }
  }
}