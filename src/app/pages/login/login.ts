import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          this.authService.setToken(res.data.token);
          this.router.navigate(['/dash']);
          this.authService.getUser().subscribe({
            next: (userRes) => {
              this.authService.setUser(userRes.data);
              this.authService.getProfile().subscribe({
                next: (profileRes) => {
                  this.authService.setProfile(profileRes.data);
                },
                error: (err) => {
                  console.error('Error al obtener perfil', err);
                }
              });
            },
            error: (err) => {
              console.error('Error al obtener usuario', err);
            }
          });
        },
        error: (err) => {
          console.error('Error en el login', err);
          alert('Credenciales incorrectas');
        }
      });
    }
  }
}
