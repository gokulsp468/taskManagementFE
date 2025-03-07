import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('../projects/projects.routes').then((m) => m.projectsRoutes),
      }
    ],
  },
];
