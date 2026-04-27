import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptor/auth/auth-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { unauthorizedInterceptor } from './core/interceptor/unauthorized/unauthorized-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     provideHttpClient(withInterceptors([authInterceptor, unauthorizedInterceptor])),
  ]
};
