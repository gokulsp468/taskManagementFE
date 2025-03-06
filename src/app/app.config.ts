import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeng/themes/aura';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(), provideAnimations(),
    MessageService,
    NgbActiveModal,
    BrowserAnimationsModule,
    BrowserModule,
    DialogService,
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ],
};
