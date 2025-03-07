import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('../projects/projects.routes').then((m) => m.projectsRoutes),
      },
    ],
  },
];
