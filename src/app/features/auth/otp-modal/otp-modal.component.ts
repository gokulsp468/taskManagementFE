import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import { interval, Subscription, takeWhile } from 'rxjs';

@Component({
  selector: 'app-otp-modal',
  imports: [CommonModule,FormsModule,RouterModule,Toast],
  templateUrl: './otp-modal.component.html',
  styleUrl: './otp-modal.component.scss'
})
export class OtpModalComponent implements OnInit {
  @Input() email!: string;
  loading:boolean = false;
  timer: number = 70;
  formattedTime: string = '1:10';
  interval: any;

  private subscription!: Subscription;
  private toaster = inject(MessageService);


  constructor(
    private activemodal:NgbActiveModal,
    private modalservice:NgbModal,
    private authservice:AuthService,
    private router:Router,

  ) {}


  ngOnInit(): void {
    this.startTimer();
  }


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
            localStorage.setItem('accessToken', response.data.access_token);
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

  startTimer() {
    this.updateFormattedTime(); // Update initial display
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateFormattedTime();
      } else {
        clearInterval(this.interval); // Stop the timer at 0
      }
    }, 1000);
  }

  updateFormattedTime() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  resendOtp() {
    if (this.timer === 0) {
      this.timer = 60; // Reset timer to 1 minute
      this.startTimer();

      this.authservice.resentOtp({ email: this.email }).subscribe({
        next: (response) => {
          if (response.success) {
            this.toaster.add({ severity: 'success', summary: 'Success', detail: 'OTP Resent Successfully' });
          }
        },
        error: (error) => {
          this.toaster.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      });
    }
  }

  close() {
    this.activemodal.close();
  }

}
