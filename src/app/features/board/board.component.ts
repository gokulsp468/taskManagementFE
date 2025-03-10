import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragHandle
} from '@angular/cdk/drag-drop';
import { WebsocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-board',
  imports: [CommonModule,CdkDrag, CdkDropList,CdkDragHandle],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{

  @Input() projectId: string = "f1cf4a15-ad3e-4a00-bac4-b1ed1abf7f27";
  private wsSubscription!: Subscription;

  constructor(private cdr: ChangeDetectorRef,private webSocketService: WebsocketService) { }


  ngOnInit(): void {
    if (this.projectId) {
      console.log('Connecting to WebSocket for project:', this.projectId);
      this.webSocketService.connect(this.projectId);
      this.wsSubscription = this.webSocketService.getMessages().subscribe((data) => {
        console.log('Received update:', data);
        this.handleBoardUpdate(data);
      });
    }
  }


  handleBoardUpdate(data: any) {
    // Update board UI based on received WebSocket data
  }



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
    },


  ];


  dropTask(event: CdkDragDrop<any[]>) {
    if (!event.isPointerOverContainer) {
      console.log("Drop ignored: Not over a valid container");
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log("Updated columns:", this.columns);

    // 🔹 Manually trigger change detection
    this.cdr.detectChanges();
  }




  get connectedDropLists(): string[] {
    return this.columns.map(c => `task-list-${c.name}`);
  }



  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }






  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
    this.webSocketService.close();
  }
}
