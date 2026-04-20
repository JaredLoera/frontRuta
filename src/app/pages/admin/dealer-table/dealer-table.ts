import { Component, OnInit } from '@angular/core';
import { DealerShip } from '../../../core/interfaces/dealer.interface';
import { User as UserService } from '../../../core/services/user/user';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dealershipservice } from '../../../core/services/dealership/dealershipservice';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
@Component({
  selector: 'app-dealer-table',
  imports: [ReactiveFormsModule, CommonModule, AsyncPipe, NgxSonnerToaster],
  templateUrl: './dealer-table.html',
  styleUrl: './dealer-table.css',
})
export class DealerTable implements OnInit {
  dealerships: DealerShip[] = [];
  form!: FormGroup;
  Newdelealership: DealerShip | null = null;


  constructor(private userService: UserService, private fb: FormBuilder, private dealershipService: Dealershipservice, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      businessName: ['', Validators.required],
      taxId: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      concessionNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDealerships();
  }
  loadDealerships() {
    this.dealershipService.getDealerShips().subscribe({
      next: (res) => {
        this.dealerships = [...res]; // 3. Usa el spread operator para asegurar una nueva referencia
        this.cdr.detectChanges();   // 4. Forzar la actualización
      },
      error: (err) => {
        console.error('Error al cargar las concesionarias', err);
      }
    });
  }


  onSubmit() {

    this.Newdelealership = {

      name: this.form.value.name,
      businessName: this.form.value.businessName,
      taxId: this.form.value.taxId,
      address: this.form.value.address,
      phone: this.form.value.phone,
      concessionNumber: this.form.value.concessionNumber,
      ownerEmail: this.form.value.email,

    }

    this.dealershipService.createDealerShip(this.Newdelealership).subscribe({
      next: (res) => {
        console.log('Concesionaria creada:', res);
        this.loadDealerships();
        this.closeModal();

        setTimeout(() => {
          const email = res.ownerEmail;
          const password = res.temporaryPassword;
          // Lanzamos el Toast que NO se quita solo
          // 2. Mostramos el Toast "persistente" con la info
          toast.success('¡Registro Exitoso!', {
            description: `Se ha creado el acceso para ${res.name}. 
                    Usuario: ${email} 
                    Contraseña: ${password}`,
            duration: Infinity, // No se quita solo
            action: {
              label: 'Copiar Password',
              onClick: () => {
                navigator.clipboard.writeText(password || '')
                toast.info('Contraseña copiada al portapapeles');
              }
            },
          });
        }, 100);


      },
      error: (err) => {
        console.error('Error al crear la concesionaria', err);
      }
    });

  }

  showModal = false;
  modalTitle = '';

  openAddModal() {
    this.modalTitle = 'Registrar Nueva Concesionaria';
    this.showModal = true;
  }

  viewDealer(dealer: any) {
    this.modalTitle = `Detalles de: ${dealer.nombreComercial}`;
    this.showModal = true;
    // Aquí cargarías los datos en un FormGroup o simplemente mostrarías la información
  }

  toggleStatus(dealer: any) {
    dealer.activo = !dealer.activo;
  }

  editDealer(dealer: any) {
    this.modalTitle = `Editando: ${dealer.nombreComercial}`;
    this.showModal = true;
    // Aquí cargarías los datos en un FormGroup
  }

  closeModal() {
    this.showModal = false;
  }
}
