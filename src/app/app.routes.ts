import { Routes } from '@angular/router';
import { authPagesGuard } from './core/guards/auth-pages.guard';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
// import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
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
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
