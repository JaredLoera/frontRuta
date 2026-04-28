import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core'; // <-- 1. Importar ChangeDetectorRef y OnInit
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Brand } from '../../../core/interfaces/brands.interface';
import { Models } from '../../../core/interfaces/models.interface';
import { Vehicle } from '../../../core/interfaces/vehicle.interface';
import { Vehiclesservice } from '../../../core/services/vehicles/vehiclesservice';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { User } from '../../../core/interfaces/user.interface';
import { unassign } from '../../../core/interfaces/unassign.interface';

@Component({
  selector: 'app-my-units',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './my-units.html',
  styleUrl: './my-units.css'
})
export class MyUnits {
  user: User | null = null;
  showModal = false;
  currentConcessionaireId = this.user?.concessionaireId!; 
  unidadForm!: FormGroup;
  // Listas de datos
  unidades: Vehicle[] = [];
  brands: Brand[] = [];
  allModels: Models[] = [];
  filteredModels: Models[] = []; 


  constructor(private fb: FormBuilder, private vehiclesService: Vehiclesservice,
    private cdr: ChangeDetectorRef // <-- 2. Inyectar ChangeDetectorRef
  ) { }

  onUnassign(unidad: Vehicle) {
  const vehicleId = unidad.id as string; // Aseguramos que no es undefined
  const driverId = unidad.assignedTo as string; // Aseguramos que no es undefined
  const unassignData: unassign = { vehicleId, driverId };

  console.log("DAOTS ", unassignData)

  if (!vehicleId || !driverId) {
    toast.error('No se pudo identificar la asignación');
    return;
  }

  this.vehiclesService.unassign(unassignData).subscribe({
    next: () => {
      toast.success('Unidad desasignada con éxito');
      this.loadVehicles();
    },
    error: (err) => {
      console.error(err);
      toast.error('El conductor ya se encuentra con un vehículo asignado');
    }
  });
}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(environment.storageNames.user) || 'null');
    this.initForm();
    this.loadInitialData();
    console.log( this.user?.concessionaireId!)
 
    this.unidadForm.get('brandId')?.valueChanges.subscribe(selectedBrandId => {
      if (selectedBrandId) {

        this.filteredModels = this.allModels.filter(m => m.brandId === selectedBrandId);
        this.unidadForm.get('modelId')?.enable(); 
      } else {
        this.filteredModels = [];
        this.unidadForm.get('modelId')?.disable();
      }

      this.unidadForm.get('modelId')?.setValue('');
    });
  }

  initForm() {
    this.unidadForm = this.fb.group({
      licensePlate: ['', [Validators.required]],
      brandId: ['', [Validators.required]], // Campo auxiliar para filtrar
      modelId: [{ value: '', disabled: true }, [Validators.required]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1990)]],
      color: ['#ffffff', [Validators.required]], // Formato Hex
      specialAttention: [false]
    });
  }

  loadInitialData() {
    // Cargar Marcas
    this.vehiclesService.getBrands().subscribe(res => {
      this.brands = res;
      this.cdr.detectChanges(); // <-- 3. Forzar actualización de vista
    });
    
    // Cargar Modelos
    this.vehiclesService.getModels().subscribe(res => {
      this.allModels = res;
      this.cdr.detectChanges(); // <-- Forzar actualización de vista
    });
    
    // Cargar Vehículos
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehiclesService.getVehicles(this.user?.concessionaireId!).subscribe(
      {
        next: (res) => {
          this.unidades = res;
          this.cdr.detectChanges(); // <-- Forzar actualización de vista para la tabla/grid
        },
        error: (err) => {
          console.error(err);
        } 
      }
    );
    console.log('Unidades cargadas:', this.unidades);
  }

  openAddModal() {
    this.unidadForm.reset({ year: new Date().getFullYear(), color: '#ffffff', specialAttention: false });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.unidadForm.invalid) {
      this.unidadForm.markAllAsTouched();
      return;
    }

    const formValues = this.unidadForm.value;

    // Construir el Payload EXACTO que espera NestJS
    const payload: Vehicle = {
      year: Number(formValues.year),
      color: formValues.color, // Ya viene en Hex desde el input type="color"
      licensePlate: formValues.licensePlate,
      specialAttention: formValues.specialAttention,
      modelId: formValues.modelId,
      concessionaireId: this.user?.concessionaireId! // Tu ID de concesionaria
    };
    
    this.vehiclesService.createVehicle(payload).subscribe({
      next: (res) => {
        toast.success('Unidad registrada correctamente', res);
        this.loadVehicles(); // Al recargar, detectChanges se llamará automáticamente
         this.closeModal();
       },
       error: (err) => {
         console.error(err);
         toast.error('Error al registrar la unidad');
       }
     });
  }
}