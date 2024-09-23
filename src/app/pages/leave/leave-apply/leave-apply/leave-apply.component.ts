import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.css'],
})
export class LeaveApplyComponent {
  leaveForm: FormGroup;
  successMessage: string = '';
  isSubmitted: boolean = false;
  leaveHistory: any[] = [];
  leaveSummary:any[] = [];
  empContactAndEmails:any[] = [];
  leaveApprovers:any[] = [];
  allCount: number = 0;
  openCount: number = 0;
  approvedCount: number = 0;
  declinedCount: number = 0;
  cancelledCount: number = 0;
  leaveTypes: any[] = []; 
  leaveTypesMap: { [key: number]: string } = {};
  leaveSummaryItem:any;
  charCount = 0;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    // Initialize the form with validation rules
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // leaveSubCategory: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(500)]]
    }, {
      validator: this.dateRangeValidator('fromDate', 'toDate') // Add custom validator here
    });
  }
  
 ngOnInit(){
  this.fetchLeaveData('K-101'); 
  this.charCount = this.leaveForm.get('reason')?.value?.length || 0;
 }

 updateCharCount() {
  this.charCount = this.leaveForm.get('reason')?.value?.length || 0;
}

dateRangeValidator(fromDateKey: string, toDateKey: string) {
  return (formGroup: FormGroup) => {
    const fromDateControl = formGroup.controls[fromDateKey];
    const toDateControl = formGroup.controls[toDateKey];

    if (toDateControl.errors && !toDateControl.errors['dateRangeInvalid']) {
      // Return if another validator has already found an error on the toDateControl
      return;
    }

    // Set error if To Date is less than From Date
    if (new Date(toDateControl.value) < new Date(fromDateControl.value)) {
      toDateControl.setErrors({ dateRangeInvalid: true });
    } else {
      toDateControl.setErrors(null); // Clear the error if validation passes
    }
  };
}
 
// applyLeave() {
//   this.isSubmitted = true;

//   if (this.leaveForm.invalid) {
//     console.log('Form is invalid:', this.leaveForm.errors); 
//     return;
//   }

 
//   const leaveRequestPayload = {
//     employeeCode: 'K-101', 
//     leaveCategory: this.leaveForm.value.leaveType,
//     leaveSubCategory: this.leaveForm.value.leaveSubCategory || 0, 
//     fromDate: this.leaveForm.value.fromDate,
//     toDate: this.leaveForm.value.toDate,
//     reason: this.leaveForm.value.reason
//   };

//   this.leaveService.applyLeave(leaveRequestPayload).subscribe({
//     next: (response) => {
     
//       this.successMessage = response.message || 'Leave applied successfully!';
//       this.leaveForm.reset();
//       this.isSubmitted = false;
//     },
//     error: (error) => {
      
//       const errorMessage = error.error?.message || 'Error applying leave. Please try again later.';
//       console.error('Error applying leave:', error);
//       this.successMessage = errorMessage;
//     }
//   });
// }
applyLeave() {
  this.isSubmitted = true;

  if (this.leaveForm.invalid) {
    console.log('Form is invalid:', this.leaveForm.errors); 
    return;
  }
debugger
  // Calculate the number of leave days
  const leaveTypeId = this.leaveForm.value.leaveType;
  const numberOfLeaveDays = this.calculateNumberOfDays(); // Your method to calculate the number of leave days

  console.log('Leave Type ID from Form:', leaveTypeId);
  console.log('Number of Leave Days:', numberOfLeaveDays);

  const availableLeaveBalance = this.getLeaveBalance(leaveTypeId);
  console.log(`Available Leave Balance for ${leaveTypeId}: ${availableLeaveBalance}`);

  // if (numberOfLeaveDays > availableLeaveBalance) {
  //   this.successMessage = `You are not eligible to apply for ${numberOfLeaveDays} days of leave because you have only ${availableLeaveBalance} days available.`;
  //   return;
  // }

  // Check if the leave type is Comp-Off
  const isCompOff = leaveTypeId === 1;

  if (isCompOff) {
    // Handle validation for Comp-Off leave
    if (numberOfLeaveDays > availableLeaveBalance) {
      this.successMessage = `You are not eligible to apply for ${numberOfLeaveDays} days of Comp-Off leave because you have only ${availableLeaveBalance} days available.`;
      return;
    }
  } else {
    // Handle validation for other leave types
    // if (numberOfLeaveDays > availableLeaveBalance) {
    //   this.successMessage = `You are not eligible to apply for ${numberOfLeaveDays} days of leave because you have only ${availableLeaveBalance} days available.`;
    //   return;
    // }
  }

  const leaveRequestPayload = {
    employeeCode: 'K-101', 
    leaveCategory: leaveTypeId,
    leaveSubCategory: this.leaveForm.value.leaveSubCategory || 1, 
    fromDate: this.leaveForm.value.fromDate,
    toDate: this.leaveForm.value.toDate,
    reason: this.leaveForm.value.reason
  };
  this.leaveService.applyLeave(leaveRequestPayload).subscribe({
    next: (response) => {
      this.successMessage = response.message || 'Leave applied successfully!';
      this.leaveForm.reset();
      this.isSubmitted = false;
    },
    error: (error) => {
      const errorMessage = error.error?.message || 'Error applying leave. Please try again later.';
      console.error('Error applying leave:', error);
      this.successMessage = errorMessage;
    }
  });
}
fetchLeaveData(employeeCode: string): void {
  this.leaveService.fetchEmployeeLeaveDetails(employeeCode).subscribe((response: any) => {
    if (response.code === 1) {
      this.leaveHistory = response.data.leaveHistory;
      this.leaveSummary = response.data.leaveSummary;
      this.empContactAndEmails =response.data.empContactAndEmails;
      this.leaveApprovers = response.data.leaveApprovers;

      console.log('Emailand contact -->' ,this.empContactAndEmails);
       // Patch the form with the email and contact data
       if (this.empContactAndEmails && this.empContactAndEmails.length > 0) {
        const contactInfo = this.empContactAndEmails[0];  // Access the first object in the array

        // Patch the form with the email and contact data
        this.leaveForm.patchValue({
          email: contactInfo.email,
          contact: contactInfo.phoneNumber
        });
      }
      this.leaveTypes = response.data.leaveTypes || [];
      console.log('Leavetypes -->', this.leaveTypes);
      

      console.log('Emailand contact -->' ,this.empContactAndEmails);
      
      this.calculateLeaveCounts();
    
      this.setLeaveTypesMap(response.data.leaveTypes);
      this.updateLeaveSummary();
    }
  }, error => {
    console.error('Error fetching leave data', error);
  });
}
setLeaveTypesMap(leaveTypes: any[]): void {
  this.leaveTypesMap = leaveTypes.reduce((map, leaveType) => {
    map[leaveType.leaveID] = leaveType.leaveText;
    return map;
  }, {} as { [key: number]: string });
}

updateLeaveSummary(): void {
  this.leaveSummary = this.leaveSummary.map(leave => ({
    ...leave,
    leaveText: this.leaveTypesMap[leave.leaveCategoryID] || 'Unknown Leave Type'
  }));
}
calculateLeaveCounts(): void {
  this.allCount = this.leaveHistory.length;
  this.openCount = this.leaveHistory.filter(leave => leave.leaveStatus === 1).length;  
  this.approvedCount = this.leaveHistory.filter(leave => leave.leaveStatus === 2).length;  
  this.declinedCount = this.leaveHistory.filter(leave => leave.leaveStatus === 3).length; 
  this.cancelledCount = this.leaveHistory.filter(leave => leave.leaveStatus === 4).length;  
}
  // Function to reset the form
  resetForm() {
    this.isSubmitted = false;
    this.leaveForm.reset(); 
  }

  // Function to check form field validity
  get f() {
    return this.leaveForm.controls;
  }
  // getLeaveBalance(leaveTypeId: number): number {
  //   const leaveSummaryItem = this.leaveSummary.find(leave => leave.leaveCategoryID === leaveTypeId);
  //   return leaveSummaryItem ? leaveSummaryItem.balanceLeaves : 0;
    
  // }

  getLeaveBalance(leaveTypeId: string): number {
    // Print the leaveSummary and leaveTypeId for debugging
    console.log('Leave Summary:', this.leaveSummary);
    console.log('Leave Type ID:', leaveTypeId);
  
    // Convert leaveTypeId to a number
    debugger
    const leaveTypeIdNumber = Number(leaveTypeId);
  
    // Check if conversion was successful
    if (isNaN(leaveTypeIdNumber)) {
      console.error('Invalid Leave Type ID:', leaveTypeId);
      return 0; // Return 0 or handle the error as needed
    }
  
    // Find the leaveSummary item with the matching leaveCategoryID
    const leaveSummaryItem = this.leaveSummary.find(
      leave => Number(leave.leaveCategoryID) === leaveTypeIdNumber
    );
  
    // Print the result of the find operation
    console.log('Leave Summary Item Found:', leaveSummaryItem);
  
    // Return the balanceLeaves or 0 if not found
    return leaveSummaryItem ? leaveSummaryItem.balanceLeaves : 0;
  }
  
  
  calculateNumberOfDays(): number {
    const fromDate = new Date(this.leaveForm.value.fromDate);
    const toDate = new Date(this.leaveForm.value.toDate);
  
    // Ensure dates are valid
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return 0;
    }
  
    // Calculate the difference in days
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include the end date
  
    return diffDays;
  }
  
  // getApproverByLevel(level: number): any {
  //   return this.leaveApprovers?.find(approver => approver.approvalLevel === level) || null;
  // }
  
  
}
