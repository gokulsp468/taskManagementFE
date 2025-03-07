import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { confirmPasswordValidator } from '../../../shared/validators/common_validators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
    showPassword = false;
    showConfirmPassword = false;
    regsetForm: FormGroup;
    loading:boolean = false;
    otpArray: string[] = ['', '', '', '', '', ''];
    email: string | null = null;
    otpTouched: boolean = false; 
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private toaster: MessageService,
      private route: ActivatedRoute,
      private router: Router
      ) {
        this.route.queryParams.subscribe(params => {
          this.email = params['email'] || null;
        });
    
        this.regsetForm = this.fb.group({
          otp0: ['', Validators.required],
          otp1: ['', Validators.required],
          otp2: ['', Validators.required],
          otp3: ['', Validators.required],
          otp4: ['', Validators.required],
          otp5: ['', Validators.required],
          password: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')
          ]],
          confirmPassword: ['', Validators.required]
        }, { validators: confirmPasswordValidator });
      }
    
      markOtpTouched() {
        this.otpTouched = true;
      }
    
      onSubmit() {
        this.otpTouched = true; 
    
        const otp = this.getOtpValue();
    
        if (this.regsetForm.invalid) {
          this.regsetForm.markAllAsTouched();
          return;
        }
        if (this.email === null) {
          this.toaster.add({ severity: 'error', summary: 'Error', detail: 'Oops! something went wrong. Try again' });
          this.router.navigate(['auth/forgot-password']);
          return;
        }
      
        if (otp.length === 6) {
          this.loading = true;
          const data = {
            email: this.email, 
            otp: otp,
            new_password: this.regsetForm.value.password
          };
      
          this.authService.verifyResetOtp(data).subscribe({
            next: (response) => {
              if (response.success) {
                this.loading = false;
                this.toaster.add({ severity: 'success', summary: 'Success', detail: 'Password Reset Successfully' });
                this.router.navigate(['auth/login']);
              }
            },
            error: (error) => {
              this.loading = false;
              this.toaster.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            }
          });
      
        } else {
          this.toaster.add({ severity: 'info', summary: 'Info', detail: 'Please enter a valid 6-digit OTP' });
        }
      }
      
      handleInput(event: any, index: number) {
        const value = event.target.value;
        const key = event.inputType;
      
        // Move forward on valid input
        if (value.match(/^[0-9]$/)) {
          const nextElement = event.target.nextElementSibling;
          if (nextElement) {
            nextElement.focus();
          }
        } else if (key === "deleteContentBackward" || key === "deleteContentForward") {
          // Move backward on delete
          event.target.value = ''; // Clear the current field
          const prevElement = event.target.previousElementSibling;
          if (prevElement) {
            prevElement.focus();
          }
        } else {
          event.target.value = ''; // Clear invalid input
        }
      }
      

      getOtpValue(): string {
        return this.regsetForm.get('otp0')?.value +
               this.regsetForm.get('otp1')?.value +
               this.regsetForm.get('otp2')?.value +
               this.regsetForm.get('otp3')?.value +
               this.regsetForm.get('otp4')?.value +
               this.regsetForm.get('otp5')?.value;
      }


    resendOtp() {
      // Implement your logic here
    }

    preventCopyPaste(event: ClipboardEvent, action: string) {
      event.preventDefault(); // Prevent copy or paste
    
      let message = '';
      if (action === 'paste') {
        message = 'Pasting password is not allowed for security reasons!';

       } 
      // else if (action === 'copy') {
      //   message = 'Copying password is not allowed for security reasons!';
      // }
    
      // Show a warning toaster
      this.toaster.add({ severity: 'warn', summary: 'Warning', detail: message });
    }
    
  
  
    togglePassword(field: string) {
      if (field === 'password') {
        this.showPassword = !this.showPassword;
      } else if (field === 'confirmPassword') {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    }
}
