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

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    // Initialize the form with validation rules
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
    });
  }

  // Function to apply leave
  applyLeave() {
    this.isSubmitted = true;

    if (this.leaveForm.invalid) {
      return; // Stop if form is invalid
    }

    const payload = {
      EmployeeCode: 'K-101',
      LeaveCategory: this.leaveForm.value.leaveType,
      LeaveSubCategory: 1,
      FromDate: this.leaveForm.value.fromDate,
      ToDate: this.leaveForm.value.toDate,
      Reason: this.leaveForm.value.reason,
    };

    // Call the service method
    this.leaveService.leaveApplyRequest(payload).subscribe((response) => {
      console.log(response);
      this.successMessage = response.leavesRequest[0].message;
      alert(this.successMessage); 
      this.resetForm(); 
    });
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
}
