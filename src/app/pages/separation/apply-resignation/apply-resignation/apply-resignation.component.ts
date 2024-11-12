// import { formatDate } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';
// import { SeparationService } from 'src/app/service/SeparationService/separation.service';

// @Component({
//   selector: 'app-apply-resignation',
//   templateUrl: './apply-resignation.component.html',
//   styleUrls: ['./apply-resignation.component.css']
// })
// export class ApplyResignationComponent {


//   onDateChange(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;  // Cast the event target to HTMLInputElement
//     const dateString = inputElement?.value;  // Access the value of the input field

//     if (dateString) {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-based
//       const year = date.getFullYear();

//       const formattedDate = `${day}/${month}/${year}`;  // Format as dd/mm/yyyy
//       this.resignationForm.get('lastWorkingDay')?.setValue(formattedDate);  // Update the form control with the formatted date
//     }
//   }

//   resignationForm: FormGroup;
//   employeeName = 'Umesh Solanke'; // Set this based on your context
//   today: Date = new Date();
//   exitReasons: string[] = []; // Populate this with your reasons
//   approverList: any[] = []; // Populate this with your approver data
//   successMessage: string = '';
//   errorMessage: string = '';
//   employeeCode: string = '';
//   token: any;
//   resignationData:any;
//   constructor(private fb: FormBuilder,
//     private router: Router,
//     private resignationService: SeparationService) {

//      // Access the passed resignation data via the router state
//      const navigation = this.router.getCurrentNavigation();
//      this.resignationData = navigation?.extras.state?.['data'];

//     // this.resignationForm = this.fb.group({
//     //   exitReason: ['', Validators.required],
//     //   noticePeriod: ['', [Validators.required, Validators.min(1)]],
//     //   lastWorkingDay: ['', Validators.required],
//     //   shortNotice: ['']
//     // });
//      // Initialize the form and populate it with resignation data if available
//      this.resignationForm = this.fb.group({
//       fullName: [this.resignationData?.fullName || ''],
//       resignationDate: [this.resignationData?.resignationDate || ''],
//       lastWorkingDay: [this.resignationData?.lastWorkingDay || ''],
//       resignationReason: [this.resignationData?.resignationReason || ''],
//       status: [this.resignationData?.status || '']
//     });
//   }

//   ngOnInit() {

//     this.token = JSON.parse(localStorage.getItem('token') as string);
//     const decodedToken: any = jwtDecode(this.token);
//     this.employeeCode = decodedToken.unique_name;
//     this.fetchResignationDetails(this.employeeCode); // Pass the employee code here
//   }

//   fetchResignationDetails(employeeCode: string) {
//     this.resignationService.getResignationDetails(employeeCode).subscribe(
//       response => {
//         if (response.code === 1) {
//           const details = response.resignationDetails;


//           // Patch form values
//           this.resignationForm.patchValue({
//             exitReason: details.resignationReason.split(',').map((reason: string) => reason.trim()), // Split if needed
//             // exitReason: details.resignationReason,
//             noticePeriod: details.noticePeriod,
//             lastWorkingDay: new Date(details.lastWorkingDay).toISOString().substring(0, 10), // Format to YYYY-MM-DD for date input
//             shortNotice: '' // Set this as needed or keep it empty
//           });

//           // Populate approver list
//           this.approverList = details.approverList.split(',').map((item: string) => {
//             const [code, name] = item.split('-');
//             return { approverCode: code.trim(), approverName: name.trim() };
//           });

       

//           // Populate exit reasons if available
//           this.exitReasons = details.resignationReason.split(',').map((reason: any) => reason.trim());
//         } else {
//           console.error('Failed to fetch resignation details:', response.message);
//         }
//       },
//       (error: any) => {
//         console.error('Error fetching resignation details:', error);
//       }
//     );
//   }

 


//   onSubmit() {
//     if (this.resignationForm.valid) {
//       const payload = {
//         // EmployeeID: this.employeeID,
//         // EmployeeCode: this.employeeCode,
//         EmployeeID: 1,
//         EmployeeCode: this.employeeCode,
//         ResignationReason: this.resignationForm.get('exitReason')?.value,
//         ResignRemark: this.resignationForm.get('shortNotice')?.value,
//         ResignationDate: this.today, // Use today's date
//         NoticePeriod: this.resignationForm.get('noticePeriod')?.value,
//         LastWorkingDay: formatDate(this.resignationForm.get('lastWorkingDay')?.value, 'yyyy-MM-dd', 'en-US')
//       };

//       // Call the SeparationService to apply resignation
//       this.resignationService.applyResignation(payload)
//         .subscribe(
//           (response:any) => {
//             console.log('Resignation applied successfully', response);
//             this.successMessage = response.message || 'Resignation applied successfully!';
//             // Handle success message or UI update here
//           },
//          (error:any)  => {
//             // console.error('Error applying resignation', error);
//             //  this.errorMessage = error.message || 'Resignation applied Failed!';
//              const errorMessage = error.error?.message || 'Error applying resignation. Please try again later.';
//             console.error('Error applying resignation:', error);
//            this.errorMessage = errorMessage;
//           }
//         );
//     } else {
//       console.error('Form is invalid');
//     }

//   }
//   resetForm() {
//     this.resignationForm.reset();
//   }
// }




import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SeparationService } from 'src/app/service/SeparationService/separation.service';

@Component({
  selector: 'app-apply-resignation',
  templateUrl: './apply-resignation.component.html',
  styleUrls: ['./apply-resignation.component.css']
})
export class ApplyResignationComponent {
  resignationForm: FormGroup;
  employeeName: string = 'Umesh Solanke';
  today: Date = new Date();
  exitReasons: string[] = [];
  approverList: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  employeeCode: string = '';
  token: any;
  resignationData: any;
  isApproved: boolean = false;
  isRejected: boolean = false;
  isRevoked: boolean = false;
  roleid :any ;
  requestId = '1';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resignationService: SeparationService
  ) {
    this.resignationForm = this.fb.group({
      exitReason: ['', Validators.required],
      noticePeriod: ['', [Validators.required, Validators.min(1)]],
      lastWorkingDay: ['', Validators.required],
      shortNotice: ['']
    });
  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('token') as string);

    const decodedToken: any = jwtDecode(this.token);
    debugger
    this.employeeCode = decodedToken.unique_name;
     this.roleid = decodedToken.nameid;

    const navigation = this.router.getCurrentNavigation();
    this.resignationData = navigation?.extras.state?.['data'];

    if (this.resignationData) {
      this.populateFormForEdit(this.resignationData);
    }

    this.fetchResignationDetails(this.employeeCode);
  }

  private populateFormForEdit(details: any) {
    this.resignationForm.patchValue({
      exitReason: details.resignationReason?.split(',').map((reason: string) => reason.trim()) || [],
      noticePeriod: details.noticePeriod,
      lastWorkingDay: formatDate(new Date(details.lastWorkingDay), 'yyyy-MM-dd', 'en-US'),
      shortNotice: details.shortNotice || ''
    });

    this.isApproved = details.isApproved || false;
    this.isRejected = details.isRejected || false;
    this.isRevoked = details.isRevoked || false;
  }

  fetchResignationDetails(employeeCode: string) {
    this.resignationService.getResignationDetails(employeeCode).subscribe(
      response => {
        if (response.code === 1) {
          const details = response.resignationDetails;

          this.resignationForm.patchValue({
            exitReason: details.resignationReason?.split(',').map((reason: string) => reason.trim()) || [],
            noticePeriod: details.noticePeriod,
            lastWorkingDay: formatDate(new Date(details.lastWorkingDay), 'yyyy-MM-dd', 'en-US'),
            shortNotice: ''
          });

          this.approverList = details.approverList.split(',').map((item: string) => {
            const [code, name] = item.split('-');
            return { approverCode: code.trim(), approverName: name.trim() };
          });

          this.exitReasons = details.resignationReason?.split(',').map((reason: string) => reason.trim()) || [];
        } else {
          console.error('Failed to fetch resignation details:', response.message);
        }
      },
      (error: any) => {
        console.error('Error fetching resignation details:', error);
      }
    );
  }

  // onSubmit() {
  //   if (this.resignationForm.valid) {
  //     const payload = {
  //       EmployeeID: 1,
  //       EmployeeCode: this.employeeCode,
  //       ResignationReason: this.resignationForm.get('exitReason')?.value.join(', '),
  //       ResignRemark: this.resignationForm.get('shortNotice')?.value,
  //       ResignationDate: this.today.toISOString(),
  //       NoticePeriod: this.resignationForm.get('noticePeriod')?.value,
  //       LastWorkingDay: formatDate(this.resignationForm.get('lastWorkingDay')?.value, 'yyyy-MM-dd', 'en-US')
  //     };

  //     this.resignationService.applyResignation(payload).subscribe(
  //       (response: any) => {
  //         console.log('Resignation applied successfully', response);
  //         this.successMessage = response.message || 'Resignation applied successfully!';
  //       },
  //       (error: any) => {
  //         const errorMessage = error.error?.message || 'Error applying resignation. Please try again later.';
  //         this.errorMessage = errorMessage;
  //       }
  //     );
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }

  onSubmit() {
    if (this.resignationForm.valid) {
      const payload = {
        // EmployeeID: this.employeeID,
        // EmployeeCode: this.employeeCode,
        EmployeeID: 1,
        EmployeeCode: this.employeeCode,
        ResignationReason: this.resignationForm.get('exitReason')?.value,
        ResignRemark: this.resignationForm.get('shortNotice')?.value,
        ResignationDate: this.today, // Use today's date
        NoticePeriod: this.resignationForm.get('noticePeriod')?.value,
        LastWorkingDay: formatDate(this.resignationForm.get('lastWorkingDay')?.value, 'yyyy-MM-dd', 'en-US')
      };

      // Call the SeparationService to apply resignation
      this.resignationService.applyResignation(payload)
        .subscribe(
          (response:any) => {
            console.log('Resignation applied successfully', response);
            this.successMessage = response.message || 'Resignation applied successfully!';
            // Handle success message or UI update here
          },
         (error:any)  => {
            // console.error('Error applying resignation', error);
            //  this.errorMessage = error.message || 'Resignation applied Failed!';
             const errorMessage = error.error?.message || 'Error applying resignation. Please try again later.';
            console.error('Error applying resignation:', error);
           this.errorMessage = errorMessage;
          }
        );
    } else {
      console.error('Form is invalid');
    }

  }
  resetForm() {
    this.resignationForm.reset();
  }




  revokeResignation(statusId: any) {
    // const statusId = 'Revoked'; // Update with appropriate status ID

    this.resignationService.approveOrRejectResignation(this.employeeCode, this.requestId, statusId).subscribe(
      (response: any) => {
        console.log('Resignation revoked successfully', response);
        this.isRevoked = true;
        this.successMessage = response.message || 'Resignation revoked successfully!';
      },
      (error: any) => {
        const errorMessage = error.error?.message || 'Error revoking resignation. Please try again later.';
        this.errorMessage = errorMessage;
      }
    );
  }

  approveResignation(requestId: any) {
    const statusId = 'Approved';

    this.resignationService.approveOrRejectResignation(this.employeeCode, this.requestId, statusId).subscribe(
      (response: any) => {
        console.log('Resignation approved successfully', response);
        this.isApproved = true;
        this.successMessage = response.message || 'Resignation approved successfully!';
      },
      (error: any) => {
        const errorMessage = error.error?.message || 'Error approving resignation. Please try again later.';
        this.errorMessage = errorMessage;
      }
    );
  }

  rejectResignation(statusId: any) {
    // const statusId = 'Reject';

    this.resignationService.approveOrRejectResignation(this.employeeCode, this.requestId, statusId).subscribe(
      (response: any) => {
        console.log('Resignation rejected successfully', response);
        this.isRejected = true;
        this.successMessage = response.message || 'Resignation rejected successfully!';
        this.router.navigate(['approve-resignation'])
      },
      (error: any) => {
        const errorMessage = error.error?.message || 'Error rejecting resignation. Please try again later.';
        this.errorMessage = errorMessage;
      }
    );
  }
}
