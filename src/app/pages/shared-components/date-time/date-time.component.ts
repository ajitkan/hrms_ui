import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dateTime',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
  standalone:true,
})
export class DateTimeComponent implements OnInit,OnDestroy {
  currentDateTime: string;
  intervalId: any;

  constructor() {
    this.currentDateTime = '';
  }

  ngOnInit(): void {
    this.updateDateTime();
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000); // Update every second
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(); // Format the date and time
  }
}
