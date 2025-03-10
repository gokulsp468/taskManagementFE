import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { BoardComponent } from '../board/board.component';

export const projectsRoutes: Routes = [
  { path: '', component: ProjectsComponent },
  {path: 'board',component:BoardComponent},
];
