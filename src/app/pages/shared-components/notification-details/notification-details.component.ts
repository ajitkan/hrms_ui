import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {
  notification: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Retrieve the notification passed via router state
    this.notification = history.state.notification;

    if (!this.notification) {
      // If no notification is passed via state, navigate back to notifications list
      // this.router.navigate(['/notification']);
    }
  }
}
