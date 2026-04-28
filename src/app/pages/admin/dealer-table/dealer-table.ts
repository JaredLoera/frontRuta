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
  editingDealerId: string | null = null; // Para guardar el ID del dealer que se edita
  dealerships: DealerShip[] = [];
  form!: FormGroup;
  Newdelealership: DealerShip | null = null;
  showModal = false;
  modalTitle = '';
  isEditing = false;

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

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Para que se pinten los bordes rojos en el UI

      // 1. Buscamos el primer error para mostrar un mensaje claro
      const firstInvalidField = Object.keys(this.form.controls).find(key => this.form.get(key)?.invalid);

      if (firstInvalidField) {
        const control = this.form.get(firstInvalidField);
        let message = `Error en el campo ${firstInvalidField}`;

        // 2. Personalizamos el mensaje según el tipo de error
        if (control?.errors?.['required']) {
          message = `El campo "${this.getFriendlyName(firstInvalidField)}" es obligatorio.`;
        } else if (control?.errors?.['pattern']) {
          message = `Formato incorrecto en "${this.getFriendlyName(firstInvalidField)}". Ejemplo: AB-1234-5678`;
        } else if (control?.errors?.['email']) {
          message = `El correo electrónico no es válido.`;
        }

        toast.error('Campos pendientes', {
          description: message,
        });
      }
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
        this.form.reset(); // PARA LIMPAIR EL FORMU

        setTimeout(() => {
          const email = res.ownerEmail;
          const password = res.temporaryPassword;

          toast.success('¡Registro Exitoso!', {
            description: `Acceso creado para el Usuario: ${email}`,
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

  // 3. Función auxiliar para nombres amigables (opcional)
  getFriendlyName(key: string): string {
    const names: { [key: string]: string } = {
      email: 'Email',
      name: 'Nombre de la Base',
      businessName: 'Nombre de la Empresa',
      taxId: 'Tax ID',
      address: 'Dirección',
      phone: 'Teléfono',
      concessionNumber: 'Número de Concesión'
    };
    return names[key] || key;
  }


  openAddModal() {
    this.isEditing = false;
    this.editingDealerId = null;
    this.modalTitle = 'Registrar Nueva Concesionaria';
    this.form.reset();

    // Habilitar el email para nuevos registros
    this.form.get('email')?.enable();

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

  editDealer(dealer: DealerShip) {
    this.isEditing = true;
    this.editingDealerId = dealer.id || null; // Asegúrate de que tu interfaz tenga 'id'
    this.modalTitle = `Editando: ${dealer.name}`;

    // Rellenamos el formulario con los datos actuales
    this.form.patchValue({
      email: dealer.ownerEmail,
      name: dealer.name,
      businessName: dealer.businessName,
      taxId: dealer.taxId,
      address: dealer.address,
      phone: dealer.phone,
      concessionNumber: dealer.concessionNumber
    });
    // 2. Bloqueamos el campo de email solo en edición
    this.form.get('email')?.disable();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
