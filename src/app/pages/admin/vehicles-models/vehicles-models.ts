import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicles-models',
  imports: [],
  templateUrl: './vehicles-models.html',
  styleUrl: './vehicles-models.css',
})
export class VehiclesModels {
  selectedBrand: string = '';

  onBrandChange(event: any) {
    this.selectedBrand = event.target.value;
    // Aquí puedes agregar lógica adicional para cargar modelos según la marca seleccionada
  }
  selectedModel: string = '';
  onModelChange(event: any) {
    this.selectedModel = event.target.value;
    // Aquí puedes agregar lógica adicional para cargar detalles del modelo seleccionado
  }
  selectedYear: string = '';
  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    // Aquí puedes agregar lógica adicional para cargar detalles del año seleccionado
  }

  addModel(event: any) {
    // Aquí puedes agregar lógica para agregar un nuevo modelo de vehículo
    alert(`Agregando modelo: Marca=${this.selectedBrand}, Modelo=${this.selectedModel}, Año=${this.selectedYear}`);
  }
  addBrand(event: any) {
    // Aquí puedes agregar lógica para agregar una nueva marca de vehículo
    alert(`Agregando marca: Marca=${this.selectedBrand}`);
  }
}
