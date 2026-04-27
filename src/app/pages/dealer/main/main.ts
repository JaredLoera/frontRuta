import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { tileLayer, latLng, MapOptions } from 'leaflet';
import * as L from 'leaflet';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { User } from '../../../core/interfaces/user.interface';
import { Auth } from '../../../core/services/auth/auth';
import { Profile } from '../../../core/interfaces/profile.interface';
import { HostListener, ElementRef } from '@angular/core';
import { User as UserService } from '../../../core/services/user/user';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-main',
  imports: [RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  user: User | null = null;
  profile: Profile | null = null;
  constructor(private authService: Auth, private eRef: ElementRef, private userService: UserService) {
    this.loadMap();
  }


  goToExpenses() { }
  goToDrivers() { }
  goToMaintenance() { }

  // ... tus otras variables

  ngOnInit() {
    this.user = this.authService.getUserFromStorage();
    this.profile = this.authService.getProfileFromStorage();
    console.log(this.authService.getToken())
  }

  isUserMenuOpen = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // Opcional: Cerrar al hacer clic fuera
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }
  logout() {
    this.authService.closeSession().subscribe({
      next: (co: any) => {
        this.authService.logout();
        // Redirige al login después de cerrar sesión
        window.location.href = '';
      },
      error: (co: any) => {
        console.error();
        this.authService.logout();
        // Redirige al login después de cerrar sesión
        window.location.href = '';
      }
    })
  }

  private map: any;

  onMapReady(map: L.Map) {
    this.map = map;
    // Intentamos pintar por si los datos llegaron antes que el mapa
    this.loadMap();
  }

  private async loadMap(): Promise<void> {

    const L = await import('leaflet');
    const L_obj = (L as any).default || L;

    this.map = L_obj.map('map-container').setView([25.5439, -103.4190], 13);

    L_obj.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© Hinojosa Industries'
    }).addTo(this.map);

    // Marcadores de Taxis
    const taxiIcon = L_obj.divIcon({
      className: 'taxi-marker',
      html: '<div style="background:#D4AF37; width:12px; height:12px; border-radius:50%; border:2px solid #fff;"></div>'
    });

    L_obj.marker([25.5439, -103.4190], { icon: taxiIcon }).addTo(this.map).bindPopup('Unidad #102 - En Ruta');
  }
}

