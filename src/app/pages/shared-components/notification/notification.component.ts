import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import {jwtDecode }from 'jwt-decode'; // Import jwtDecode if not already imported

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() isNotification: boolean = false;
  @Input() notifications: any[] = [];
  // notifications: any[] = [];
  notificationCount!: number;
  userName: string = ''; 
  pageNumber: number = 1; 
  pageSize: number = 10; 
  token: string | null = null; 
  selectedNotification: any = null;
  dropdownOpen:boolean=false;         

  // paginatedNotifications: any[] = [];
  // currentPage = 1;
  // itemsPerPage = 5;
  // totalPages=1;

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initializeUserData();
  }
 
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
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

  close() {
    console.log('close button called----------->');
    this.modalService.dismissAll();
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
 
  loadMoreNotifications() {
    this.pageNumber++; 
    this.fetchNotifications(); 
  }

  showNotificationDetails(notification: any) {
    this.selectedNotification = notification; 
  }

  clearSelectedNotification(event:Event) {
    event.stopPropagation();
    this.selectedNotification = null; 
  }
  openNotificationDetailsModal(notification:any){

  }
}
