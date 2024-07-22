import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { jwtDecode }  from "jwt-decode";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {


  changePasswordForm!: FormGroup;

  @Output() closeChangePassword = new EventEmitter();
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'info' | null = null;
  alertTimeout:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal, // Inject NgbModal service
    private router: Router,
    private toastr: ToastrService
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  get cp() {
    return this.changePasswordForm.controls;
  }

  openChangePasswordModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }); // Open modal with specified content and options
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
          // setTimeout(() => {
          //   this.modalService.dismissAll(); 
          //   this.closeChangePassword.emit(); 
          //   this.router.navigate(['/home']);
          // }, 1000); 
        },
        error: (error: any) => {
          console.error('Password change failed', error);
          this.showAlertMessage('Failed to change password', 'error');
          // this.modalService.dismissAll(); 
        }
      });
  }

  showAlertMessage(message: string, type?: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type || 'info'; 

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
    //    this.alertTimeout = setTimeout(() => {
    //   this.alertMessage = null;
    //   this.alertType = null;
    // }, 3000); 
  }

  dismissAlert(): void {
    this.alertMessage = null;
    this.alertType = null;
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
      this.alertTimeout = null;
    }
  }

  closeChangePasswordModal() {
    this.dismissAlert();
    this.closeChangePassword.emit();
  }
}
