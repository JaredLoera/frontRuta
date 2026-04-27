import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/interfaces/user.interface';
import { Auth } from '../../../core/services/auth/auth';
import { Profile } from '../../../core/interfaces/profile.interface';
import { HostListener, ElementRef } from '@angular/core';
import { User as UserService } from '../../../core/services/user/user';
import { Response } from '../../../core/interfaces/response.interface';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.html',
  styleUrl: './dash.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class Dash implements OnInit {

  user: User | null = null;
  profile: Profile | null = null;

  constructor(private authService: Auth, private eRef: ElementRef, private userService: UserService) { }

  ngOnInit() {
    this.user = this.authService.getUserFromStorage();
    this.profile = this.authService.getProfileFromStorage();
    this.loadDealerships();
  }
  loadDealerships() {

  }
  // ... tus otras variables
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
}
