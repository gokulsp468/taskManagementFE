import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragHandle
} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-projects',
  imports: [CommonModule,CdkDrag, CdkDropList,CdkDragHandle],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {


  columns = [
    {
      name: 'To Do',
      tasks: [
        { title: 'Product Design, Figma, Sketch', comments: 4, priority: 'Backlog', members: 5 },
        { title: 'Create wireframe for homepage', comments: 2, priority: 'Urgent', members: 3 }
      ]
    },
    {
      name: 'In Progress',
      tasks: [
        { title: 'Develop API endpoints', comments: 3, priority: 'In Progress', members: 2 }
      ]
    },
    {
      name: 'Completed',
      tasks: [
        { title: 'Fix UI bugs in dashboard', comments: 1, priority: 'Completed', members: 4 }
      ]
    }
  ];


  dropTask(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

}
