import { Component, OnInit } from '@angular/core';
import { DealerShip } from '../../../core/interfaces/dealer.interface';
import { User as UserService } from '../../../core/services/user/user';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dealershipservice } from '../../../core/services/dealership/dealershipservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
@Component({
  selector: 'app-dealer-table',
  imports: [ReactiveFormsModule, CommonModule, NgxSonnerToaster],
  templateUrl: './dealer-table.html',
  styleUrl: './dealer-table.css',
})
export class DealerTable implements OnInit {

  dealerships: DealerShip[] = [];
  form!: FormGroup;
  Newdelealership: DealerShip | null = null;


  constructor(private fb: FormBuilder, private dealershipService: Dealershipservice, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      businessName: ['', Validators.required],
      taxId: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      concessionNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}-\d{4}-\d{4}$/)]],
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
    // 1. Verificación manual por si acaso
    console.log('Formulario válido:', this.form.valid);
    console.log('Valores del formulario:', this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca campos para mostrar errores visuales
      toast.error('Por favor, rellena todos los campos obligatorios');
      return;
    }

    this.Newdelealership = {
      name: this.form.value.name,
      businessName: this.form.value.businessName,
      taxId: this.form.value.taxId,
      address: this.form.value.address,
      phone: this.form.value.phone,
      concessionNumber: this.form.value.concessionNumber,
      ownerEmail: this.form.value.email,
    };

    this.dealershipService.createDealerShip(this.Newdelealership).subscribe({
      next: (res) => {
        console.log('Concesionaria creada:', res);
        this.loadDealerships();
        this.closeModal();
        this.form.reset(); // Limpia el formulario para la próxima vez

        setTimeout(() => {
          const email = res.ownerEmail;
          const password = res.temporaryPassword;

          toast.success('¡Registro Exitoso!', {
            description: `Acceso creado para ${res.name}. Usuario: ${email}`,
            duration: Infinity,
            action: {
              label: 'Copiar Pass',
              onClick: () => {
                navigator.clipboard.writeText(password || '');
                toast.info('Contraseña copiada');
              }
            },
          });
        }, 100);
      },
      error: (err) => {
        console.error('Error al crear la concesionaria', err);
        let backendMessage = 'Ocurrió un error inesperado';

        if (err.error && err.error.message) {
          // Si el mensaje es un array (como en tu caso), tomamos el primero
          // Si es un string, lo tomamos directo
          //TODO: Mejorar esta lógica si el formato de error puede variar
          backendMessage = Array.isArray(err.error.message)
            ? err.error.message[0]
            : err.error.message;
        }

        // 2. Mostramos el Toast de error
        toast.error('Error de Validación', {
          description: backendMessage,
          duration: 6000, // Le damos tiempo para leer el formato
          style: {
            background: '#fff1f0',
            color: '#cf1322',
            border: '1px solid #ffa39e'
          }
        });
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
