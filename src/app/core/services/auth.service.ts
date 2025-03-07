import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient) { }

  isSessionActive(): string | null {
    const token = localStorage.getItem('accesstoken');

    if (token) {
      return token;
    }

    return null;
  }

  logout(): void {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshToken');
    // localStorage.removeItem('rememberMe');
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/`, userData);
  }

  verifyOtp(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/verify-otp/`, data);
  }

  resentOtp(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/resend-otp/`, data);
  }

}
