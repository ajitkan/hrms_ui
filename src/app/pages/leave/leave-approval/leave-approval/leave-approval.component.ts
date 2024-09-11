import { Component } from '@angular/core';
import { LeaveRequestDto } from 'src/app/models/leave-request.dto';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent {

  leaveRequests: LeaveRequestDto[] = [];
  isHalfDay : boolean =false;

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.fetchLeaveRequests('1'); // Pass the appropriate leaveApprover parameter
  }

  fetchLeaveRequests(leaveApprover: string): void {
    this.leaveService.getLeaveRequests(leaveApprover)
      .subscribe({
        next: (data: LeaveRequestDto[]) => {
          this.leaveRequests = data;
          console.log(this.leaveRequests);
        },
        error: (error) => {
          console.error('Error fetching leave requests', error);
        }
      });
  }

  getDaysDifference(startDate: Date, endDate: Date, isHalfDay: boolean): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the difference in milliseconds and convert to days
    const timeDiff = end.getTime() - start.getTime();
    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // If the start and end dates are the same, count it as 1 day
    dayDiff = dayDiff === 0 ? 1 : dayDiff + 1;
    
    // Adjust for half-day leaves
    if (isHalfDay) {
      dayDiff -= 0.5;  // Subtract half a day
    }
    
    return dayDiff;
  }
  
  
  
  filterVisible = false;
  // leaveRequests = [
  //   {
  //     employeeName: 'Niraj Wani',
  //     leaveType: 'Privilege Leave',
  //     date: "12 Nov'24 - 14 Nov'24",
  //     days: 3,
  //     reason: 'Out of Station',
  //     status: 'Pending',
  //   }
  //   // Add more leave requests as needed
  // ];

  filter = {
    employeeName: '',
    financialYear: '',
  };

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }

  getStatusClass(status: string) {
    return {
      'status-approved': status === 'Approved',
      'status-pending': status === 'Pending',
      'status-reject': status === 'Reject'
    };
  }
}
