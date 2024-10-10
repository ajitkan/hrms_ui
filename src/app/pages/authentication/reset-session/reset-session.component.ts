import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-reset-session',
  templateUrl: './reset-session.component.html',
  styleUrls: ['./reset-session.component.css']
})
export class ResetSessionComponent {
  loginForm!: FormGroup;
  passwordVisible: boolean = false;
  errorMessage: string = '';
  alertType: 'success' | 'error' | 'info' | null = null;
  alertMessage: string | null = null;
  alertTimeout: any;
  modalRef!: NgbModalRef | null; // Track the modal reference, start as null

  @ViewChild('resetLoginModal', { static: true }) resetLoginModal!: ElementRef;
  @Output() isModalOpen = new EventEmitter<{isModalOpen: boolean}>();
  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      companyCode: ['', [Validators.required]],
      employeeCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // Method to open the modal using NgbModal
  openModal() {
    if (!this.modalRef) {
      // Open the modal only if it's not already opened
      this.modalRef = this.modalService.open(this.resetLoginModal, {
        backdrop: 'static', // Makes background click disabled
        keyboard: false,    // Prevent closing with escape key
      });

      // When the modal is closed, set the reference back to null
      this.modalRef.result.then(
        () => this.modalRef = null,  // On modal close
        () => this.modalRef = null   // On modal dismiss
      );
    }
  }

  // Method to close the modal
  onClose() {
    if (this.modalRef) {
      this.modalRef.close();  // Close the modal using modal reference
      this.isModalOpen.emit({isModalOpen:false});
      window.location.reload();
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showAlertMessage('Please fill in all required fields', 'error');
      return;
    }

    const payload = {
      companyCode: this.loginForm.get('companyCode')?.value,
      employeeCode: this.loginForm.get('employeeCode')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(payload.companyCode, payload.employeeCode, payload.password).pipe(first())
      .subscribe({
        next: (res: any) => {
          console.log('Login successful', res);
          this.showAlertMessage('Login successful', 'success');
          localStorage.setItem('token', JSON.stringify(res.token) as string);
          this.onClose(); // Close modal after successful login
        },
        error: (error: any) => {
          console.error('Login failed', error);
          this.showAlertMessage(error, 'error');
        }
      });
  }

  showAlertMessage(message: string, type?: 'success' | 'error', isModal?: boolean): void {
    if (!isModal) {
      this.alertMessage = message;
    } else {
      this.alertType = type || 'info';
    }

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
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
