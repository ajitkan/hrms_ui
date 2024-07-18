import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // @Output() isLogin = new EventEmitter();
  // @Output() isLogin = new EventEmitter<boolean>();
  @Output() isLogin = new EventEmitter<{ isLoggedIn: boolean; screens: any[]; }>();
 
 user:any;
 isCollapsed:boolean=false;
 @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
 userName:any;
 token:any;

 constructor(private formBuilder: FormBuilder,
  private authService:AuthService ,
  private modalService: NgbModal,
  private router: Router
){
    
  }
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user")as string);
  }
  openChangePasswordModal() {
    this.modalService.open(this.changePasswordModal, { centered: true }); // Open modal with centered option
  }
  toggleCollapse() {
    this.isCollapsed =!this.isCollapsed
  }
  logoutRes: any;

  logout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        console.log('Logout response:', res); 
        this.logoutRes = res;
        
        if (res.status === 'Success') {
          this.authService.clearSession();
          console.log('Navigating to login page...');
          // this.isLogin.emit(false); 
          this.isLogin.emit({ isLoggedIn: false, screens: [] });
          this.router.navigate(['']).then(() => {
            console.log('Navigation successful!');
          }).catch((error) => {
            console.error('Navigation error:', error);
          });
        } else {
          console.warn('Logout response did not indicate success:', res);
        }
      },
      error: (error) => {
        console.error('Logout failed', error);
        
      }
    });
  }
  
  
  
  
}
