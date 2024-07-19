// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Role } from './models/roles';
// import { jwtDecode } from 'jwt-decode';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'hrms_ui';
//   IsLogin = false;
//   IsLogout = true;
//   userLogIn:any; 
 
//   screens: any[] = [];
  
//   // isJobPostCollapsed: boolean = true;
//   // isCollapsed:boolean=false;

//   // isSidebarCollapsed = false;

//   // onToggleSidebar() {
//   //   this.isSidebarCollapsed = !this.isSidebarCollapsed;
//   // }
//   collapsedStates: { [key: string]: boolean } = {
   
//     Master:true,
//     RMSection:true,
//     EDMSection: true,
//     jobPost: true,
//     appSection: true,
//     charts: true,
//     users:true,
//     authentication:true,
//     otherpage:true,
//     customization:true,
//     email:true,
//     Payroll:true,
//     TimeSection:true
//   };

//   constructor(private router:Router){

//   }
//   ngOnInit(){
   
//     this.userLogIn = JSON.parse(sessionStorage.getItem('user')! as string);
//     if(localStorage.getItem('LoggedIn') !== null){
//       this.IsLogin = Boolean(localStorage.getItem('LoggedIn'))
//     }

//   }
//   IsLoggedin(event: {isLoggedIn: boolean, screens: any[]}) {
//     this.IsLogin = event.isLoggedIn;
//     if (event.isLoggedIn) {
//       this.screens = event.screens;
//     }
//   }
//   get isAdmin() {
    
//     return this.userLogIn.role === Role.Admin;
//   }

//   get isSuperAdmin() {
    
//     return this.userLogIn.role === Role.SuperAdmin;
//   }
// }
//   IsLoggedin(status:any){
//     if(status){
//       this.IsLogin = true;
//       this.IsLogout = false;
//       localStorage.setItem('LoggedIn',this.IsLogin.toString());
//       this.router.navigate(['/']);
//     }
//     else{ // in case of Logout
//       this.IsLogin = false;
//       this.IsLogout = true;
//       localStorage.removeItem('LoggedIn');
//     }
//   }
//   toggleCollapse(menuItem: string) {
//     this.collapsedStates[menuItem] = !this.collapsedStates[menuItem];
//   }
// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/roles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrms_ui';
  IsLogin = false;
  userLogIn: any;
  screens: any[] = [];

  collapsedStates: { [key: string]: boolean } = {

    Master: true,
    RMSection: true,
    EDMSection: true,
    jobPost: true,
    appSection: true,
    charts: true,
    users: true,
    authentication: true,
    otherpage: true,
    customization: true,
    email: true,
    Payroll: true,
    TimeSection: true
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.userLogIn = JSON.parse(sessionStorage.getItem('user')! as string);
    if (localStorage.getItem('LoggedIn') !== null) {
      this.IsLogin = Boolean(localStorage.getItem('LoggedIn'));
    }
  }

  IsLoggedin(event: { isLoggedIn: boolean, screens: any[] }) {
    this.IsLogin = event.isLoggedIn;
    if (!event.isLoggedIn) {
      this.screens = [];
      localStorage.removeItem('LoggedIn');
    } else {
      this.screens = event.screens;
    }
  }

  get isAdmin() {
    return this.userLogIn.role === Role.Admin;
  }

  get isSuperAdmin() {
    return this.userLogIn.role === Role.SuperAdmin;
  }
/* sagarDev
  IsLoggedin(status:any){
    if(status){
      this.IsLogin = true;
      this.IsLogout = false;
      localStorage.setItem('LoggedIn',this.IsLogin.toString());
      this.router.navigate(['/']);
    }
    else{ 
      this.IsLogin = false;
      this.IsLogout = true;
      localStorage.removeItem('LoggedIn');
    }
  }
  toggleCollapse(menuItem: string) {
    this.collapsedStates[menuItem] = !this.collapsedStates[menuItem];
  }
  collapseSideMenu(){
    
  }
  setAllCollapsedStatesToFalseAndRedirectedRoute(redirectUrl:string) {
    for (let key in this.collapsedStates) {
      if (this.collapsedStates.hasOwnProperty(key)) {
        this.collapsedStates[key] = true;
      }
    }
    this.router.navigate([redirectUrl]);
  }
  
 }*/
}
@Component({
  selector: 'app-dashboard',
  template: `<h1>Dashboard Component</h1>`
})
export class DashboardComponent {}