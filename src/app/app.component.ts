


import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth-service/auth.service';
import { ResetSessionComponent } from './pages/authentication/reset-session/reset-session.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ResetSessionComponent)
  resetLoginModalComponent!: ResetSessionComponent;

  title = 'hrms_ui';
  IsLogin = false;
  userLogIn: any;
  screens: any[] = [];
  notificationCount = 0;
  isSnapshot = false;
  isCollapsedSideBar = false;
  tabs: any;
  selectedTab: any;
  isFirstSidebarVisible = true;
  isSecondSidebarVisible = false;
  isModalOpen: boolean = false;
  token: string = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private httpService: ApiService, 
    private authService: AuthService
  ) {
    // Subscribe to modal state changes from AuthService
    this.authService.modalOpen$.subscribe((state: boolean) => {
      this.isModalOpen = state;
    });
  }

  ngOnInit() {
    
    // localStorage.removeItem('token');
    // localStorage.clear();
    // Retrieve the token from localStorage
    this.token = JSON.parse(localStorage.getItem('token') as string);

    // Check if the current route is reset-password
    if (this.router.url.includes('reset-password')) {
      this.isSnapshot = true;
    }

    // this.token = JSON.parse(localStorage.getItem('token') as string);
  if (this.token != null) {
    this.IsLogin = true;
    this.screens = JSON.parse(localStorage.getItem('screens') as string);
    this.isSnapshot = false;
  } else {
    this.IsLogin = false;
    this.router.navigate(['/login']);
    // window.location.reload(); // Redirect to login if no token
  }

    // Listen for modal state changes and trigger modal open on change
    this.authService.modalOpen$.subscribe(() => {
      this.resetLoginModalComponent.openModal();
    });
  }

  // // Toggle the expanded state of a screen
  // toggleScreen(screen: any) {
  //   screen.expanded = !screen.expanded;
    
  //   if (screen.expanded && !screen.tabs) {
  //     // Fetch tabs if the screen is expanded and tabs aren't already available
  //     this.fetchTabs(screen.screenID, screen);
  //   }
  // }

  // toggleScreen(screen: any) {
  //   screen.expanded = !screen.expanded;

  //   // If the screen is expanded and there are no tabs available
  //   if (screen.expanded && (!screen.tabs || screen.tabs.length === 0)) {
  //     // If it's the Dashboard screen, redirect to home route
  //     if (screen.screenDisplayName === 'Dashboard') {
  //       this.router.navigate(['/home']);  // Redirect to the home route
  //     } else {
  //       // Otherwise, fetch tabs for the screen (if it's not the Dashboard)
  //       this.fetchTabs(screen.screenID, screen);
  //     }
  //   }
  // }
  toggleScreen(screen: any) {
    // Check if the screen has no tabs or tabs are empty
    if (!screen.tabs || screen.tabs.length === 0) {
      // If it's the Dashboard screen, redirect to home route
      if (screen.screenDisplayName === 'Dashboard') {
        // this.router.navigate(['/home']);  // Redirect to home route
        window.location.href = '/home'; // Full page reload
        // window.location.reload();
        
      } else {
        screen.expanded = !screen.expanded;
  
        // If screen is expanded and tabs are empty (this part is not necessary anymore but you can leave it)
        if (screen.expanded && !screen.tabs) {
          this.fetchTabs(screen.screenID, screen);
        }
      }
      return;  // Prevent further actions
    }
  
    // If tabs are present, toggle expansion
    screen.expanded = !screen.expanded;
  
    // If screen is expanded and tabs are empty (this part is not necessary anymore but you can leave it)
    if (screen.expanded && !screen.tabs) {
      this.fetchTabs(screen.screenID, screen);
    }
  }
  
  

  hideLoginPage() {
    this.IsLogin = true; // Set login state to true
  }

  // Fetch tabs based on the screen ID
  fetchTabs(screenID: any, screen: any) {
    this.httpService.fetchTabs(screen.roleID, screenID).subscribe({
      next: (res: any) => {
        if (res.code === 1) {
          // Store the fetched tabs in the screen object
          screen.tabs = res.tabResponces;
        } else {
          console.log(res.message);
        }
      },
      error: (err: any) => {
        console.log(err.message);
      }
    });
  }

  // Handle tab selection and navigate to the selected tab's route
  selectTab(tab: any) {
    this.selectedTab = tab;
    if (tab && tab.route) {
      this.router.navigate([tab.route], { queryParams: { tabID: tab.tabID } });
    }
  }

  // Handle the "Back" button click in the second sidebar
  handleBackClick() {
    this.isFirstSidebarVisible = true;
    this.isSecondSidebarVisible = false;
  }

  // Handle login/logout state change
  IsLoggedin(event: { isLoggedIn: boolean, screens: any[], notificationCount: any }) {
    this.IsLogin = event.isLoggedIn;
    if (!event.isLoggedIn) {
      this.screens = [];
      this.notificationCount = 0;
      this.isSecondSidebarVisible = false;
      // this.isFirstSidebarVisible =false;
    } else {
      this.isSecondSidebarVisible = false;
      // this.isFirstSidebarVisible =false;
      this.screens = event.screens;
      this.notificationCount = event.notificationCount.notification;
    }
  }

  // Handle the collapse of the sidebar
  isCollapse(event: { isCollapsible: boolean }) {
    this.isCollapsedSideBar = event.isCollapsible;
    this.isFirstSidebarVisible = true;
  }
}
