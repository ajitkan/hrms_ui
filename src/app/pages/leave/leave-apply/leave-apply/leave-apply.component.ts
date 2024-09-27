import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.css'],
})
export class LeaveApplyComponent {
  leaveForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
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

  isHolidayListOpen: boolean = false;

  compOffLeaves: any[] = [];
  isCompOffSelected: boolean = false;
  // maxDatesAllowed = 2; 
  // minDatesAllowed = 1; 
  removedDates: string[] = [];
  minDatesRequired = 1;
  showMessage: boolean = false;
  holidays: Array<{ name: string, date: string }> = [];
  private employeeCode: string = '';
  private token: any;
  leaveCount: number | [] = []; 
  availableLeaveBalance:any;
  balanceLeaves:any;

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private http:HttpClient ) {
    // Initialize the form with validation rules
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      // fromDate: ['', Validators.required],
      // toDate: ['', Validators.required],
      fromDate: ['', [Validators.required, this.fromDateValidator()]],
      toDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // workedDate: [''] ,
      workedDates: this.fb.array([]) ,
      // leaveSubCategory: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(500)]],
     
    }, 
    {
      Validators: this.dateRangeValidator('fromDate', 'toDate') // Add custom validator here
    });

    this.leaveForm.get('fromDate')?.valueChanges.subscribe(value => {
      if (value && this.leaveForm.get('toDate')?.value) {
        this.fetchLeaveCount();
      }
    });
    
    this.leaveForm.get('toDate')?.valueChanges.subscribe(value => {
      if (value && this.leaveForm.get('fromDate')?.value) {
        this.fetchLeaveCount();
      }
    });
    
  }
  
 ngOnInit(){
  this.token = JSON.parse(localStorage.getItem('token') as string);
  const decodedToken: any = jwtDecode(this.token);
  this.employeeCode = decodedToken.unique_name;
  // this.fetchLeaveData('K-101'); 
  this.fetchLeaveData(this.employeeCode); 
  this.fetchCompOffLeaves(this.employeeCode);
  this.loadHolidays();
  this.charCount = this.leaveForm.get('reason')?.value?.length || 0;
 }

 get canAddDate(): boolean {
  return this.removedDates.length > 0 || this.workedDates.length < this.minDatesRequired;
}

 get workedDates(): FormArray {
  return this.leaveForm.get('workedDates') as FormArray;
}

checkDatesAndFetchLeaveCount(): void {
  const fromDate = this.leaveForm.get('fromDate')?.value;
  const toDate = this.leaveForm.get('toDate')?.value;
  const leaveType = this.leaveForm.get('leaveType')?.value;

  // Check if all required fields are filled
  if (fromDate && toDate && leaveType) {
    console.log('Dates and leave type selected, calling fetchLeaveCount...');
    this.fetchLeaveCount();
  } else {
    console.log('Waiting for both dates and leave type to be selected...');
  }
}


// fetchLeaveCount(): void {
//   const fromDate = this.leaveForm.get('fromDate')?.value;
//   const toDate = this.leaveForm.get('toDate')?.value;
//   const leaveType = this.leaveForm.get('leaveType')?.value;

//   // Ensure these three fields have values
//   if (leaveType && fromDate && toDate) {
//     const payload = {
//       employeeCode: this.employeeCode, // Use the actual employee code
//       fromDate: fromDate,
//       toDate: toDate,
//       leaveCategory: leaveType // Assuming leaveType corresponds to leaveCategory
//     };

//     console.log('Sending API request with payload:', payload);

//     this.http.post('https://localhost:7254/UserDetails/GetEmployeeLeaveCount', payload)
//       .subscribe((response: any) => {
//         if (response && response.code === 1) {
//           console.log('API response received:', response);
//           this.leaveCount = response.getEmployeeLeaveCounts[0]?.leaveCount || 0;
//         } else {
//           console.log('Unexpected API response:', response);
//         }
//       }, error => {
//         console.error('Error fetching leave count', error);
//       });
//   } else {
//     console.log('fromDate, toDate, or leaveType is missing.');
//   }
// }



//Working code 
//  onLeaveTypeChange(event: any): void {
//   debugger
//   const leaveTypeId = this.leaveForm.value.leaveType;
//   this.isCompOffSelected = leaveTypeId === '2'; // Adjust based on your leave type ID for Comp-Off

//   if (this.isCompOffSelected) {
//     this.fetchCompOffLeaves('K-101'); // Pass the actual employee code
//     this.leaveForm.get('workedDate')?.setValidators([Validators.required]);
//   } else {
//     this.leaveForm.get('workedDate')?.clearValidators();
//   }
//   this.leaveForm.get('workedDate')?.updateValueAndValidity();
// }
fetchLeaveCount(): void {
  const fromDate = this.leaveForm.get('fromDate')?.value;
  const toDate = this.leaveForm.get('toDate')?.value;
  const leaveType = this.leaveForm.get('leaveType')?.value;

  if (leaveType && fromDate && toDate) {
    const payload = {
      employeeCode: this.employeeCode,
      fromDate: fromDate,
      toDate: toDate,
      leaveCategory: leaveType
    };

    this.leaveService.fetchLeaveCount(payload).subscribe({
      next: (response: any) => {
        if (response && response.code === 1) {
          this.leaveCount = response.getEmployeeLeaveCounts[0]?.leaveCount || 0;
          console.log('Leave count:', this.leaveCount);
        } else {
          console.log('Unexpected API response:', response);
        }
      },
      error: (err: any) => {
        console.error('Error fetching leave count:', err);
      },
      complete: () => {
        console.log('Leave count fetch complete');
      }
    });
  } else {
    console.log('fromDate, toDate, or leaveType is missing.');
  }
}


onLeaveTypeChange(event: any): void {
  const leaveTypeId = this.leaveForm.value.leaveType;
  this.isCompOffSelected = leaveTypeId === '2'; // Assuming '2' is Comp-Off

  // Find the Comp-Off leave in the leave summary
  const compOffLeave = this.leaveSummary.find((leave: any) => leave.leaveCategoryID === 2);
  const compOffBalance = compOffLeave ? compOffLeave.balanceLeaves : 0;

  this.showMessage = this.isCompOffSelected && compOffBalance === 0;

  if (this.isCompOffSelected && compOffBalance === 0) {
    this.errorMessage= 'You do not have any Comp-Off balance. Worked dates are not required.';
    this.leaveForm.get('workedDates')?.clearValidators();
    this.leaveForm.get('workedDates')?.disable();  // Disable the FormArray
  } else if (this.isCompOffSelected && compOffBalance > 0) {
    // this.clearMessage();
    this.leaveForm.get('workedDates')?.setValidators([Validators.required, Validators.minLength(1)]);
    this.leaveForm.get('workedDates')?.enable();  // Enable the FormArray
  } else {
    this.leaveForm.get('workedDates')?.clearValidators();
    this.leaveForm.get('workedDates')?.disable();  // Disable the FormArray
  }

  this.leaveForm.get('workedDates')?.updateValueAndValidity();
}

  fetchCompOffLeaves(employeeCode: string): void {
    const payload = { employeeCode };
    console.log('Fetching CompOff Leaves with payload:', payload);
    this.leaveService.fetchCompOffLeaves(employeeCode).subscribe({
      next: (response) => {
        console.log('CompOff Leaves Response:', response);
        // Extract and format dates
        this.compOffLeaves = response.leaves.map((leave: { workingDay: string | number | Date; }) => {
          const date = new Date(leave.workingDay);
          return date.toLocaleDateString('en-GB'); // 'en-GB' formats date as 'dd/MM/yyyy'
        });
        this.updateWorkedDates();
      },
      error: (error) => {
        console.error('Error fetching CompOff leaves:', error);
      }
    });
  }

  updateWorkedDates(): void {
    const dates = this.compOffLeaves.map(date => this.fb.control(date));
    this.leaveForm.setControl('workedDates', this.fb.array(dates));
  }




  addWorkedDate(): void {
    if (this.removedDates.length > 0) {
      // Re-add a removed date if available
      const dateToAdd = this.removedDates.pop();
      this.workedDates.push(this.fb.control(dateToAdd));
    } else {
      // Add a new empty date if no removed dates are available
      this.workedDates.push(this.fb.control(''));
    }
  }
  get showValidationMessage(): boolean {
    return this.isSubmitted && this.workedDates.length < this.minDatesRequired;
  }

  removeWorkedDate(index: number): void {
    // Remove the date and store it in removedDates
    const removedDate = this.workedDates.at(index).value;
    this.removedDates.push(removedDate);
    this.workedDates.removeAt(index);
  }

 // Toggle holiday dropdown
 toggleHolidayList() {
  this.isHolidayListOpen = !this.isHolidayListOpen;
}

// Load more holidays (placeholder for actual implementation)
loadMoreHolidays() {
  console.log('Load more holidays');
  
}

  
  loadHolidays(): void {
    this.leaveService.fetchHolidayDetails(this.employeeCode).subscribe(response => {
      if (response.code === 1) {
        this.holidays = response.holidayList.map((holiday: { holidayName: any; date: any; }) => ({
          name: holiday.holidayName,
          date: holiday.date
        }));
      }
    });
  }
 updateCharCount() {
  this.charCount = this.leaveForm.get('reason')?.value?.length || 0;
}

// fromDateValidator() {
//   return (control: any) => {
//     const today = new Date();
//     const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
//     const selectedDate = new Date(control.value);
//     debugger
//     if (selectedDate < lastMonth || selectedDate > today) {
//       return { invalidFromDate: true }; // Error: date not in the allowed range
//     }
//     return null; // Valid date
//   };
// }

fromDateValidator() {
  return (control: any) => {
    if (!control.value) return null; // Handle the case when no date is provided

    const today = new Date();
    const selectedDate = new Date(control.value);

    // Get the previous month (1 month before the current month)
    const oneMonthBefore = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    // Check if the selected date is earlier than 1 month before today
    if (selectedDate < oneMonthBefore) {
      return { invalidFromDate: true }; // Error: selected date is more than 1 month in the past
    }

    return null; // Valid date
  };
}



// dateRangeValidator(fromDateKey: string, toDateKey: string) {
//   return (formGroup: FormGroup) => {
//     const fromDateControl = formGroup.controls[fromDateKey];
//     const toDateControl = formGroup.controls[toDateKey];

//     if (toDateControl.errors && !toDateControl.errors['dateRangeInvalid']) {
//       // Return if another validator has already found an error on the toDateControl
//       return;
//     }

//     // Set error if To Date is less than From Date
//     if (new Date(toDateControl.value) < new Date(fromDateControl.value)) {
//       toDateControl.setErrors({ dateRangeInvalid: true });
//     } else {
//       toDateControl.setErrors(null); // Clear the error if validation passes
//     }
//   };
// }

// fromDateValidator() {
//   return (control: any) => {
//     if (!control.value) return null; // Handle the case when no date is provided

//     const today = new Date();
//     const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
//     const selectedDate = new Date(control.value);

//     // Ensure that the selected date is within the last month and today
//     if (selectedDate < lastMonth || selectedDate > today) {
//       return { invalidFromDate: true }; // Error: date not in allowed range
//     }
//     return null; // Valid date
//   };
// }

// Custom validator for checking the date range
dateRangeValidator(fromDateKey: string, toDateKey: string) {
  return (formGroup: FormGroup) => {
    const fromDateControl = formGroup.controls[fromDateKey];
    const toDateControl = formGroup.controls[toDateKey];

    if (toDateControl.errors && !toDateControl.errors['dateRangeInvalid']) {
      return;
    }

    // Validate that To Date is not earlier than From Date
    if (fromDateControl.value && toDateControl.value) {
      if (new Date(toDateControl.value) < new Date(fromDateControl.value)) {
        toDateControl.setErrors({ dateRangeInvalid: true });
      } else {
        toDateControl.setErrors(null); // Clear the error if validation passes
      }
    }
  };
}
applyLeave() {
  this.isSubmitted = true;

  // Clear previous messages
  this.successMessage = '';
  this.errorMessage = '';

  // Validate the form
  if (this.leaveForm.invalid) {
    console.log('Form is invalid:', this.leaveForm.errors); 
    return;
  }

  // Calculate the number of leave days
  const leaveTypeId = this.leaveForm.value.leaveType;
  const numberOfLeaveDays = this.calculateNumberOfDays(); // Your method to calculate the number of leave days

  console.log('Leave Type ID from Form:', leaveTypeId);
  console.log('Number of Leave Days:', numberOfLeaveDays);

   this.availableLeaveBalance = this.getLeaveBalance(leaveTypeId);
  console.log(`Available Leave Balance for ${leaveTypeId}: ${this.availableLeaveBalance}`);

  // Check leave balance
  if (numberOfLeaveDays > this.availableLeaveBalance) {
    this.errorMessage = `You are not eligible to apply ${numberOfLeaveDays} days of leave because you have only ${this.availableLeaveBalance} days available.`;
    return;
  }

  // Check if the leave type is Comp-Off
  const isCompOff = leaveTypeId === 2;

  if (isCompOff) {
    // Validate for Comp-Off leave
    const workedDates = this.leaveForm.value.workedDates || [];
    if (workedDates.length < 1) {
      this.errorMessage = 'At least one Worked Date is required for Comp-Off leave.';
      return;
    }

    if (numberOfLeaveDays > this.availableLeaveBalance) {
      this.errorMessage = `You are not eligible to apply for ${numberOfLeaveDays} days of Comp-Off leave because you have only ${this.availableLeaveBalance} days available.`;
      return;
    }

    // For example, ensure the number of worked days matches the requested leave days
    if (workedDates.length < numberOfLeaveDays) {
      this.errorMessage = `You have selected ${workedDates.length} worked days, but ${numberOfLeaveDays} days are required.`;
      return;
    }
  } else {
    // Handle validation for other leave types
    if (numberOfLeaveDays > this.availableLeaveBalance) {
      this.errorMessage = `You are not eligible to apply for ${numberOfLeaveDays} days of leave because you have only ${this.availableLeaveBalance} days available.`;
      return;
    }
  }

  // Prepare the leave request payload
  const leaveRequestPayload = {
    employeeCode: this.employeeCode, 
    leaveCategory: leaveTypeId,
    leaveSubCategory: this.leaveForm.value.leaveSubCategory || 1, 
    fromDate: this.leaveForm.value.fromDate,
    toDate: this.leaveForm.value.toDate,
    reason: this.leaveForm.value.reason,
    workedDates: isCompOff ? this.leaveForm.value.workedDates : [] // Include worked dates for Comp-Off
  };

  // Submit the leave request
  this.leaveService.applyLeave(leaveRequestPayload).subscribe({
    next: (response) => {
      this.successMessage = response.message || 'Leave applied successfully!';
      // this.leaveForm.reset();
      // this.isSubmitted = false;
      if (leaveTypeId === '2') {  
        this.leaveForm.get('workedDates')?.clearValidators();
        this.leaveForm.get('workedDates')?.updateValueAndValidity();  
    }
      this.resetForm();
    },
    error: (error) => {
      const errorMessage = error.error?.message || 'Error applying leave. Please try again later.';
      console.error('Error applying leave:', error);
      this.errorMessage = errorMessage;
    }
  });
}



fetchLeaveData(employeeCode: string): void {
  this.leaveService.fetchEmployeeLeaveDetails(employeeCode).subscribe((response: any) => {
    if (response.code === 1) {
      this.leaveHistory = response.data.leaveHistory;
      this.leaveSummary = response.data.leaveSummary;
      console.log('leaveSummary',this.leaveSummary)
      this.empContactAndEmails =response.data.empContactAndEmails;
      this.leaveApprovers = response.data.leaveApprovers;

      if (this.leaveSummary.length > 0) {
        this.balanceLeaves = this.leaveSummary[0].balanceLeaves;
      }

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
  // get showAddButton(): boolean {
  //   // Show button if there are removed dates
  //   return this.removedDates.size > 0;
  // }
  
}
