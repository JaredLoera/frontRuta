import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brand } from '../../../core/interfaces/brands.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { Vehiclesservice } from '../../../core/services/vehicles/vehiclesservice';
import { Models } from '../../../core/interfaces/models.interface';


export interface VehicleBrand {
  id: string;
  name: string;
}

export interface VehicleModel {
  id: string;
  brandId: string;
  name: string;
}

@Component({
  selector: 'app-vehicles-models',
  imports: [CommonModule, ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './vehicles-models.html',
  styleUrl: './vehicles-models.css',
})
export class VehiclesModels {
  totalMarcas = 0;
  totalModelos = 0;

  form!: FormGroup;
  formModel!: FormGroup;
  constructor(private vehiclesService: Vehiclesservice, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
    this.formModel = this.fb.group({
      name: ['', Validators.required],//añadir id de marca
    });
  }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.vehiclesService.getBrands().subscribe({
      next: (res) => {
        console.log('Marcas obtenidas:', res);
        setTimeout(() => {
          this.totalMarcas = res.length;
          this.cdr.detectChanges();
        }, 0);
        this.brands = [...res];
      },
      error: (err) => {
        console.error('Error al obtener las marcas', err);
      }
    });
    this.vehiclesService.getModels().subscribe({
      next: (res) => {
        console.log('Modelos obtenidos:', res);
        setTimeout(() => {
          this.totalModelos = res.length;
          this.cdr.detectChanges();
        }, 0);
        this.allModels = [...res];
      },
      error: (err) => {
        console.error('Error al obtener los modelos', err);
      }
    });
  }

  onSubmit() {
    const newBrand: Brand = {
      name: this.form.value.name,
    };
    this.vehiclesService.createBrand(newBrand).subscribe({
      next: (res) => {
        console.log('Marca creada:', res);
        toast.success(`Marca "${res.name}" creada exitosamente.`);
        this.getBrands(); // Refresca la lista de marcas después de crear una nueva
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al crear la marca', err);
        toast.error('Error al crear la marca. Inténtalo de nuevo.');
      }
    });
  }
  onSubmitModel() {
    const newModel: Models = {
      name: this.formModel.value.name,
      brandId: this.selectedBrand?.id || '' // Aseguramos que haya una marca seleccionada
    };
    this.vehiclesService.createModel(newModel).subscribe({
      next: (res) => {
        console.log('Modelo creado:', res);
        toast.success(`Modelo "${res.name}" creado exitosamente.`);
        this.getBrands(); // Refresca la lista de marcas y modelos después de crear uno nuevo
        this.closeModelModal();
        toast.success(`Modelo "${newModel.name}" agregado a "${this.selectedBrand?.name}".`);
      },
      error: (err) => {
        console.error('Error al crear el modelo', err);
        toast.error('Error al crear el modelo. Inténtalo de nuevo.');
      }
    });

    this.closeModelModal();
  }
  // 2. Estado inicial (Simulando datos que vendrían de tu API en NestJS)
  brands: Brand[] = [];

  allModels: Models[] = [

  ];

  // Marca actualmente seleccionada
  selectedBrand: Brand | null = null;

  // 3. Getter dinámico: Retorna solo los modelos de la marca seleccionada
  get filteredModels(): Models[] {
    if (!this.selectedBrand) return [];
    return this.allModels.filter(model => model.brandId === this.selectedBrand!.id);
  }

  // ==========================================
  // LÓGICA DE MARCAS (COLUMNA IZQUIERDA)
  // ==========================================

  selectBrand(brand: Brand) {
    this.selectedBrand = brand;
  }

  addBrand(name: string) {
    const cleanName = name.trim();
    if (!cleanName) return;

    // Evitar duplicados
    const exists = this.brands.some(b => b.name.toLowerCase() === cleanName.toLowerCase());
    if (exists) {
      alert('Esta marca ya está registrada.');
      return;
    }

    const newBrand: Brand = {
      id: Date.now().toString(), // Generando un ID temporal
      name: cleanName
    };

    this.brands.push(newBrand);
  }

  deleteBrand(brand: Brand, event: Event) {
    // Evita que al dar clic en "Eliminar" se seleccione la fila
    event.stopPropagation();

    if (confirm(`¿Estás seguro de eliminar la marca ${brand.name}? Se eliminarán todos sus modelos.`)) {
      // Eliminar la marca
      this.brands = this.brands.filter(b => b.id !== brand.id);
      // Eliminar los modelos huérfanos asociados a esa marca
      this.allModels = this.allModels.filter(m => m.brandId !== brand.id);

      // Si la marca eliminada era la que estaba seleccionada, limpiamos la vista
      if (this.selectedBrand?.id === brand.id) {
        this.selectedBrand = null;
      }
    }
  }

  // ==========================================
  // LÓGICA DE MODELOS (COLUMNA DERECHA)
  // ==========================================

  addModel(name: string) {
    const cleanName = name.trim();
    if (!cleanName || !this.selectedBrand) return;

    // Evitar duplicados en la misma marca
    const exists = this.filteredModels.some(m => m.name.toLowerCase() === cleanName.toLowerCase());
    if (exists) {
      alert(`El modelo ${cleanName} ya existe en ${this.selectedBrand.name}.`);
      return;
    }

    const newModel: Models = {
      id: Date.now().toString(),
      brandId: this.selectedBrand.id!, // Lo vinculamos a la marca seleccionada
      name: cleanName
    };

    this.allModels.push(newModel);
  }

  deleteModel(model: Models) {
    if (confirm(`¿Eliminar el modelo ${model.name}?`)) {
      this.allModels = this.allModels.filter(m => m.id !== model.id);
    }
  }
  // ==========================================
  // ESTADO DEL MODAL
  // ==========================================
  isModalOpen: boolean = false;
  newBrandName: string = ''; // Aquí guardaremos lo que escriba el usuario

  // Abrir el modal
  openAddModal() {
    this.newBrandName = ''; // Limpiamos el input al abrir
    this.isModalOpen = true;
  }

  // Cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Guardar la marca y generar el JSON
  // ==========================================
  // ESTADO DEL MODAL DE MODELOS
  // ==========================================
  isModelModalOpen: boolean = false;
  newModelName: string = ''; // O si usas Reactive Forms, tu FormControl

  // Abrir modal de modelo
  openModelModal() {
    if (!this.selectedBrand) {
      alert('Por favor, selecciona una marca primero.');
      return;
    }
    this.newModelName = '';
    this.isModelModalOpen = true;
  }

  // Cerrar modal de modelo
  closeModelModal() {
    this.isModelModalOpen = false;
  }

  // Guardar modelo y generar JSON
  saveModel() {


    console.log('Modelo agregado localmente:');

    this.closeModelModal();
  }
}
