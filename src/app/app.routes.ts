import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authPagesGuard } from './core/guards/auth-pages.guard';
// import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),canActivate: [authPagesGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.dashboardRoutes
      ),canActivate: [authGuard],
  },
];
