import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskNavBarComponent } from '../../navigation/task-nav-bar/task-nav-bar.component';
import { TaskSideBarComponent } from '../../navigation/task-side-bar/task-side-bar.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, TaskNavBarComponent, TaskSideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
