import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { jwtDecode }  from "jwt-decode";
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  resetPasswordForm!: FormGroup;
  changePasswordForm!: FormGroup;
  @ViewChild('changePasswordModal') changePasswordModal: any;
  @Output() closeChangePassword = new EventEmitter<void>();
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'info' | null = null;
  alertTimeout:any;
  isSnapshot=false;
  userName: string | null = null;
  companyCode: string | null = null;
  token: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal, // Inject NgbModal service
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('reset-password')) {
      this.isSnapshot = true;
    }
      
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPasswords('newPassword')]]
    });
  
    // Extract the URL parameters and assign them to class properties
    this.userName = this.route.snapshot.queryParamMap.get('UN');
    this.companyCode = this.route.snapshot.queryParamMap.get('CC');
    this.token = this.route.snapshot.queryParamMap.get('token'); 
    
    console.log('Username:', this.userName);
    console.log('Company Code:', this.companyCode);
  }
  
  matchPasswords(passwordControlName: string) {
    return (control: any) => {
      if (!this.resetPasswordForm) return null;
      const passwordControl = this.resetPasswordForm.get(passwordControlName);
      if (control.value !== passwordControl?.value) {
        return { mismatch: true };
      }
      return null;
    };
  }
// change-password.component.ts
submitResetPassword(): void {

  if (this.resetPasswordForm.invalid) {
    this.showAlertMessage('Please fill all required field','error')
    return;
  }

  if (this.resetPasswordForm.valid) {
    const currentPassword = this.resetPasswordForm.get('currentPassword')?.value;
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match!');
      this.showAlertMessage('Entered new password and confirm new password are not match.', 'error');
      return;
    }

    // Extract parameters from the route or wherever they are stored
    const userName = this.route.snapshot.queryParamMap.get('UN');
    const companyCode = this.route.snapshot.queryParamMap.get('CC');
    const token = this.route.snapshot.queryParamMap.get('token');
    // const currentPassword = 'Uaz4KVGq&vs3'

    if (userName && companyCode && token) {
      const payload = {
        userName,
        companyCode,
        currentPassword,
        newPassword,
      };
      
      this.authService.resetPassword(payload, token).pipe(first())
        .subscribe({
          next: (response: any) => {
            console.log('Password reset successful:', response);
            this.showAlertMessage('Password reset successfully', 'success');
          },
          error: (error: any) => {
            console.error('Error resetting password:', error);
            this.showAlertMessage('Error resetting password','error')
          }
        });
    } else {
      console.error('Required parameters are missing!');
      this.showAlertMessage('Required parameters are missing!','error')
    }
  }
}

  
  
  
  openPasswordResetModal(): void {
    const modalElement = document.getElementById('changePasswordModel');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
     
      modal.show();
    }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.userName = params['UN'];
  //     this.companyCode = params['CC'];
  //     console.log('userName:', this.userName);
  //     console.log('companyCode:', this.companyCode);

  //     // if (!this.userName || !this.companyCode) {
  //     //   this.router.navigate(['/login']);
  //     //   return;
  //     // }

  //      this.openChangePasswordModal();
  //   });
   }
  get cp() {
    return this.changePasswordForm.controls;
  }

  // openChangePasswordModal(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }); 
  // }
  openChangePasswordModal() {
    this.modalService.open(this.changePasswordModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  submitChangePasswordForm() {
    if (this.changePasswordForm.invalid) {
      this.showAlertMessage('Please fill all required field','error')
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      this.showAlertMessage('No token found', 'error');
      return;
    }

    // Decode token to get companyCode and userName
    const decodedToken: any = jwtDecode(token);
    const companyCode = decodedToken.id; // Use 'id' as company code
    const userName = decodedToken.unique_name; // Use 'unique_name' as employee code

    console.log('Decoded companyCode:', companyCode);
    console.log('Decoded userName:', userName);

    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmNewPassword) {
      console.log('New password and confirm new password must match.');
      this.showAlertMessage('Entered new password and confirm new password are not match.', 'error');
      return;
    }

    const payload = {
      companyCode: companyCode,
      userName: userName,
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };

    this.authService.changePassword(token, payload).pipe(first())
      .subscribe({
        next: (res: any) => {
          console.log('Password change successful', res);
          this.showAlertMessage('Password changed successfully', 'success');
        },
        error: (error: any) => {
          console.error('Password change failed', error);
          this.showAlertMessage('Failed to change password', 'error');
          // this.modalService.dismissAll(); 
        }
      });
  }
 
  closeChangePasswordModal() {
    this.dismissAlert();
    this.closeChangePassword.emit();
  }
  showAlertMessage(message: string, type?: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type || 'info'; 

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }

  dismissAlert(): void {
    this.alertMessage = null;
    this.alertType = null;
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
      this.alertTimeout = null;
    }
  }
}
