import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-units',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-units.html',
  styleUrl: './my-units.css'
})
export class MyUnits {
  showModal = false;
  unidadForm: FormGroup;

  unidades = [
  { 
    id: 1, 
    matricula: 'TSX-99-22', 
    numero_serial: 'VIN1234567890', // Agregado
    modelo_nombre: 'Nissan Versa', 
    anio: 2022, 
    color: 'Blanco', 
    estado_unidad: 'Disponible',
    vigencia_seguro: '2026-12-31',
    numero_seguro: 'POL-882233', // <--- ESTE ES EL QUE FALTABA
    id_marca: 1,
    id_modelo: 101,
    imagen: 'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/m/RT_V_02674e1d1618408f972049d10e830c25.jpg'
  }
];

  constructor(private fb: FormBuilder) {
    this.unidadForm = this.fb.group({
      id: [null],
      matricula: ['', Validators.required],
      numero_serial: ['', Validators.required],
      anio: [2024, Validators.required],
      vigencia_seguro: ['', Validators.required],
      numero_seguro: ['', Validators.required],
      color: ['', Validators.required],
      id_modelo: ['', Validators.required],
      id_marca: ['', Validators.required],
      imagen: [''] // Campo para la URL de la imagen
    });
  }

  openAddModal() { this.unidadForm.reset(); this.showModal = true; }
  closeModal() { this.showModal = false; }
  eliminarUnidad(id: number) { this.unidades = this.unidades.filter(u => u.id !== id); }
  
  editarUnidad(unidad: any) {
    this.unidadForm.patchValue(unidad);
    this.showModal = true;
  }

  onSubmit() {
    if (this.unidadForm.valid) {
      console.log(this.unidadForm.value);
      this.closeModal();
    }
  }
}