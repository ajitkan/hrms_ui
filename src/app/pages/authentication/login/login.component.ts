import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // @Output isLogin
  @Output() isLogin = new EventEmitter();

  loginForm !: FormGroup
  fieldTextType: boolean | undefined;

  constructor(private formBuilder: FormBuilder,
              // private apiService: ApiService,
              // private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })

  }

  get f() {
    return this.loginForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login() {

    if (this.loginForm.valid) {
      
      const user = this.loginForm.value;
      this.isLogin.emit(true);
      // this.apiService.login(user).subscribe((resp: any) => {
      //   if (resp != null && resp != undefined) {         
      //     this.isLogin.emit(true);
      //     this.toastr.success('Logged In Successfully');
      //   }
      //   else{
      //     this.toastr.error('Incorrect Username or Password!');
      //   }
      // })
      
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
