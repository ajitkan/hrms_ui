import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/roles';
import { ApiService } from './service/api.service';

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

  constructor(private router:Router, private httpService:ApiService){
    this.token = JSON.parse(localStorage.getItem('token') as string);
  }
  ngOnInit(){
    console.log('Notification count',this.notificationCount);
    // alert("login Success");
    // this.IsLogin = true;
    this.userLogIn = JSON.parse(sessionStorage.getItem('user')! as string);
    if(localStorage.getItem('LoggedIn') !== null){
      this.IsLogin = Boolean(localStorage.getItem('LoggedIn'))
    }

  }

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

  openLink() {
    // this.httpService.postData(this.token).subscribe(
    //   response => {
    //     // Handle the response from the server
    //     console.log(response);
    //     // Open the link in a new tab if needed
    //     window.open(`http://localhost:54485/login?token=${this.token}`, '_blank');
    //   },
    //   error => {
    //     // Handle error
    //     console.error(error);
    //   }
    // );
    // this.login();
    
  }
//   login(username: string, password: string) {
//     this.http.post('http://localhost:5000/api/login', { username, password })
//       .subscribe((response: any) => {
//         localStorage.setItem('token', response.token);
//         this.openPostInNewTab('http://localhost:54485/login', { token: response.token });
//       });
// }
}
@Component({
  selector: 'app-dashboard',
  template: `<h1>Dashboard Component</h1>`
})
export class DashboardComponent {}