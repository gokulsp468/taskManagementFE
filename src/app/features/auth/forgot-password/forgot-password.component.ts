import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { confirmPasswordValidator, emailValidator } from '../../../shared/validators/common_validators';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  showPassword = false;
  showConfirmPassword = false;
  forgotpasswordForm: FormGroup;
  loading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: MessageService,
    private router: Router,
    
    ) {
    this.forgotpasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailValidator]]
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.forgotpasswordForm.invalid) {
      this.forgotpasswordForm.markAllAsTouched();
      this.loading = false;
      return;
    }

    const  payload  = this.forgotpasswordForm.value;
    console.log('Forgot Password:', payload);
    this.authService.forgotPassword(payload).subscribe({
      next: (response) => {
        if(response.success){
          this.loading = false;
          this.toaster.add({ severity: 'success', summary: 'Success', detail: response.message });
          console.log('Otp sent successfully', response);
          // this.router.navigate(['auth/reset-password']);
          this.router.navigate(['auth/reset-password'], { queryParams: { email: payload.email } });

        }
      },
      error: (error) => {
        this.loading = false;
        this.toaster.add({ severity: 'error', summary: 'Error', detail: error.error.message?error.error.message:'Oops Something went wrong .Try later' });
        console.error('Failed to sent OTP:', error);
      }
    });
  }
}
