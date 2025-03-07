import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Event, RouterEvent, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-task-side-bar',
  imports: [RouterLink],
  templateUrl: './task-side-bar.component.html',
  styleUrl: './task-side-bar.component.scss',
})
export class TaskSideBarComponent implements OnInit, OnDestroy {
  private navigationService = inject(NavigationService);
  private router = inject(Router);
  private subscription?: Subscription;
  activeMenuUrl: string = '';

  ngOnInit(): void {
    this.activeMenuUrl = this.router.url;

    this.subscription = this.router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent
        )
      )
      .subscribe((e: RouterEvent) => {
        this.activeMenuUrl = e.url;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  isMenuActive(menu: string): boolean {
    const activeUrl = this.activeMenuUrl.split('/')[1];
    if (menu == activeUrl) {
      return true;
    }

    return false;
  }

  isSidebarCollapsed(): boolean {
    return this.navigationService.isSidebarCollapsed;
  }
}
