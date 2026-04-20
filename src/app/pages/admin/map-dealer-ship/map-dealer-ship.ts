import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { tileLayer, latLng, MapOptions } from 'leaflet';
import * as L from 'leaflet';
import { Profile } from '../../../core/interfaces/profile.interface';
import { User } from '../../../core/interfaces/user.interface';
import { User as UserService } from '../../../core/services/user/user';

@Component({
  selector: 'app-map-dealer-ship',
  imports: [LeafletModule],
  templateUrl: './map-dealer-ship.html',
  styleUrl: './map-dealer-ship.css',
})
export class MapDealerShip implements OnInit {
  map!: L.Map;
  dealerships: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadDealerships();
  }

  loadDealerships() {
  
  }

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: '© Hinojosa Industries'
      })
    ],
    zoom: 13,
    center: latLng(25.5439, -103.4190)
  };

  onMapReady(map: L.Map) {
    this.map = map;
    // Intentamos pintar por si los datos llegaron antes que el mapa
    setTimeout(() => {
      this.map.invalidateSize();
      // Una vez que el tamaño es correcto, pintamos los marcadores
      this.renderMarkers();
    }, 500);
  }
private renderMarkers() {
  // if (!this.map || this.dealerships.length === 0) return;

  // // Opcional: Limpiar marcadores anteriores si vas a recargar datos
  // // this.map.eachLayer((layer) => { if (layer instanceof L.Marker) this.map.removeLayer(layer); });

  // const taxiIcon = L.divIcon({
  //   html: '<div style="background-color: #247ad0; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>',
  //   className: 'custom-taxi-icon',
  //   iconSize: [16, 16],
  //   iconAnchor: [8, 8]
  // });

  // const points: L.LatLng[] = [];

  // this.dealerships.forEach(dealer => {
  //   const lat = Number(dealer.dealershipProfile?.latitude);
  //   const lng = Number(dealer.dealershipProfile?.longitude);

  //   if (!isNaN(lat) && !isNaN(lng)) {
  //     const coords = L.latLng(lat, lng);
  //     points.push(coords);

  //     L.marker(coords, { icon: taxiIcon })
  //       .addTo(this.map)
  //       .bindPopup(`<b>${dealer.dealershipProfile?.companyName || 'Concesionaria'}</b>`);
  //   }
  // });

  // if (points.length > 0) {
  //   const bounds = L.latLngBounds(points);
  //   this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  // }
}
}