import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';
import { emailValidator } from '../../../shared/validators/common_validators';

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
  loading:boolean = false;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private toaster: MessageService,
      private modalService: NgbModal,
      public activeModal: NgbActiveModal
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email, emailValidator]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
        ]],
      });
    }

    onSubmit() {
      this.loading = true;
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        this.loading = false;
        return;
      }

      const payload = this.loginForm.value;
      console.log('Logging user:', payload);

      this.authService.login(payload).subscribe({
        next: (response) => {
          if (response.status_code === 200 && response.data?.otp_sent) {
            this.loading = false;
            const modalRef = this.modalService.open(OtpModalComponent, {
            backdrop: 'static',
          });
          modalRef.componentInstance.email = response.data.email;
          }
          else if (response.status_code === 200 && response.data?.access_token && response.data?.refresh_token) {
            console.log('Access and refresh token set accordingly');
            console.log('Access Token:', response.data.access_token);
            console.log('Refresh Token:', response.data.refresh_token);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            this.loading = false;
            this.toaster.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
            this.router.navigate(['/projects']);
          }
        },
        error: (error) => {
          this.loading = false;
          this.toaster.add({ severity: 'error', summary: 'Error', detail: error.error.message?error.error.message:'Oops Something went wrong .Try later' });
          // console.error('Login failed:', error);
          console.log('Invalid credentials',error);
        }
      });
    }

    togglePassword(field: string) {
      if (field === 'password') {
        this.showPassword = !this.showPassword;
      }
    }
}
