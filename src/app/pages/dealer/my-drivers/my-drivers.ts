import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/interfaces/user.interface';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-my-drivers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // CRÍTICO: Sin esto el form no funciona
  templateUrl: './my-drivers.html',
  styleUrl: './my-drivers.css'
})
export class MyDrivers implements OnInit {
  showModal: boolean = false;
  licenseForm: FormGroup; user: User | null = null;
  currentConcessionaireId = this.user?.concessionaireId!; // Asumiendo que el ID de la concesionaria es el mismo que el del usuario

  // Lista de choferes para mostrar en el panel
  // Datos de ejemplo para la lista
  choferes: any[] = [
    { id: 1, licenseNumber: 'TR-1234567', licenseExpiry: '2028-12-31', status: 'Pendiente Registro' }
  ];
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(environment.storageNames.user) || 'null');
    this.currentConcessionaireId = this.user?.concessionaireId!;
  }

  constructor(private fb: FormBuilder) {
    this.licenseForm = this.fb.group({
      id: [null], // Interno para control de edición
      concessionaireId: this.currentConcessionaireId, // ID de la concesionaria actual
      licenseNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      licenseExpiry: ['', Validators.required]
    });
  }


  openAddModal() {
    this.licenseForm.reset({
      concessionaireId: this.currentConcessionaireId
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Esta es la función que agrega o modifica
  onSubmit() {
    if (this.licenseForm.valid) {
      const payload = this.licenseForm.value;

      // Aquí enviarías el payload al servicio de TuRutaApp
      console.log('Enviando a registrar licencia:', payload);

      if (payload.id) {
        const index = this.choferes.findIndex(c => c.id === payload.id);
        this.choferes[index] = { ...payload, status: 'Actualizado' };
      } else {
        this.choferes.push({
          ...payload,
          id: Date.now(),
          status: 'Pendiente: Credenciales enviadas'
        });
      }

      this.closeModal();
    } else {
      this.licenseForm.markAllAsTouched();
    }
  }

  editarChofer(chofer: any) {
    this.licenseForm.patchValue(chofer);
    this.showModal = true;
  }

  eliminarChofer(id: number) {
    if (confirm('¿Eliminar este registro de licencia?')) {
      this.choferes = this.choferes.filter(c => c.id !== id);
    }
  }
}