

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  selectedNotification: any; 
  token: any;
  userName: any;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 5; 
  // totalNotifications : number = 30;
  totalNotifications : number= this.notifications.length;
  pageSizes: number[] = [5, 10, 20, 50, 100]; 
  notificationUnreadCount :number = 0; 
  isNotification: boolean = false;

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('token') as string);
    const decodedToken: any = jwtDecode(this.token);
    this.userName = decodedToken.unique_name || '';
    this.fetchNotifications(this.currentPage);
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
        if (res.notificationList && res.notificationList.length > 0) {
          this.notifications = res.notificationList;
          this.totalPages = res.totalCount ? Math.ceil(res.totalCount / this.pageSize) : 1;
        } else {
          this.notifications = [];
          this.totalPages = 1;
        }
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }

  onPageSizeChange(event: any) {
    this.pageSize = parseInt(event.target.value, 5); // Convert to number
    this.currentPage = 1; // Reset to the first page
    this.fetchNotifications(this.currentPage);
  }
  getTotalPages(): number {
    return Math.ceil(this.totalNotifications / this.pageSize);
  }


  getPageNumbers(): number[] {
    return Array.from({ length: this.getTotalPages() }, (v, k) => k + 1);
  }

  goToPage(page: number) {
    // if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchNotifications(this.currentPage);
    // }
  }



  updateUnreadCount() {
    this.notificationUnreadCount = this.notifications.filter(n => !n.isRead).length;
  }
  selectNotification(notification: any) { 
    if (notification && notification.notificationID) {
       notification.isRead = true;
    //  this.moduleURL= notification.moduleURL;
      this.updateUnreadCount();
      // this.router.navigate([this.moduleURL])
       this.router.navigate(['/notification', notification.notificationID], { state: { notification } });
      this.isNotification = false;

    } else {
      console.error('Notification or Notification ID is undefined');
    }
  }
}






// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/service/auth-service/auth.service';
// import {jwtDecode} from 'jwt-decode';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-notifications',
//   templateUrl: './notification.component.html',
//   styleUrls: ['./notification.component.css']
// })
// export class NotificationComponent implements OnInit {
//   notifications: any[] = [];
//   token: any;
//   userName: any;
//   currentPage: number = 1;
//   totalPages: number = 1;
//   pageSize: number = 10;
//   totalNotifications: number = 0;
//   pageSizes: number[] = [5, 10, 20, 50, 100];
//   notificationUnreadCount: number = 0;
//   isNotification: boolean = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit() {
//     this.token = JSON.parse(localStorage.getItem('token') as string);
//     const decodedToken: any = jwtDecode(this.token);
//     this.userName = decodedToken.unique_name || '';
//     this.fetchNotifications(this.currentPage);
//   }

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
//         if (res.notificationList && res.notificationList.length > 0) {
//           this.notifications = res.notificationList;
//           this.totalNotifications = res.totalCount || res.notificationList.length;
//           this.totalPages = Math.ceil(this.totalNotifications / this.pageSize);
//         } else {
//           this.notifications = [];
//           this.totalNotifications = 0;
//           this.totalPages = 1;
//         }
//         this.updateUnreadCount();
//       },
//       error: (error) => {
//         console.error('Error fetching notifications:', error);
//       }
//     });
//   }

//   onPageSizeChange(event: any) {
//     this.pageSize = parseInt(event.target.value, 10); // Convert to number
//     this.currentPage = 1; // Reset to the first page
//     this.fetchNotifications(this.currentPage);
//   }

//   getTotalPages(): number {
//     return Math.ceil(this.totalNotifications / this.pageSize);
//   }

//   getPageNumbers(): number[] {
//     return Array.from({ length: this.getTotalPages() }, (_, k) => k + 1);
//   }

//   goToPage(page: number) {
//     if (page > 0 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.fetchNotifications(this.currentPage);
//     }
//   }

//   updateUnreadCount() {
//     this.notificationUnreadCount = this.notifications.filter(n => !n.isRead).length;
//   }

//   selectNotification(notification: any) {
//     if (notification && notification.notificationID) {
//       notification.isRead = true;
//       this.updateUnreadCount();
//       this.router.navigate(['/notification', notification.notificationID], { state: { notification } });
//       this.isNotification = false;
//     } else {
//       console.error('Notification or Notification ID is undefined');
//     }
//   }
// }
