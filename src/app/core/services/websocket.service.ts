import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private apiUrl = environment.websocketUrl;
  private socket$!: WebSocketSubject<any>;

  constructor() {

  }

  connect(projectId: string) {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    const wsUrl = `${this.apiUrl}/ws/project/${projectId}?token=${token}`;

    this.socket$ = new WebSocketSubject(wsUrl);
  }

  sendMessage(message: any) {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  getMessages() {
    return this.socket$;
  }

  close() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
