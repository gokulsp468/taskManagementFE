import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showPassword = false;
  showConfirmPassword = false;
  loginForm: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
        ]],
      });
    }
  
    onSubmit() {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }
    
      const payload = this.loginForm.value;
      console.log('Logging user:', payload);
    
      this.authService.login(payload).subscribe({
        next: (response) => {
          if (response.status_code === 200 && response.data?.otp_sent) {
            console.log('Verification needed');
          } 
          else if (response.status_code === 200 && response.data?.access_token && response.data?.refresh_token) {
            console.log('Access and refresh token set accordingly');
            console.log('Access Token:', response.data.access_token);
            console.log('Refresh Token:', response.data.refresh_token);

            this.router.navigate(['/projects']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          console.log('Invalid credentials');
        }
      });
    }
    
}
