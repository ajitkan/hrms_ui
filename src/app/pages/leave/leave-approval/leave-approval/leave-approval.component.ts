import { AfterViewInit, Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LeaveRequestDto } from 'src/app/models/leave-request.dto';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent implements OnInit, AfterViewInit {
  selectAll: boolean = false;
  leaveRequests: LeaveRequestDto[] = [];
  isHalfDay : boolean =false;
  electAll: boolean = false;
  // leaveRequests = [
  //   // Your leave request objects here
  // ];
  selectedRequests: any[] = [];
  username: any;
  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
// debugger
    const decodedToken: any = jwtDecode(token);
    this.username = decodedToken?.unique_name;
    this.fetchLeaveRequests(this.username); // Pass the appropriate leaveApprover parameter
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

  toggleSelectAll() {
    this.selectedRequests = [];
    this.leaveRequests.forEach(request => {
      request.selected = this.selectAll;
      if (this.selectAll) {
        this.selectedRequests.push(request);
      }
    });
  }

  onCheckboxChange(request: any) {
    if (request.selected) {
      this.selectedRequests.push(request);
    } else {
      this.selectedRequests = this.selectedRequests.filter(r => r !== request);
    }

    // Update 'selectAll' checkbox state based on individual selections
    this.selectAll = this.leaveRequests.every(r => r.selected);
  }

   approveLeaves() {    
     this.selectedRequests.forEach(async request => {      
      console.log(request);
      if(request.leaveStatus!='Approved'){
        let result =  await this.approveSingleLeave(request);
        console.log("result : ",result)
      }
     });
    this.clearSelection();
  }

  ngAfterViewInit(): void {
    // Initialize all tooltips on the page
    ($('[data-toggle="tooltip"]') as any).tooltip();
  }

  rejectLeaves() {
    this.selectedRequests.forEach(async request => {
      if(request.leaveStatus!='Reject'){
        let result =  await this.rejectSingleLeave(request);
        console.log("result : ",result)
      }
    });
    this.clearSelection();
  }

   async approveSingleLeave(request: any) {
    if(request.leaveStatus !='Approved'){
      let payload = {
        "UserID":this.username.toString(),//request.employeeCode.toString(),
        "LeaveID":request.requestID.toString(),
        "Reason":request.leaveReason.toString(),
        "Status":'Approved'//request.leaveStatus.toString()
      }
      let result =  await this.leaveService.approveLeaveRequest(payload).subscribe({
        next: (response:any) => {
          if(response.code ==1)
            alert(response.message);
          request.leaveStatus = 'Approved'
        this.updateRequestStatus(request);
        },
        error: (error:any) => {
         alert(error.message);
        }
      });
    }
    else{
      alert("leave already Approved");
    }
  }

  async rejectSingleLeave(request: any) {
    // request.leaveStatus = 'Rejected';
    // this.updateRequestStatus(request);
    let payload = {
      "UserID":this.username.toString(),//request.employeeCode.toString(),
      "LeaveID":request.requestID.toString(),
      "Reason":request.leaveReason.toString(),
      "Status":'Reject'//request.leaveStatus.toString()
    }
    let result =  await this.leaveService.approveLeaveRequest(payload).subscribe({
      next: (response:any) => {
        if(response.code ==1){
          request.leaveStatus = 'Reject'
          alert(response.message);
          this.updateRequestStatus(request);
        } 
        else
        alert(response.message);
      },
      error: (error:any) => {
       alert(error.message);
      }
    });
      console.log("result : ",result);
  }

  clearSelection() {
    this.selectedRequests = [];
    this.selectAll = false;
    this.leaveRequests.forEach(request => request.selected = false);
  }

  updateRequestStatus(request: any) {
    // Call your service or API to update the leave request status
  }
}
