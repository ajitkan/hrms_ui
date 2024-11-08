import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SeparationService } from 'src/app/service/SeparationService/separation.service';

@Component({
  selector: 'app-resignation-checklist',
  templateUrl: './resignation-checklist.component.html',
  styleUrls: ['./resignation-checklist.component.css']
})
export class ResignationChecklistComponent {

  resignationRequests: any[] = [];
  employeeCode: string = ''; // Replace with dynamic employeeCode if required
  currentPage = 1;  // For pagination
  selectAll: boolean = false;
  requestId = '1';
  token:any;

  showChecklistModal = false;
  checklistForm: FormGroup;
  checklistItems = [
    { employeeCode: 'K-102', itemName: 'Laptop Return', status: 'Pending', remark: '', amount: null },
    { employeeCode: 'K-101', itemName: 'ID Card Return', status: 'Pending', remark: '', amount: null },
    // Add more items as needed
];
statusOptions: string[] = ['Pending', 'Approved', 'Rejected'];

showAmountColumn = false;
  constructor(private resignationService: SeparationService,private router:Router,private fb: FormBuilder) {
    this.checklistForm = this.fb.group({
      employeeCode: [{ value: '', disabled: true }],
      itemName: [''],
      status: [''],
      amount: [''],
      remark: ['']
  });
  }
  
  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('token') as string);
  
      const decodedToken: any = jwtDecode(this.token);
      debugger
      this.employeeCode = decodedToken.unique_name;
      //  this.roleid = decodedToken.nameid;
    this.fetchResignationHistory();
  }

  get statusControl(): FormControl {
    return this.checklistForm.get('status') as FormControl;
}

openChecklistModal(request: any) {
    this.checklistForm.patchValue({
        employeeCode: request.employeeCode,
        itemName: '',
        status: '',
        amount: '',
        remark: ''
    });
}

onStatusChange(item:any) {
    if (this.statusControl.value !== 'Rejected') {
        this.checklistForm.get('amount')?.reset();
    }
}

submitChecklist() {
    if (this.checklistForm.valid) {
        const checklistData = this.checklistForm.value;
        console.log('Checklist submitted:', checklistData);
    }
}

closeChecklistModal(){

}
  
  viewResignation(resignationRequests: any): void {
    // Navigate to the resignation form with request details
    this.router.navigate(['/apply-resignation'], { state: { data: resignationRequests } });
  }
  approveSingleResignation(request: any): void {
    this.resignationService.approveOrRejectResignation(this.employeeCode, this.requestId, 'Approved').subscribe(
      (response:any) => {
        console.log('Approval response:', response);
        // Update the status in your local state
        request.status = 'Approved'; // Update the status locally
      },
      (error:any) => {
        console.error('Error approving resignation:', error);
      }
    );
  }
  
  // Method to reject a single resignation request
  rejectSingleResignation(request: any): void {
    this.resignationService.approveOrRejectResignation(this.employeeCode, this.requestId, 'Reject').subscribe(
      (response:any) => {
        console.log('Rejection response:', response);
        // Update the status in your local state
        request.status = 'Rejected'; // Update the status locally
      },
      (error:any) => {
        console.error('Error rejecting resignation:', error);
      }
    );
  }
  
  
  fetchResignationHistory(): void {
    this.resignationService.getResignationHistory(this.employeeCode).subscribe(
      (response:any) => {
        if (response && response.resignationDetails) {
          this.resignationRequests = response.resignationDetails.map((request:any) => ({
            ...request,
            status: request.finalStatusText || 'Null'  // Use finalStatusText for status
          }));
        } else {
          this.resignationRequests = [];
        }
      },
      (error:any) => {
        console.error('Error fetching resignation history', error);
      }
    );
  }
  
  
  
  // Other methods like onCheckboxChange, approveSingleResignation, rejectSingleResignation will stay the same
  
  getStatusClass(status: string): string {
    return status === 'Approved' ? 'status-approved' : status === 'Rejected' ? 'status-rejected' : '';
  }
  
  
  selectEmployee(employee: any): void {
    // Handle employee selection for filtering
  }
  
  approveResignation(request: any): void {
    // Logic to approve resignation
  }
  
  rejectResignation(request: any): void {
    // Logic to reject resignation
  }
  
  onCheckboxChange(request: any): void {
    // Logic to reject resignation
  }
  
  
  approveResignations(request: any): void {
    // Logic to reject resignation
  }
  rejectResignations(request: any): void {
    // Logic to reject resignation
  } 
   onEmployeeNameInputChange(request: any): void {
    // Logic to reject resignation
  }
  
  toggleSelectAll(): void {
    this.resignationRequests.forEach(request => {
      request.selected = this.selectAll;
    });
  }
  
  getDaysDifference(start: Date, end: Date): number {
    const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
    // Load data for the selected page
  }
  
  getTotalPages(): number {
    return Math.ceil(this.resignationRequests.length / 10); // Assuming 10 requests per page
  }
  
  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
