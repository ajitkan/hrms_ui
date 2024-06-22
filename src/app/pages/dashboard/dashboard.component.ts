import { Component, OnInit } from '@angular/core';
import { DateTimeComponent } from '../shared-components/date-time/date-time.component';
// import { DateTimeComponent } from '../shared-components/date-time/date-time.component'
@Component({  
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports:[DateTimeComponent]
})
export class DashboardComponent {
  
  isShow = false;
  // showCheckInButton = false;

  toggleButtons(): void {
   this.isShow=!this.isShow;
    // event.preventDefault();
    // this.showCheckInButton = !this.showCheckInButton;

}
}
 


