import { Component, ElementRef, EventEmitter, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth-service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // @Output isLogin
  // @Output() isLogin = new EventEmitter();

  // loginForm !: FormGroup
  // fieldTextType: boolean | undefined;

  // rememberMe: boolean = false;
  // passwordVisible: boolean = false; 
  // passwordFieldType: string = 'password'; 

  // ForgotPassword :boolean =false;
  // showForgotPasswordForm: boolean = false;
  // modalRef!: NgbModalRef ;
  // email: string | undefined;

  // toggleForgotPasswordForm() {
  //   this.showForgotPasswordForm = !this.showForgotPasswordForm;
  // }
  //  togglePasswordVisibility() {
  //   this.passwordVisible = !this.passwordVisible;
  //   this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  // }
  // constructor(private formBuilder: FormBuilder,
  //              private appService: ApiService,
  //              private toastr : ToastrService,
  //              private modalService :NgbModal
  // ) { }

  // ngOnInit(): void {
  //   this.loginForm = this.formBuilder.group({
  //     CompanyCode: ['', [Validators.required]],
  //     Password: ['', [Validators.required]]
  //   })

  // }

  // openForgotPasswordModal(content: any): void {
  //   this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  // }
  // closeForgotPasswordModal(): void {
  //   this.modalRef.close();
  // }
  // checkIn(){}
  // checkOut(){}
  // unlockAccount(){}
  // forgotPassword(){}
  // showForgotPasswordPopup(){}
  // submitForgotPasswordForm(): void {
  //   console.log('Email:', this.email);
  //   this.closeForgotPasswordModal();
  // }



  // get f() {
  //   return this.loginForm.controls;
  // }

  // toggleFieldTextType() {
  //   this.fieldTextType = !this.fieldTextType;
  // }

  // login() {

  //   if (this.loginForm.valid) {

  //     const userPayload ={
  //       "email":this.loginForm.controls['Email'].value,
  //       "password":this.loginForm.controls['Password'].value
  //     } 
  //     // this.isLogin.emit(true);
  //     this.appService.login(userPayload).pipe(first())
  //     .subscribe({
  //       next:  (res:any) => {
  //         if (res != null && res != undefined) {         
  //           this.toastr.success('Logged In Successfully');
  //           this.isLogin.emit(true);
  //         }
  //         else{
  //           this.toastr.error('Incorrect Username or Password!');
  //         }
  //       },
  //       error: (error:any) =>{
  //         this.toastr.error(error);
  //       }})
  //   }
  //   else{
  //     this.loginForm.markAllAsTouched();
  //   }
  // }


  loginForm!: FormGroup;
  modalRef!: NgbModalRef;
  email!: string;
  passwordVisible: boolean = false;
  forgotPasswordForm!: FormGroup;
  unlockAccountForm!: FormGroup;
  changePasswordForm!:FormGroup;

  captchaResponse: string | null = null;
  siteKey = "6Lf2pA0qAAAAAD2JbsviBovs_0v17NjbY6Nz-7Pe";

  expectedCaptcha: string = 'example'; 
  captchaInput: string = '';
  captchaInvalid: boolean = false;
 

  captchaText: string = '';
  userInput: string = '';
  isCaptchaValid: boolean = false;
  errorMessage: string = '';
  isVerificationAttempted: boolean = false;
  @ViewChild('captchaCanvas', { static: false })
  captchaCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private authService: AuthService,
    private elRef: ElementRef,private renderer: Renderer2
  ) { 
    this.generateCaptcha(); 
  }

  ngOnInit(): void {
    // this.loginForm = this.fb.group({
    //   companyCode: ['', [Validators.required, Validators.maxLength(30)]],
    //   empCode: ['', [Validators.required, Validators.maxLength(15)]],
    //   password: ['', [Validators.required, Validators.maxLength(24)]],
    //   rememberMe: [false]
    // });

    this.loginForm = this.fb.group({
      companyCode: ['', [Validators.required, this.noSpecialCharsValidator()]],
      empCode: ['', [Validators.required, this.noSpecialCharsValidator()]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.unlockAccountForm = this.fb.group({
      joiningDate: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  noSpecialCharsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[a-zA-Z0-9]*$/; // Regex to allow only alphanumeric characters
      const isValid = regex.test(control.value);
      return isValid ? null : { 'pattern': { value: control.value } };
    };
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  get f() {
    return this.loginForm.controls;
  }

  get fp() {
    return this.forgotPasswordForm.controls;
  }

  get ua() {
    return this.unlockAccountForm.controls;
  }

  get cp(){
    return this.changePasswordForm.controls;
  }
 
  ngAfterViewInit(): void {
    this.generateCaptcha();
  }

 
  generateCaptcha(): void {
    const length = 6; 
    this.captchaText = Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    this.renderCaptcha();
}


  renderCaptcha(): void {
    if (this.captchaCanvas && this.captchaCanvas.nativeElement) {
      const canvas = this.captchaCanvas.nativeElement;
      const context = canvas.getContext('2d');
  
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '30px Arial';
        context.fillText(this.captchaText, 10, 30);
      } else {
        console.error('Failed to get canvas context');
      }
    } else {
      console.error('Canvas element not found or initialized');
    }
  }

  verifyCaptcha(): void {
    const userInputLower = this.userInput.trim().toLowerCase();
    const captchaTextLower = this.captchaText.toLowerCase();
  
    this.isVerificationAttempted = true;
    this.isCaptchaValid = userInputLower === captchaTextLower;
  
    if (!this.isCaptchaValid) {
      console.log('Incorrect CAPTCHA code. Please try again.');
    } else {
      console.log('CAPTCHA verified successfully.');
    }
  }
  

  resolved(captchaResponse: any): void {
    this.captchaResponse = captchaResponse;
    this.captchaInvalid = !captchaResponse;
  }
  
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { companyCode, empCode, password } = this.loginForm.value;
    this.authService.login(companyCode, empCode, password).subscribe(
      response => {
        console.log('Login successful', response);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

    openForgotPasswordModal(content: any) {
      this.modalService.open(content);
    }
  
    openUnlockAccountModal(content: any) {
      this.modalService.open(content);
    }
    openChangePasswordModal(content: TemplateRef<any>) {
      this.modalService.open(content, { centered: true });
    }
    closeForgotPasswordModal() {
      this.modalService.dismissAll();
    }
  
    closeUnlockAccountModal() {
      this.modalService.dismissAll();
    }

  submitForgotPasswordForm(): void {
    console.log('Email:', this.email);
    this.closeForgotPasswordModal();
  }
  submitUnlockAccountForm(){}
  closeChangePasswordModal(){
    this.modalService.dismissAll();
  }
  submitChangePasswordForm(){}
 
}
