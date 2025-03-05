import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
  { path: 'projects', loadChildren: () => import('./features/projects/projects.routes').then(m => m.projectsRoutes) }
];
