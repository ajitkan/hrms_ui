import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from './models/roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth-service/auth.service';
import { ResetSessionComponent } from './pages/authentication/reset-session/reset-session.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ResetSessionComponent) resetLoginModalComponent!: ResetSessionComponent;

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
  
  // selectedTab: string = '';
  selectedTab :any;
  isFirstSidebarVisible = true;
  isSecondSidebarVisible = false;
  selectedScreen: any;

  backTab: any | null = null; 
previousScreenID: any | null = null; 
showBackButton = false;
isModalOpen: boolean = false;

constructor(private router:Router,private route:ActivatedRoute,private httpService:ApiService,
  private authService: AuthService,
){
  this.authService.modalOpen$.subscribe((state: boolean) => {
    this.isModalOpen = state;
  });
}
ngOnInit(){
  this.isSecondSidebarVisible = false;
  this.token = JSON.parse(localStorage.getItem('token')as string);
  if (this.router.url.includes('reset-password')) {
    this.isSnapshot = true;
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
    this.authService.modalOpen$.subscribe(() => {
    this.resetLoginModalComponent.openModal();
  });

}
ngAfterViewInit(): void {
  // Trigger the modal after view initialization to avoid undefined errors
  if (this.authService) {
    this.authService.modalOpen$.subscribe(() => {
      this.openModal();
    });
  }
}

  selectScreen(screen: any): void {
    this.selectedScreen = screen;
    if(screen!='' ){
      this.fetchTabs(screen.screenID);
    }
  }
  
  selectTab(tab: any) {
    // Check if the selected tab is the "Back" tab
    if (tab && tab.tabTitle === 'Back') {
      this.isFirstSidebarVisible = true;
      this.isSecondSidebarVisible = false;
    } else {
      // Handle other tabs as usual
      this.selectedTab = tab;
  
      if (tab && tab.route) {
        this.router.navigate([tab.route], { queryParams: { tabID: tab.tabID } });
      } else {
        console.warn('No route provided for the selected tab');
      }
    }
  }
  

  handleBackClick() {
    this.isFirstSidebarVisible = true;
    this.isSecondSidebarVisible = false;
  }
  
 
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

 

  openModal(): void {
    if (this.resetLoginModalComponent) {
      this.resetLoginModalComponent.openModal();
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
      this.isSecondSidebarVisible = false;
      // debugger;
      //localStorage.removeItem('LoggedIn');
    } else {
      // debugger;
      this.isSecondSidebarVisible = false;
      this.screens = event.screens;
      this.notificationCount = event.notificationCount.notification;
      // this.isCollapsed = event.isCollapsed;
    }
  }


  openLink() {
  
    
  }

  fetchTabs(screenID:any){
    debugger
    var screens = JSON.parse(localStorage.getItem('screens')as string);
    if(screens!=null){
      screens.forEach((screen:any)=>{
        if(screen.screenID == screenID){
          this.httpService.fetchTabs(screen.roleID,screen.screenID).subscribe({
            next: (res: any) => {
              if(res.code == 1){
                console.log('Tabs for given screens is :',res.tabResponces);
                if(res.tabResponces.length>0){
                  this.tabs = res.tabResponces;
                  this.isFirstSidebarVisible = false;
                  this.isSecondSidebarVisible = true;
                }
                // this.navigateBasedOnRoute();
                debugger;
                if(screen.screenURL!=null)
                this.router.navigate([screen.screenURL]);
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
  navigateBack() {
    if (this.previousScreenID) {
      this.fetchTabs(this.previousScreenID);
    } else {
      console.error('No previous screen ID found.');
    }
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