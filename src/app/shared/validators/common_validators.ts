import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordsMismatch: true };
};

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regex = /^(?![-\._\+])(?!.*[\._\+-]{2,})[\w-\.\+]+@(?:[a-z]{2,}\.)+[a-z]{2,}$/;
  const email = control.value;

  return email && !regex.test(email) ? { commonEmail: true } : null;
};