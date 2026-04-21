import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-drivers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // CRÍTICO: Sin esto el form no funciona
  templateUrl: './my-drivers.html',
  styleUrl: './my-drivers.css'
})
export class MyDrivers {
  showModal: boolean = false;
  choferForm: FormGroup;
  
  // Lista de choferes para mostrar en el panel
  choferes: any[] = [
    { id: 1, nombre: 'Carlos', lastName: 'Mendoza', email: 'c.mendoza@turuta.com', role: 'Operador A', license: 'ABC-778-9', licenseExpiry: '2027-05-15', carroId: 'TX-105' }
  ];

  constructor(private fb: FormBuilder) {
    // Inicialización de los 8 campos que pediste
    this.choferForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Chofer', Validators.required],
      license: ['', Validators.required],
      licenseExpiry: ['', Validators.required],
      carroId: ['', Validators.required]
    });
  }

  openAddModal() {
    this.choferForm.reset({ role: 'Chofer' }); // Limpia el form
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Esta es la función que agrega o modifica
  onSubmit() {
    if (this.choferForm.valid) {
      const datos = this.choferForm.value;
      
      if (datos.id) {
        // Lógica para Modificar
        const index = this.choferes.findIndex(c => c.id === datos.id);
        this.choferes[index] = datos;
      } else {
        // Lógica para Agregar Nuevo
        this.choferes.push({ ...datos, id: Date.now() });
      }

      console.log('Operación exitosa:', datos);
      this.closeModal();
    } else {
      // Si el formulario es inválido, marcamos los campos para mostrar errores
      this.choferForm.markAllAsTouched();
    }
  }

  // Para cargar datos en el modal y editar
  editarChofer(chofer: any) {
    this.choferForm.patchValue(chofer);
    this.showModal = true;
  }

  eliminarChofer(id: number) {
    if (confirm('¿Eliminar a este chofer?')) {
      this.choferes = this.choferes.filter(c => c.id !== id);
    }
  }
}