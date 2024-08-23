// import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { first } from 'rxjs';
// import { ApiService } from 'src/app/service/api.service';
// import { AuthService } from 'src/app/service/auth-service/auth.service';
// import { NotificationComponent } from '../notification/notification.component';
// import { jwtDecode } from 'jwt-decode';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//   @Input() notificationCount:any;
//   @Output() isLogin = new EventEmitter<{ isLoggedIn: boolean; screens: any[];notificationCount:any; }>();
 
//  user:any;
//  isCollapsed:boolean=false;
//  isNotification:boolean=false;
// //  notificationsOpen:boolean=false;

//  @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
//  userName:any;
//  token:any;

//  notifications: any[] = [];
//  notificationsOpen :boolean = false;
//  selectedNotification: any = null;

// //  userName: string = ''; 
//  pageNumber: number = 1; 
//  pageSize: number = 10; 
//  currentPage = 1;
//  totalPages = 1;
//  constructor(private formBuilder: FormBuilder,
//   private authService:AuthService ,
//   private modalService: NgbModal,
//   private router: Router
// ){
    
//   }
//   ngOnInit(){
//     this.user = JSON.parse(localStorage.getItem("user")as string);
//     this.initializeUserData();
//   }

//   initializeUserData() {
//     this.token = JSON.parse(localStorage.getItem('token')as string); 
//     if (this.token) {
//       const decodedToken: any = jwtDecode(this.token);
//       this.userName = decodedToken.unique_name || ''; 
//       this.fetchNotifications(this.currentPage); 
//     } else {
//       console.error('Token not found in localStorage');
//     }
//   }
 
//    prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.fetchNotifications(this.currentPage);
//     }
//   }

//   nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.fetchNotifications(this.currentPage);
//     }
//   }
//   showNotificationDetails(notification: any) {
   
//     if (notification && notification.notificationID) {
//       this.router.navigate(['/notification', notification.notificationID]);
//     } else {
//       console.error('Notification or Notification ID is undefined');
//     }
//   }
//   clearSelectedNotification(event:Event) {
//     event.stopPropagation();
//     this.selectedNotification = null; 
//   }
//   toggleNotifications() {
//     this.notificationsOpen = !this.notificationsOpen;
//   }

//   openNotificationModal() {
//     const modalRef = this.modalService.open(NotificationComponent, { centered: true });
//     modalRef.componentInstance.notifications = this.notifications;
//   }


//   openChangePasswordModal() {
//     this.modalService.open(this.changePasswordModal, { centered: true }); 
//   }
//   toggleCollapse(isNotification?:boolean) {
//     // if(!isNotification)
//      this.isCollapsed =!this.isCollapsed
//      this.isNotification = false;
//     // else
//     //  this.isNotification =!this.isNotification
//     // this.isCollapse.emit(true);
//   }
//   toggleNotification(isNotification?:boolean) {
   
//      this.isNotification =!this.isNotification
//      this.isCollapsed = false;
//     // this.isCollapse.emit(true);
//   }
//   logoutRes: any;

//   logout() {
//     this.authService.logout().subscribe({
//       next: (res: any) => {
//         console.log('Logout response:', res); 
//         this.logoutRes = res;
        
//         if (res.status === 'Success') {
//           this.authService.clearSession();
//           console.log('Navigating to login page...');
//           // this.isLogin.emit(false); 
//           this.isLogin.emit({ isLoggedIn: false, screens: [],notificationCount:this.notificationCount  });
//           this.router.navigate(['']).then(() => {
//             console.log('Navigation successful!');
//           }).catch((error) => {
//             console.error('Navigation error:', error);
//           });
//         } else {
//           console.warn('Logout response did not indicate success:', res);
//         }
//       },
//       error: (error) => {
//         console.error('Logout failed', error);
        
//       }
//     });
//   }
  
//   // fetchNotifications() {
//   //   if (!this.token) {
//   //     console.error('Token not found. Cannot fetch notifications.');
//   //     return;
//   //   }

//   //   const payload = {
//   //     userName: this.userName,
//   //     pageNumber: this.pageNumber,
//   //     pageSize: this.pageSize
//   //   };

//   //   this.authService.getNotifications(payload, this.token).subscribe({
//   //     next: (res: any) => {
//   //       console.log('----------notification fetch->', res);
        
//   //       this.notifications = res.notificationList;  
//   //       // this.notificationCount = this.notifications.length;
//   //     },
//   //     error: (error) => {
//   //       console.error('Error fetching notifications:', error);
//   //     }
//   //   });
//   // }
  
//   fetchNotifications(page: number) {
//     if (!this.token) {
//       console.error('Token not found. Cannot fetch notifications.');
//       return;
//     }
  
//     const payload = {
//       userName: this.userName,
//       pageNumber: page,
//       pageSize: this.pageSize
//     };
  
//     this.authService.getNotifications(payload, this.token).subscribe({
//       next: (res: any) => {
//         console.log('----------notification fetch->', res);
        
//         this.notifications = res.notificationList;  
//         this.totalPages = Math.ceil(res.totalCount / this.pageSize);
//       },
//       error: (error) => {
//         console.error('Error fetching notifications:', error);
//       }
//     });
//   }
  
// }









import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { CommanSearchEmployeeService,Employee } from 'src/app/service/CommanService/comman-search-employee.service';
import { NotificationComponent } from '../notification/notification.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() notificationCount: any;
  @Output() isLogin = new EventEmitter<{ isLoggedIn: boolean; screens: any[]; notificationCount: any;}>();
  @Output() isCollapse = new EventEmitter<{isCollapsible:boolean}>();
  [x: string]: any;
 //variable  for Search Employee
  TextFrees: string = '';
  searchResults: Employee[] = [];
  visibleResults: any[] = [];
  showDropdown: boolean = false;
  showAll: boolean = false;

  encodedJsonString:any;
  user: any;
  isCollapsed: boolean = false;
  isNotification: boolean = false;
  @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
  userName: any;
  token: any;
  notifications: any[] = [];
  notificationsOpen: boolean = false;
  selectedNotification: any = null;
  pageNumber: number = 1; 
  pageSize: number = 5; 
  currentPage = 1;
  totalPages = 1;
  loading = false;
  unreadCount :number = 0; 
  moduleURL: any;
  isCollapsible = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private CommanSearchEmployeeService:CommanSearchEmployeeService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") as string);
    console.log("this.notificationCount",this.notificationCount)
    this.initializeUserData();
  }

  initializeUserData() {
    this.token = JSON.parse(localStorage.getItem('token') as string); 
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token);
      this.userName = decodedToken.unique_name || ''; 
      this.fetchNotifications(this.currentPage); 
    } else {
      console.error('Token not found in localStorage');
    }
  }


  loadMore() {
    // console.log(`Current Page: ${this.currentPage}, Total Pages: ${this.totalPages}, Loading: ${this.loading}`);
    // if (this.currentPage < this.totalPages && !this.loading) {
      // this.loading = true;
      // this.currentPage++;
      // this.fetchNotifications(this.currentPage);
      this.isNotification = false;
       this.router.navigate(['/notification']);
    // }
  }
  


  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchNotifications(this.currentPage);
    }
  }

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  }

  showNotificationDetails(notification: any) { 
    if (notification && notification.notificationID) {
       notification.isRead = true;
     this.moduleURL= notification.moduleURL;
      this.updateUnreadCount();
      // this.router.navigate([this.moduleURL])
      console.log('-----------------> module URl',this.moduleURL);
      
       this.router.navigate(['/notification', notification.notificationID], { state: { notification } });
      this.isNotification = false;

    } else {
      console.error('Notification or Notification ID is undefined');
    }
  }


  // showNotificationDetails(notification: any) { 
  //   if (notification && notification.notificationID) {
  //     notification.isRead = true;
  
  //     this.updateUnreadCount();
  
  //     // Determine if moduleURL is an internal path
  //       this.router.navigate([notification.moduleURL]);
     
  //     this.isNotification = false;
  //     console.log('-----------------> module URL', notification.moduleURL);
  
  //   } else {
  //     console.error('Notification or Notification ID is undefined');
  //   }
  // }
  
  
  
  clearSelectedNotification(event: Event) {
    event.stopPropagation();
    this.selectedNotification = null; 
  }

  toggleNotifications() {
    this.notificationsOpen = !this.notificationsOpen;
  }

  openNotificationModal() {
    const modalRef = this.modalService.open(NotificationComponent, { centered: true });
    modalRef.componentInstance.notifications = this.notifications;
  }

  openChangePasswordModal() {
    this.modalService.open(this.changePasswordModal, { centered: true }); 
  }

  toggleCollapse(isNotification?: boolean) {
    this.isCollapsed = !this.isCollapsed;
    this.isNotification = false;
  }

  toggleNotification(isNotification?: boolean) {
    this.isNotification = !this.isNotification;
    this.isCollapsed = false;
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
          this.isLogin.emit({ isLoggedIn: false, screens: [], notificationCount: this.notificationCount});
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

  //______________________________For Search Employee______________________________________________
  onSearch(): void {
    if (this.TextFrees) {
      this.searchResults = this.CommanSearchEmployeeService.searchEmployees(this.TextFrees);
      if (this.searchResults.length > 0 && !this.showAll) {
        this.visibleResults = this.searchResults.slice(0, 3);
      } else {
        // debugger;
        this.visibleResults = this.searchResults;
      }
      this.showDropdown = true;
    } 
    else {
      // debugger;
      this.showDropdown = false;
      this.searchResults = [];
      this.visibleResults = [];
    }

    // const jsonString = JSON.stringify(this.searchResults);    
  }
  showAllRecords(): void {
    this.showAll = true;
    this.visibleResults = this.searchResults;
    this.showDropdown = false; // Hide the dropdown
    //this.router.navigate(['/EmployeeList'], { queryParams: { data: this.encodedJsonArray } });
  }

  // get encodedJsonArray(): any {
  //   return this.encodedJsonString = encodeURIComponent(JSON.stringify(this.searchResults));//encodeURIComponent(JSON.stringify(this.jsonArray));
  // }
  encodedJsonArray(emp?: any): string {
    if(emp){
      const dataToEncode = emp ? emp : this.searchResults;
      this.encodedJsonString = encodeURIComponent(JSON.stringify(dataToEncode));
      console.log('Fetched Employee',JSON.stringify(this.encodedJsonString));
      return this.encodedJsonString;
    }
    else{
      return this.encodedJsonString = encodeURIComponent(JSON.stringify(this.searchResults));//encodeURIComponent(JSON.stringify(this.jsonArray));
    }
}   
  fetchNotifications(page: number) {
    if (!this.token) {
      console.error('Token not found. Cannot fetch notifications.');
      return;
    }
    const payload = {
      userName: this.userName,
      pageNumber: page,
      pageSize: this.pageSize
    };

    this.authService.getNotifications(payload, this.token).subscribe({
      next: (res: any) => {
        console.log('----------notification fetch->', res);
        if (res.notificationList && res.notificationList.length > 0) {
          this.notifications = page === 1 ? res.notificationList : [...this.notifications, ...res.notificationList];
          this.totalPages = res.totalCount ? Math.ceil(res.totalCount / this.pageSize) : 1; // Update totalPages
          this.loading = false; // Reset loading state
          this.notificationCount = res.totalCount;
        } else {
          this.totalPages = 1; // If no notifications, default to 1 page
          this.loading = false; // Reset loading state
        }
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
        this.loading = false; // Reset loading state
      }
    });
  }  
  displaySearchResult(employee?:any){
    let url = '';
    if(employee){
      url = `/EmployeeList?data=${this.encodedJsonArray(employee)}`;//this.encodedJsonArray();
    }
    else{
      // const encodedJsonArray = encodeURIComponent(JSON.stringify(employee));
      url = `/EmployeeList?data=${this.encodedJsonArray()}`;
    }
    this.showDropdown=false;

    this.router.navigateByUrl(url);
    // routerLink="/EmployeeList" [queryParams]="{data:encodedJsonArray(employee)}"
  }
  //-------------------Search Enmployee-------------------------------
  

  toggleSidebar() {
    this.isCollapsible = !this.isCollapsible;
    this.isCollapse.emit({isCollapsible:this.isCollapsible});
  }
}
