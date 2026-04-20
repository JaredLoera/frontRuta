import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { toast, NgxSonnerToaster } from 'ngx-sonner'; // 1. Importar Sonner

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,NgxSonnerToaster
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
          // Toast de éxito opcional antes de navegar
          toast.success('Bienvenido de nuevo');
          
          this.authService.setToken(res.token);
          this.authService.setUser(res.user);
          
          if (res.user.role === 'ADMIN') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/dash']);
          }
        },
        error: (err) => {
          console.error('Error en el login', err);
          
          // 3. Reemplazamos el alert por un Toast de error profesional
          toast.error('Acceso Denegado', {
            description: 'El correo o la contraseña son incorrectos. Inténtalo de nuevo.',
            style: {
              background: '#161616', // Siguiendo tu estética oscura
              color: '#ff4b4b',
              border: '1px solid #333'
            }
          });
        }
      });
    } else {
      // Por si intentan dar click sin llenar los campos
      toast.warning('Campos incompletos', {
        description: 'Por favor, llena todos los campos correctamente.'
      });
    }
  }
}
