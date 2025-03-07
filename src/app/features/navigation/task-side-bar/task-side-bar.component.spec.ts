import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSideBarComponent } from './task-side-bar.component';

describe('TaskSideBarComponent', () => {
  let component: TaskSideBarComponent;
  let fixture: ComponentFixture<TaskSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
