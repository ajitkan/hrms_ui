import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from './models/roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrms_ui';
  IsLogin = false;
  IsLogout = true;
  userLogIn:any;
  screens: any[] = [];
  notificationCount=0;
  isSnapshot = false;
  isResetPasswordRoute=false;
  
  // @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
  token='';
  
  // isJobPostCollapsed: boolean = true;
  // isCollapsed:boolean=false;

  // isSidebarCollapsed = false;

  // onToggleSidebar() {
  //   this.isSidebarCollapsed = !this.isSidebarCollapsed;
  // }
  collapsedStates: { [key: string]: boolean } = {
    // uiElements: true,
    // buttons: true,
    // tables: true,
    // icons: true,
    // forms: true,
    Master:true,
    RMSection:true,
    EDMSection: true,
    jobPost: true,
    appSection: true,
    charts: true,
    users:true,
    authentication:true,
    otherpage:true,
    customization:true,
    email:true,
    Payroll:true,
    TimeSection:true
  };


  constructor(private router:Router,private route:ActivatedRoute,
    private modalService: NgbModal,
  ){
    this.token = JSON.parse(localStorage.getItem('token') as string);
  }
  ngOnInit(){
    if (this.router.url.includes('reset-password')) {
      this.isSnapshot = true;
      // this.isResetPasswordRoute = true;
      // this.openChangePasswordModal();
   
  }
    console.log('Notification count',this.notificationCount);
    // alert("login Success");
    // this.IsLogin = true;
    this.userLogIn = JSON.parse(sessionStorage.getItem('user')! as string);
    if(localStorage.getItem('LoggedIn') !== null){
      this.IsLogin = Boolean(localStorage.getItem('LoggedIn'))
    }

  }

  ngDoCheck(){
    if (this.router.url.includes('reset-password')) {
      this.isSnapshot = true;
      // this.isResetPasswordRoute = true;
      // this.openChangePasswordModal();
    }
  }
  // openChangePasswordModal() {
  //   this.modalService.open(this.changePasswordModal, { centered: true }); 
  // }
  // closeChangePasswordModal() {
  //   this.isResetPasswordRoute = false;
  // }

  get isAdmin() {
    // this.userLogIn = JSON.parse(sessionStorage.getItem('user')!);
    return this.userLogIn.role === Role.Admin;
  }

  get isSuperAdmin() {
    //  debugger;
    return this.userLogIn.role === Role.SuperAdmin;
  }
  // IsLoggedin(status:any){
  //   if(status){
  //     this.IsLogin = true;
  //     this.IsLogout = false;
  //     localStorage.setItem('LoggedIn',this.IsLogin.toString());
  //     this.router.navigate(['/']);
  //   }
  //   else{ // in case of Logout
  //     this.IsLogin = false;
  //     this.IsLogout = true;
  //     localStorage.removeItem('LoggedIn');
  //   }
  // }

  IsLoggedin(event: { isLoggedIn: boolean, screens: any[],notificationCount:any }) {
    debugger;
    this.IsLogin = event.isLoggedIn;
    if (!event.isLoggedIn) {
      this.screens = [];
      this.notificationCount = 0;
      localStorage.removeItem('LoggedIn');
    } else {
      debugger;
      this.screens = event.screens;
      this.notificationCount = event.notificationCount.notification;
    }
  }
  toggleCollapse(menuItem: string) {
    this.collapsedStates[menuItem] = !this.collapsedStates[menuItem];
  }
}

@Component({
  selector: 'app-dashboard',
  template: `<h1>Dashboard Component</h1>`
})
export class DashboardComponent {}