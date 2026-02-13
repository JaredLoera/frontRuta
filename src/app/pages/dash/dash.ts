import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { tileLayer, latLng, MapOptions } from 'leaflet';
import * as L from 'leaflet'; 
@Component({
  selector: 'app-dash',
  imports: [LeafletModule],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
})
export class Dash {
  map!: L.Map;
options: MapOptions = {
    layers: [
      tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: '© Hinojosa Industries'
      })
    ],
    zoom: 13,
    center: latLng(25.5439, -103.4190) // Cambia esto por tus coordenadas
  };
  onMapReady(map: L.Map) {
    this.map = map;

    // 1. Crear el icono personalizado (DivIcon)
    const taxiIcon = L.divIcon({
      html: '<div style="background-color: #D4AF37; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px #D4AF37;"></div>',
      className: 'custom-taxi-icon',
      iconSize: [14, 14],
      iconAnchor: [7, 7] // Centra el punto en la coordenada exacta
    });

    // 2. Crear y añadir el marcador al mapa capturado
    L.marker([25.5439, -103.4190], { icon: taxiIcon })
      .addTo(this.map)
      .bindPopup('<b>Unión de Taxis Torreón</b><br>Estado: Activo')
      .openPopup();

      
  }
}
