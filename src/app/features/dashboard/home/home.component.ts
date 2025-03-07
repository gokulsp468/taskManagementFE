import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskNavBarComponent } from '../../navigation/task-nav-bar/task-nav-bar.component';
import { TaskSideBarComponent } from '../../navigation/task-side-bar/task-side-bar.component';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, TaskNavBarComponent, TaskSideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private navigationService = inject(NavigationService);

  isSidebarCollapsed(): boolean {
    return this.navigationService.isSidebarCollapsed;
  }
}
