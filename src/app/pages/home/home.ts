import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
//is logged
loggedIn: boolean = false;

constructor(private authService: Auth) {
  this.loggedIn = !!this.authService.getToken();
}


}
