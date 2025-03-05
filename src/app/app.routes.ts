import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
  { path: 'projects', loadChildren: () => import('./features/projects/projects.routes').then(m => m.projectsRoutes) }
];
