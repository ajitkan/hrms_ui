import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { NotificationComponent } from '../notification/notification.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() notificationCount:any;
  @Output() isLogin = new EventEmitter<{ isLoggedIn: boolean; screens: any[];notificationCount:any; }>();
 
 user:any;
 isCollapsed:boolean=false;
 isNotification:boolean=false;
//  notificationsOpen:boolean=false;

 @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
 userName:any;
 token:any;

 notifications: any[] = [];
 notificationsOpen :boolean = false;
 selectedNotification: any = null;

//  userName: string = ''; 
 pageNumber: number = 1; 
 pageSize: number = 10; 
//  notifications = [
  
//  ];
 constructor(private formBuilder: FormBuilder,
  private authService:AuthService ,
  private modalService: NgbModal,
  private router: Router
){
    
  }
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user")as string);
    this.initializeUserData();
  }

  initializeUserData() {
    this.token = JSON.parse(localStorage.getItem('token')as string); 
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token);
      this.userName = decodedToken.unique_name || ''; 
      this.fetchNotifications(); 
    } else {
      console.error('Token not found in localStorage');
    }
  }
  // showNotificationDetails(notification: any) {
  //   this.selectedNotification = notification; 
  // }
  showNotificationDetails(notification: any) {
    // if (this.selectedNotification === notification) {
    //   this.selectedNotification = null; 
    // } else {
    //   this.selectedNotification = notification;
    // }
    if (notification && notification.notificationID) {
      this.router.navigate(['/notification', notification.notificationID]);
    } else {
      console.error('Notification or Notification ID is undefined');
    }
  }
  clearSelectedNotification(event:Event) {
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
  // openNotificationModal() {
  //   this.modalService.open(NotificationComponent);
  // }
  openChangePasswordModal() {
    this.modalService.open(this.changePasswordModal, { centered: true }); 
  }
  toggleCollapse(isNotification?:boolean) {
    // if(!isNotification)
     this.isCollapsed =!this.isCollapsed
     this.isNotification = false;
    // else
    //  this.isNotification =!this.isNotification
    // this.isCollapse.emit(true);
  }
  toggleNotification(isNotification?:boolean) {
   
     this.isNotification =!this.isNotification
     this.isCollapsed = false;
    // this.isCollapse.emit(true);
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
          this.isLogin.emit({ isLoggedIn: false, screens: [],notificationCount:this.notificationCount  });
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
  
  fetchNotifications() {
    if (!this.token) {
      console.error('Token not found. Cannot fetch notifications.');
      return;
    }

    const payload = {
      userName: this.userName,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this.authService.getNotifications(payload, this.token).subscribe({
      next: (res: any) => {
        console.log('----------notification fetch->', res);
        
        this.notifications = res.notificationList;  
        // this.notificationCount = this.notifications.length;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }
  
  
}
