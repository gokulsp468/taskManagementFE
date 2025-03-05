import { AbstractControlOptions, FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../../shared/validators/common_validators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  showPassword = false;
  showConfirmPassword = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...payload } = this.registerForm.value;
    console.log('Registering user:', payload);
    this.authService.register(payload).subscribe({
      next: (response) => {
        if(response.success){
          console.log('Login successful:', response);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  }


