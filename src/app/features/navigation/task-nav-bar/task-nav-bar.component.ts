import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-task-nav-bar',
  imports: [],
  templateUrl: './task-nav-bar.component.html',
  styleUrl: './task-nav-bar.component.scss',
})
export class TaskNavBarComponent {
  private navigationService = inject(NavigationService);

  toggleSidebar(): void {
    this.navigationService.toggleSidebar();
  }
}
