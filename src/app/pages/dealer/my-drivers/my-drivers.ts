import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-drivers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-drivers.html',
  styleUrl: './my-drivers.css'
})
export class MyDrivers implements OnInit {
  showModal = false;
  showUnitModal = false;
  licenseForm!: FormGroup;
  unitForm!: FormGroup;
  currentConcessionaireId = '';
  selectedChofer: any;

  // Lista de carros que ya existen en tu sistema
  unidadesDisponibles: any[] = [
    { id: 'v1', placa: 'ABC-123', modelo: 'Nissan Tsuru', economico: '01' },
    { id: 'v2', placa: 'XYZ-987', modelo: 'Chevrolet Aveo', economico: '45' },
    { id: 'v3', placa: 'MEX-444', modelo: 'VW Vento', economico: '12' }
  ];

  choferes: any[] = [
    // Ejemplo 1: Sin unidad
    { id: 1, licenseNumber: 'TR-1234567', licenseExpiry: '2028-12-31', status: 'Pendiente', vehiculo: null },
    // Ejemplo 2: Ya tiene unidad enlazada
    { 
      id: 2, 
      licenseNumber: 'TR-8889900', 
      licenseExpiry: '2029-05-20', 
      status: 'Activo', 
      vehiculo: { id: 'v2', placa: 'XYZ-987', modelo: 'Chevrolet Aveo', economico: '45' } 
    }
  ];

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentConcessionaireId = user.concessionaireId || 'CON-001';
    this.licenseForm.patchValue({ concessionaireId: this.currentConcessionaireId });
  }

  initForms() {
    this.licenseForm = this.fb.group({
      id: [null],
      concessionaireId: [''],
      licenseNumber: ['', Validators.required],
      licenseExpiry: ['', Validators.required]
    });

    // El formulario de unidad ahora solo pide el ID del vehículo seleccionado
    this.unitForm = this.fb.group({
      vehiculoId: ['', Validators.required]
    });
  }

  openAddModal() { 
    this.licenseForm.reset({ concessionaireId: this.currentConcessionaireId }); 
    this.showModal = true; 
  }
  closeModal() { this.showModal = false; }
  
  openUnitModal(chofer: any) { 
    this.selectedChofer = chofer; 
    this.unitForm.reset({
      vehiculoId: chofer.vehiculo ? chofer.vehiculo.id : ''
    });
    this.showUnitModal = true; 
  }
  closeUnitModal() { this.showUnitModal = false; }

  onSaveUnit() {
    if (this.unitForm.valid) {
      const selectedId = this.unitForm.value.vehiculoId;
      // Buscamos los datos completos del carro para guardarlos en el chofer
      const vehiculoCompleto = this.unidadesDisponibles.find(v => v.id === selectedId);
      
      const index = this.choferes.findIndex(c => c.id === this.selectedChofer.id);
      this.choferes[index].vehiculo = vehiculoCompleto;
      
      this.closeUnitModal();
    }
  }

  editarChofer(chofer: any) { this.licenseForm.patchValue(chofer); this.showModal = true; }
  eliminarChofer(id: number) { this.choferes = this.choferes.filter(c => c.id !== id); }
  onSubmit() { if (this.licenseForm.valid) { this.closeModal(); } }
}