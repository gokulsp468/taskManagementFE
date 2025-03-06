import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-otp-modal',
  imports: [CommonModule,FormsModule,RouterModule,Toast],
  templateUrl: './otp-modal.component.html',
  styleUrl: './otp-modal.component.scss'
})
export class OtpModalComponent {
  @Input() email!: string;
  loading:boolean = false;

  private toaster = inject(MessageService);


  constructor(
    private activemodal:NgbActiveModal,
    private modalservice:NgbModal,
    private authservice:AuthService,
    private router:Router,

  ) {}


  otpArray: string[] = ['', '', '', '', ''];
  onSubmit() {
    const otp = this.otpArray.join(''); // Combine OTP digits into a string
    console.log('Entered OTP:', otp);

    if (otp.length === 5) {
      this.loading = true;
      const data = {
        email: this.email,
        otp: otp
      };
      // Send the data as payload in your request
      this.authservice.verifyOtp(data).subscribe({
        next: (response) => {
          if(response.success){
            this.loading = false;
            this.toaster.add({ severity: 'success', summary: 'Success', detail: 'OTP Verified Successfully' });
            localStorage.setItem('accesstoken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            this.router.navigate(['/projects']);
            this.activemodal.close();
          }
        },
        error: (error) => {
          this.loading = false;
          this.toaster.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      })

    } else {
      console.log('Please enter a valid 5-digit OTP');
      this.toaster.add({ severity: 'info', summary: 'Info', detail: 'Please enter a valid 5-digit OTP' });

    }
  }



  handleInput(event: any, index: number) {
    this.otpArray[index] = event.target.value;

    // Move focus to the next input field automatically
    if (event.target.value && index < this.otpArray.length - 1) {
      event.target.nextElementSibling?.focus();
    }
  }


  resendOtp() {
    // Implement your logic here
  }

  close() {
    this.activemodal.close();
  }

}
