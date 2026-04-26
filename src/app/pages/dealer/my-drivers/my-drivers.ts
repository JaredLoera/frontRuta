import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Vehiclesservice } from '../../../core/services/vehicles/vehiclesservice';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { Driver } from '../../../core/interfaces/drivers.interface';
import { environment } from '../../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { Vehicle } from '../../../core/interfaces/vehicle.interface';
import { assings } from '../../../core/interfaces/assing.interface';

@Component({
  selector: 'app-my-drivers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSonnerToaster],
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
  driverss: Driver[] = [];
  unidades: Vehicle[] = [];


  constructor(private fb: FormBuilder, private vehiclesService: Vehiclesservice, private cdr: ChangeDetectorRef) {
    this.initForms();
  }

  getMyDriver() {
    this.vehiclesService.getDriver(this.currentConcessionaireId).subscribe({
      next: (res) => {
        this.driverss = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    }
    );
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem(environment.storageNames.user)!)
    this.currentConcessionaireId = user.concessionaireId;
    this.licenseForm.patchValue({ concessionaireId: this.currentConcessionaireId });
    this.getMyDriver();
    this.loadVehicles();
  }

  initForms() {
    this.licenseForm = this.fb.group({
      concessionaireId: [''],
      licenseNumber: ['', Validators.required],
      licenseExpiry: ['', Validators.required]
    });

    // El formulario de unidad ahora solo pide el ID del vehículo seleccionado
    this.unitForm = this.fb.group({
      vehicleId: ['', Validators.required],
    });
  }

  openAddModal() {
    this.licenseForm.reset({ concessionaireId: this.currentConcessionaireId });
    this.showModal = true;
  }
  closeModal() { this.showModal = false; }

  openUnitModal(chofer: Driver) {
    this.selectedChofer = chofer.id;
    this.showUnitModal = true;
  }
  closeUnitModal() { this.showUnitModal = false; }

  onSaveUnit() {
    if (this.unitForm.invalid) {
     toast.error("Debe seleccionar una unidad")
    }
     const payload: assings = {
        vehicleId: this.unitForm.value.vehicleId,
        driverId: this.selectedChofer
      }
      this.vehiclesService.assing(payload).subscribe({
        next: (res) => {
          toast.success('Unidad asignada correctamente', res);
          this.loadVehicles(); // Al recargar, detectChanges se llamará automáticamente
          this.closeUnitModal()
        }, error: (err) => {
          toast.error('Error al asignar la unidad');
          console.error(err);
        }
      })
    this.unitForm.reset();

  }

  editarChofer(chofer: any) { this.licenseForm.patchValue(chofer); this.showModal = true; }
  eliminarChofer(driverr: Driver) {
    const id = driverr.id;
    this.driverss = this.driverss.filter(c => c.id !== id);
  }
  onSubmit() {
    if (this.licenseForm.valid) {
      console.log(this.licenseForm.value);
      this.vehiclesService.createDriver(this.licenseForm.value).subscribe({
        next: (res) => {
          console.log(res);
          const { email, temporaryPassword } = res.credentials;
          toast.success('Chofer registrado', {
            description: `Email: ${email}\nPassword: ${temporaryPassword}`,
            duration: Infinity, //INFINITUM CHINGEU SU
            action: {
              label: 'Copiar Password',
              onClick: () => {
                navigator.clipboard.writeText(temporaryPassword!);
                toast.info('Contraseña copiada al portapapeles');
              }
            },
          });
          this.showModal = false;
          this.licenseForm.reset({ concessionaireId: this.currentConcessionaireId });
          this.getMyDriver();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          toast.error('Error al registrar el chofer');
        }
      });
    }
  }
  loadVehicles() {
    this.vehiclesService.getVehicles(this.currentConcessionaireId!).subscribe(
      {
        next: (res) => {
          this.unidades = res;
          console.log('Unidades cargadas:', this.unidades);
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          toast.error('Error al cargar las unidades');
          console.error(err);
        }
      }
    );
    console.log('Unidades cargadas:', this.unidades);
  }
}