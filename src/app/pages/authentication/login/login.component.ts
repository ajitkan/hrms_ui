import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { user } from 'src/app/constant/constant';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // @Output isLogin
  @Output() isLogin = new EventEmitter();
  loading:boolean =false;
  loginForm !: FormGroup
  fieldTextType: boolean | undefined;
  companyLogo = "../assets/images/kanlogo2.png";
  companyUrl = "https://kaninfos.com";
  // user!:User;

  constructor(private formBuilder: FormBuilder,
               private appService: ApiService,
               private toastr : ToastrService
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
    this.loading =true;
    if (this.loginForm.valid) {      
      const userPayload ={
        "email":this.loginForm.controls['Email'].value,
        "password":this.loginForm.controls['Password'].value
      } 
      // this.isLogin.emit(true);
      this.appService.login(userPayload).pipe(first())
      .subscribe({
        next:  (res:any) => {
          this.loading=false;
          if (res != null && res != undefined) {         
            this.toastr.success('Logged In Successfully');  
            user.id = res.obj.id;          
            this.isLogin.emit(true);
          }
          else{
            this.toastr.error('Incorrect Username or Password!');
          }
        },
        error: (error:any) =>{
          this.toastr.error(error);
        }})
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
