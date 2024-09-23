import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Subject, debounceTime } from 'rxjs';
import { LeaveRequestDto, RegularizationRequestDto } from 'src/app/models/leave-request.dto';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';

@Component({
  selector: 'app-punch-time-approval',
  templateUrl: './punch-time-approval.component.html',
  styleUrls: ['./punch-time-approval.component.css']
})
export class PunchTimeApprovalComponent {
  selectAll: boolean = false;
  leaveRequests: any = [];
  isHalfDay : boolean =false;
  electAll: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  pageSizes: number[] = [5, 10, 20, 50, 100]; 
  employeeNameChange$ = new Subject<string>();
  filteredEmployees: any[] = [];  // List to hold filtered employees
  filter = {
    employeeName: '',
    selectedEmployee: '',  // To hold the selected employee from dropdown
    startDate: '',
    endDate: '',
    leaveStatus:'',
    EmployeeCode:''
  };
  leaveStatus: string = ''; // This will be bound to the selected status

  // leaveRequests = [
  //   // Your leave request objects here
  // ];
  selectedRequests: any[] = [];
  username: any;
  token: string | null | undefined;
  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    if (!this.token) {
      throw new Error('No token found');
    }
    const decodedToken: any = jwtDecode(this.token);
    this.username = decodedToken?.unique_name;
    this.fetchLeaveRequests(this.currentPage); // Pass the appropriate leaveApprover parameter
    
    this.employeeNameChange$.pipe(
      debounceTime(300) // Adjust the debounce time as necessary
    ).subscribe(searchTerm => {
      this.onEmployeeNameChange(searchTerm);
    });  

  }
  fetchLeaveRequests(page: number){
    // if (!this.token) {
    //   console.error('Token not found. Cannot fetch notifications.');
    //   return;
    // }
    const payload = {
      RegApprover: this.username,
      pageNumber: page,
      pageSize: this.pageSize
    };

    this.leaveService.getRegularizationRequests(payload)
      .subscribe({
        next: (data: any) => {
          this.leaveRequests = data[0].requests;
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
    this.leaveRequests.forEach((request:any) => {
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
    this.selectAll = this.leaveRequests.every((r:any) => r.selected);
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
      let result =  await this.leaveService.approveRegularizationRequest(payload).subscribe({
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
    this.leaveRequests.forEach((request:any) => request.selected = false);
  }

  updateRequestStatus(request: any) {
    // Call your service or API to update the leave request status
  }
  onChange(){
    this.leaveService.searchEmployee({"EmpSearch":"Ga"});
  }


  getTotalPages(): number {
    return Math.ceil(this.leaveRequests.length / this.pageSize);
  }


  getPageNumbers(): number[] {
    return Array.from({ length: this.getTotalPages() }, (v, k) => k + 1);
  }

  goToPage(page: number) {
    // if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchLeaveRequests(this.currentPage);
    // }
  }
  applyFilter() {
    // debugger;
    // const payload = {
    //     "RegApprover": this.username,
    //     "pageNumber": 1,
    //     "pageSize": 2,
    //     "employeeCode": this.filter.EmployeeCode!=''? this.filter.EmployeeCode: null,
    //     "startDate": this.filter.startDate !='' ? this.filter.startDate : null,
    //     "leaveStatus": this.filter.leaveStatus !=''?this.filter.leaveStatus:null,
    //     "endDate": this.filter.endDate !=''?this.filter.endDate:null
    //     };

    // this.leaveService.getRegularizationRequests(payload).subscribe({
    //   next: (data: RegularizationRequestDto[]) => {
    //     this.leaveRequests = data;
    //     this.filterVisible = false; // Close the filter panel after applying
    //   },
    //   error: (error) => {
    //     console.error('Error applying filter', error);
    //   }
    // });
  }
  async onEmployeeNameInputChange(event: any) {debugger;
    const value = event.target.value;
    // console.log("employee search trigger!!!!")
     const inputValue = event.target.value.toLowerCase();
    
    // Assuming employees are fetched from a service or static list
    if (inputValue) {
      this.filteredEmployees = this.leaveRequests.filter((employee:any) =>
        (employee.FirstName + ' ' + employee.LastName + ' ' + employee.EmployeeCode)
        .toLowerCase()
        .includes(inputValue)
      );
      // this.filter.employeeName =
    } else {
      this.filteredEmployees = [];
    }
    await this.employeeNameChange$.next(value);
  }

  onEmployeeNameChange(employeeName: string) {
    if (employeeName.trim()) {
      const payload = { EmpSearch: employeeName };
      this.leaveService.searchEmployee(payload).subscribe({
        next: (employees: any) => {
          this.filteredEmployees = employees.employeeList; 
        },
        error: (error) => {
          console.error('Error searching for employees', error);
        }
      });
    }
    else{
      this.filteredEmployees = [];
    }
  }
  selectEmployee(employee: any) {
    this.filter.EmployeeCode = employee.EmployeeCode.trim();
    this.filter.employeeName = employee.FirstName;  // Set the input value to the selected employee
    this.filter.selectedEmployee = employee.FirstName;  // Set selected employee for filter application
    this.filteredEmployees = [];  // Clear the dropdown after selection
    this.leaveRequests = this.leaveRequests.filter(
      (request:any) => request.FirstName.toLowerCase() === this.filter.selectedEmployee.toLowerCase()
    );
    this.filter.employeeName = employee.FirstName + ' ' + employee.LastName + ' (' + employee.EmployeeCode + ')';
    
    // Clear the dropdown after selecting an employee
    this.filteredEmployees = [];  
  }
  setLeaveStatus(status: string) {
    this.filter.leaveStatus = status;
     this.leaveStatus = status;
  }

  resetfilter(){
    this.fetchLeaveRequests(this.currentPage);
    this.toggleFilter();
  }

}
