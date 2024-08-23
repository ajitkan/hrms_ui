import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from './models/roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  isSnapshot = false;
  isResetPasswordRoute=false;
  isCollapsedSideBar =false;
  tabs:any;
  // @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
  token:string ='';
  
  selectedTab: string = '';


  isFirstSidebarVisible = true;
  isSecondSidebarVisible = false;

  selectTab(tab: any) {
   
    this.selectedTab = tab;
    
    if (tab && tab.route) {
      
      this.router.navigate([tab.route], { queryParams: { tabID: tab.tabID } });
    } else {
      console.warn('No route provided for the selected tab');
    }
  }
  

  // selectTab(tab: any) {
  //   this.selectedTab = tab;
  //   if (tab && tab.route) {
  //     this.router.navigate([tab.route]);
  //   } else {
  //     console.warn('No route provided for the selected tab');
  //   }
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

  constructor(private router:Router,private route:ActivatedRoute,private httpService:ApiService,
    private modalService: NgbModal,
  ){
  }
  ngOnInit(){
    this.token = JSON.parse(localStorage.getItem('token')as string);
    if (this.router.url.includes('reset-password')) {
      this.isSnapshot = true;
      // this.isResetPasswordRoute = true;
      // this.openChangePasswordModal();
      
    }
    
    console.log("IsLogin",this.IsLogin);
    console.log('Notification count',this.notificationCount);
    // alert("login Success");
    // this.IsLogin = true;
    this.userLogIn = JSON.parse(sessionStorage.getItem('user')! as string);
    if(this.token!=null){
      this.IsLogin = true;
      this.screens = JSON.parse(localStorage.getItem('screens') as string);
      this.isSnapshot = false;
    }
    // if(localStorage.getItem('LoggedIn') !== null){
    //   this.IsLogin = Boolean(localStorage.getItem('LoggedIn'))
    // }

  }

  // ngDoCheck(){
  //   if (this.router.url.includes('reset-password')) {
  //     this.isSnapshot = true;
  //     // this.isResetPasswordRoute = true;
  //     // this.openChangePasswordModal();
  //   }
  // }
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

  isCollapse(event:{isCollapsible:boolean }){
    this.isCollapsedSideBar = event.isCollapsible;
    this.isFirstSidebarVisible = true;
    
  }
  

  IsLoggedin(event: { isLoggedIn: boolean, screens: any[],notificationCount:any}) {
    // debugger;
    this.IsLogin = event.isLoggedIn;
    if (!event.isLoggedIn) {
      this.screens = [];
      this.notificationCount = 0;
      // debugger;
      //localStorage.removeItem('LoggedIn');
    } else {
      // debugger;
      this.screens = event.screens;
      this.notificationCount = event.notificationCount.notification;
      // this.isCollapsed = event.isCollapsed;
    }
  }
  // toggleCollapse(menuItem: string) {
  //   this.collapsedStates[menuItem] = !this.collapsedStates[menuItem];
  //   // this.isFirstSidebarVisible = false;
  //   //             this.isSecondSidebarVisible = true;
  // }

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

  fetchTabs(screenID:any){
    var screens = JSON.parse(localStorage.getItem('screens')as string);
    if(screens!=null){
      screens.forEach((screen:any)=>{
        if(screen.screenID == screenID){
          this.httpService.fetchTabs(screen.roleID,screen.screenID).subscribe({
            next: (res: any) => {
              if(res.code == 1){
                console.log('Tabs for given screens is :',res.tabResponces);
                this.tabs = res.tabResponces;
                this.isFirstSidebarVisible = false;
                this.isSecondSidebarVisible = true;
                // this.navigateBasedOnRoute();
              }
              else
                console.log(res.message);
            },
            error:(err:any) =>{
              console.log(err.message);
            }
        })
      }
      else{
        return;
      }
    })
    }
    return;
  }


  navigateBasedOnRoute() {
    if (this.tabs.length > 0) {
      const route = this.tabs[0].route; // Get the route from the first tab
      if (route) {
        this.router.navigate([route]);
      } else {
        console.warn('No route provided for the first tab');
      }
    } else {
      console.warn('No tabs available to navigate');
    }
  }
}
@Component({
  selector: 'app-dashboard',
  template: `<h1>Dashboard Component</h1>`
})
export class DashboardComponent {}