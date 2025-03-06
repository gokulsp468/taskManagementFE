import { AbstractControlOptions, FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../../shared/validators/common_validators';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule,RouterModule,NgxSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  showPassword = false;
  showConfirmPassword = false;
  registerForm: FormGroup;
  loading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toaster: MessageService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
    ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: confirmPasswordValidator });
  }

  onSubmit() {
    this.loading = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.loading = false;
      return;
    }

    const { confirmPassword, ...payload } = this.registerForm.value;
    console.log('Registering user:', payload);

    this.authService.register(payload).subscribe({
      next: (response) => {
        if(response.success){
          this.loading = false;
          this.toaster.add({ severity: 'success', summary: 'Success', detail: response.message });
          console.log('Login successful:', response);
          if(response.data.otp_sent){
            const modalRef = this.modalService.open(OtpModalComponent, {
              backdrop: 'static',
            });
            modalRef.componentInstance.email = response.data.email;
          }
        }
      },
      error: (error) => {
        this.loading = false;
        this.toaster.add({ severity: 'error', summary: 'Error', detail: error.error.message?error.error.message:'Oops Something went wrong .Try later' });
        console.error('Login failed:', error);
      }
    });
  }


  togglePassword(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  }


