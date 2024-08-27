

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';
// import { DynamicFormService } from 'src/app/service/DynamicFormService/dynamic-form-service.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   public profileForm: FormGroup;
//   public fields: any[] = [];
//   public alertMessage: string | null = null;
//   public alertType: 'success' | 'error' | 'info' | null = null;

//   private tabID!: number;
//   private roleID!: number;
//   private token: any;

//   constructor(
//     private fb: FormBuilder,
//     public dynamicFormService: DynamicFormService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.profileForm = this.fb.group({});
//   }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.tabID = params['tabID'];
//       this.token = JSON.parse(localStorage.getItem('token') as string);
//       const decodedToken: any = jwtDecode(this.token);
//       this.roleID = decodedToken.nameid;

//       this.fetchFields();
//     });
//   }

//   fetchFields(): void {
//     this.dynamicFormService.fetchFields(this.roleID, this.tabID).subscribe({
//       next: (res: any) => {
//         if (res.code === 1) {
//           this.fields = res.fieldResponces || [];
//           this.createForm(this.fields);
//           this.fetchEmployeeDetails();
//         } else {
//           console.error('Error fetching fields:', res.message);
//         }
//       },
//       error: (err: any) => {
//         console.error('Error:', err.message);
//       }
//     });
//   }

//   createForm(fields: any[]): void {
//     const formGroup: any = {};
//     fields.forEach(field => {
//       if (field.controls !== 'BUTTON') {
//         const validators = [];
//         if (field.isMandatory) {
//           validators.push(Validators.required);
//         }
//         formGroup[field.fieldName] = [field.defaultValue || '', validators];

//         if (field.controls === 'DROPDOWNLIST') {
//           this.dynamicFormService.fetchDropdownOptions(field.fieldID, field.tabID).subscribe({
//             next: (res: any) => {
//               if (res.code === 1 && Array.isArray(res.masterList)) {
//                 field.options = res.masterList.map((item: any) => ({
//                   value: item.Code,
//                   text: item.Text
//                 }));
//               } else {
//                 console.log(`Error fetching dropdown options for fieldID ${field.fieldID}:`, res.message || 'No data available');
//               }
//             },
//             error: (err: any) => {
//               console.log(`Error fetching dropdown options for fieldID ${field.fieldID}:`, err.message);
//             }
//           });
//         }
//       }
//     });
//     this.profileForm = this.fb.group(formGroup);
//   }

//   // onSubmit(): void {
//   //   if (this.profileForm.valid) {
//   //     const formValues = this.profileForm.getRawValue();
//   //     const extraData = {
//   //       employeeID: formValues.employeeID,
//   //       employeeCode: formValues.EmployeeCode,
//   //       createdBy: formValues.EmployeeCode
//   //     };
//   //     const details = this.dynamicFormService.convertFormValuesToDetails(formValues, extraData);

//   //     this.dynamicFormService.submitForm(details, this.tabID).subscribe({
//   //       next: (response) => {
//   //         this.alertMessage = response.message;
//   //         this.alertType = 'success';
//   //         this.profileForm.disable();
//   //         this.profileForm.reset();
//   //         const nextTabID = this.getNextTabID(this.tabID);
//   //         console.log("NextTabId is -->", nextTabID);

//   //         this.router.navigate(['/contact-details'], { queryParams: { tabID: nextTabID } });
//   //       },
//   //       error: (error) => {
//   //         console.error('Error:', error);
//   //         this.alertMessage = 'Something went wrong; please try again later.';
//   //         this.alertType = 'error';
//   //       }
//   //     });
//   //   } else {
//   //     this.alertMessage = 'Please correct the errors in the form.';
//   //     this.alertType = 'error';
//   //   }
//   // }



//   onButtonClick(fieldTitle: string): void {
//     console.log('Button clicked with fieldTitle:', fieldTitle);
//     if (fieldTitle === 'Save & Next') {
//       this.onSubmit('Save & Next');
//     } else if (fieldTitle === 'Save As Draft') {
//       this.onSubmit('Save As Draft');
//     } else {
//       console.log('Unknown action:', fieldTitle);
//     }
//   }
  
  
//   onSubmit(fieldTitle: string): void {
//     // Check if the form is valid or if the action is 'Save as Draft'
//     if (this.profileForm.valid || fieldTitle === 'Save As Draft') {
//       const formValues = this.profileForm.getRawValue();
//       const extraData = {
//         employeeID: formValues.employeeID,
//         employeeCode: formValues.EmployeeCode,
//         createdBy: formValues.EmployeeCode
//       };
//       const details = this.dynamicFormService.convertFormValuesToDetails(formValues, extraData);
  
//       // Determine the recordType based on the button clicked
//       let recordType: string = fieldTitle === 'Save & Next' ? 'null' : 'Staging';
  
//       this.dynamicFormService.submitForm(details, this.tabID, recordType).subscribe({
//         next: (response: { message: string | null }) => {
//           if (fieldTitle === 'Save & Next') {
//             this.alertMessage = response.message || 'Saved successfully';
//             this.alertType = 'success';
//             this.profileForm.disable();
//             this.profileForm.reset();
//             const nextTabID = this.getNextTabID(this.tabID);
//             this.router.navigate(['/contact-details'], { queryParams: { tabID: nextTabID } });
//           } else if (fieldTitle === 'Save as Draft') {
//             this.alertMessage = 'Draft saved successfully.';
//             this.alertType = 'success';
//           }
//         },
//         error: (error: any) => {
//           console.error('Error:', error);
//           this.alertMessage = fieldTitle === 'Save & Next'
//             ? 'Something went wrong; please try again later.'
//             : 'Failed to save draft; please try again later.';
//           this.alertType = 'error';
//         }
//       });
//     } else {
//       this.alertMessage = 'Please correct the errors in the form.';
//       this.alertType = 'error';
//     }
//   }
  
  
  
//   private getNextTabID(currentTabID: number): number {
//     const totalTabs = 11;
//     const nextTabID = (currentTabID % totalTabs) + 1;
//     console.log(`Current Tab ID: ${currentTabID}, Calculated Next Tab ID: ${nextTabID}`);
//     return nextTabID;
//   }




//   fetchEmployeeDetails(): void {
//     // Assuming tabID, employeeCode, and recordType are set dynamically
//     this.dynamicFormService.fetchEmployeeDetails(this.tabID, this.employeeCode, this.recordType).subscribe({
//       next: (res: any) => {
//         if (res.code === 1) {
//           const employeeDetails = res.featchEmployeeDetailResponse;
//           this.populateFormWithEmployeeDetails(employeeDetails);
//           console.log('employeeDetails ---->', employeeDetails);
//         } else {
//           console.error('Error fetching employee details:', res.message);
//         }
//       },
//       error: (err: any) => {
//         console.error('Error:', err.message);
//       }
//     });
//   }
  
//   // fetchEmployeeDetails(): void {
//   //   // const url = `https://localhost:7254/api/UserDetails/FeatchEmployeeDetail?TabID=${this.tabID}&EmployeeCode=K-101&RecordType=null`;
//   //      const tabID = 1;
//   //      const employeeCode = 'K-101'; 
//   //       const recordType = 'Staging';
//   //       this.dynamicFormService.fetchEmployeeDetails(tabID,employeeCode,recordType ).subscribe({
//   //     next: (res: any) => {
//   //       if (res.code === 1) {
//   //         const employeeDetails = res.featchEmployeeDetailResponse;
//   //         this.populateFormWithEmployeeDetails(employeeDetails);
//   //         console.log('employeeDetails ---->', employeeDetails);
          
//   //       } else {
//   //         console.error('Error fetching employee details:', res.message);
//   //       }
//   //     },
//   //     error: (err: any) => {
//   //       console.error('Error:', err.message);
//   //     }
//   //   });
//   // }



//   populateFormWithEmployeeDetails(details: any[]): void {
//     details.forEach(detail => {
//       if (this.profileForm.controls[detail.fieldName]) {
//         this.profileForm.controls[detail.fieldName].setValue(detail.fieldValue);
//       }
//     });
//   }
  
  
// }








import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DynamicFormService } from 'src/app/service/DynamicFormService/dynamic-form-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public fields: any[] = [];
  public alertMessage: string | null = null;
  public alertType: 'success' | 'error' | 'info' | null = null;

  private tabID!: number;
  private roleID!: number;
  private token: any;
  private recordType: string | null = null;
  private employeeCode: string = '';// New property for employeeCode

  constructor(
    private fb: FormBuilder,
    public dynamicFormService: DynamicFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.profileForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tabID = params['tabID'];
      this.token = JSON.parse(localStorage.getItem('token') as string);
      const decodedToken: any = jwtDecode(this.token);
      debugger
      this.roleID = decodedToken.nameid;
      this.employeeCode = decodedToken.unique_name;

      this.fetchFields();
    });
  }

  fetchFields(): void {
    this.dynamicFormService.fetchFields(this.roleID, this.tabID).subscribe({
      next: (res: any) => {
        if (res.code === 1) {
          this.fields = res.fieldResponces || [];
          this.createForm(this.fields);
          this.fetchEmployeeDetails();  // Fetch employee details on load
        } else {
          console.error('Error fetching fields:', res.message);
        }
      },
      error: (err: any) => {
        console.error('Error:', err.message);
      }
    });
  }

  // createForm(fields: any[]): void {
  //   const formGroup: any = {};
  //   fields.forEach(field => {
  //     if (field.controls !== 'BUTTON') {
  //       const validators = [];
  //       if (field.isMandatory) {
  //         validators.push(Validators.required);
  //       }
  //       // formGroup[field.fieldName] = [field.defaultValue || '', validators];
  //       formGroup[field.fieldName] = this.fb.control({
  //         value: field.defaultValue || '',
  //         disabled: field.IsEdit === false
  //       }, validators);
  
      
  //       // formGroup[field.fieldName] = control;

  //       if (field.controls === 'DROPDOWNLIST') {
  //         this.dynamicFormService.fetchDropdownOptions(field.fieldID, field.tabID).subscribe({
  //           next: (res: any) => {
  //             if (res.code === 1 && Array.isArray(res.masterList)) {
  //               field.options = res.masterList.map((item: any) => ({
  //                 value: item.Code,
  //                 text: item.Text
  //               }));
  //             } else {
  //               console.log(`Error fetching dropdown options for fieldID ${field.fieldID}:`, res.message || 'No data available');
  //             }
  //           },
  //           error: (err: any) => {
  //             console.log(`Error fetching dropdown options for fieldID ${field.fieldID}:`, err.message);
  //           }
  //         });
  //       }
  //     }
  //   });
  //   this.profileForm = this.fb.group(formGroup);
  // }

  createForm(fields: any[]): void {
    const formGroup: any = {};
  
    // Create form controls with initial values, validators, and disabled state
    fields.forEach(field => {
      if (field.isView) { // Only create form controls for fields that should be visible
        const validators = [];
        if (field.isMandatory) {
          validators.push(Validators.required);
        }
  
        // Initialize the control with its value and disabled state
        const isDisabled = field.isEdit === false;
        formGroup[field.fieldName] = this.fb.control(
          { value: field.defaultValue || '', disabled: isDisabled }, 
          validators
        );
  
        // Fetch dropdown options if the field is a dropdown
        if (field.controls === 'DROPDOWNLIST') {
          this.dynamicFormService.fetchDropdownOptions(field.fieldID, field.tabID).subscribe({
            next: (res: any) => {
              if (res.code === 1 && Array.isArray(res.masterList)) {
                field.options = res.masterList.map((item: any) => ({
                  value: item.Code,
                  text: item.Text
                }));
              } else {
                console.log(`Error fetching dropdown options for fieldID ${field.fieldID}:`, res.message || 'No data available');
              }
            },
            error: (err: any) => {
              console.log(`Error fetching dropdown options for fieldID ${field.fieldID}:`, err.message);
            }
          });
        }
      }
    });
  
    // Create the form group
    this.profileForm = this.fb.group(formGroup);
  }
  
  

  onButtonClick(fieldTitle: string): void {
    console.log('Button clicked with fieldTitle:', fieldTitle);

    // Set recordType based on button clicked
    this.recordType = fieldTitle === 'Save & Next' ? null : 'Staging';

    if (fieldTitle === 'Save & Next') {
      this.onSubmit('Save & Next');
    } else if (fieldTitle === 'Save As Draft') {
      this.onSubmit('Save As Draft');
    } else {
      console.log('Unknown action:', fieldTitle);
    }
  }

  onSubmit(fieldTitle: string): void {
    if (this.profileForm.valid || fieldTitle === 'Save As Draft') {
      const formValues = this.profileForm.getRawValue();
      const extraData = {
        employeeID: formValues.employeeID,
        employeeCode: formValues.EmployeeCode,
        createdBy: formValues.EmployeeCode
      };
      const details = this.dynamicFormService.convertFormValuesToDetails(formValues, extraData);

      this.dynamicFormService.submitForm(details, this.tabID, this.recordType).subscribe({
        next: (response: { message: string | null }) => {
          if (fieldTitle === 'Save & Next') {
            this.alertMessage = response.message || 'Saved successfully';
            this.alertType = 'success';
            this.profileForm.disable();
            this.profileForm.reset();
            const nextTabID = this.getNextTabID(this.tabID);
            this.router.navigate(['/contact-details'], { queryParams: { tabID: nextTabID } });
          } else if (fieldTitle === 'Save As Draft') {
            this.alertMessage = 'Draft saved successfully.';
            this.alertType = 'success';
          }
        },
        error: (error: any) => {
          console.error('Error:', error);
          this.alertMessage = fieldTitle === 'Save & Next'
            ? 'Something went wrong; please try again later.'
            : 'Failed to save draft; please try again later.';
          this.alertType = 'error';
        }
      });
    } else {
      this.alertMessage = 'Please correct the errors in the form.';
      this.alertType = 'error';
    }
  }


  fetchEmployeeDetails(): void {
    // debugger
    // this.employeeCode = this.profileForm.get('EmployeeCode')?.value || '';
    // console.log('employeeCode'),this.employeeCode;
    // const recordType = fieldTitle === 'Save & Next' ? null : 'Staging';

    this.dynamicFormService.fetchEmployeeDetails(this.tabID, this.employeeCode, this.recordType)
        .subscribe({
            next: (res: any) => {
              console.log('res--->',res);
              
                if (res.code === 1) {
                  
                    const employeeDetails = res.featchEmployeeDetailResponse; // Ensure this property name matches
                    if (employeeDetails && Array.isArray(employeeDetails)) {
                        this.populateFormWithEmployeeDetails(employeeDetails);
                        console.log('Employee Details:', employeeDetails);
                    } else {
                        console.error('No employee details found or invalid format:', employeeDetails);
                    }
                } else {
                    console.error('Error fetching employee details:', res.message);
                }
            },
            error: (err: any) => {
                console.error('Error:', err.message);
            }
        });
}


private populateFormWithEmployeeDetails(employeeDetails: any[]): void {
    // Assuming profileForm is a FormGroup
    employeeDetails.forEach(detail => {
        if (detail.isApplicable) {
            const control = this.profileForm.get(detail.fieldName);
            if (control) {
                control.setValue(detail.fieldValue);
            } else {
                console.warn(`Form control for field '${detail.fieldName}' does not exist.`);
            }
        }
    });
}

  // fetchEmployeeDetails(): void {
  //   // Dynamically get employeeCode from the form or another source 
  //   this.employeeCode = this.profileForm.get('EmployeeCode')?.value || ''; 

  //   this.dynamicFormService.fetchEmployeeDetails(this.tabID, this.employeeCode, this.recordType).subscribe({
  //     next: (res: any) => {
  //       if (res.code === 1) {
  //         const employeeDetails = res.featchEmployeeDetailResponse;
  //         this.populateFormWithEmployeeDetails(employeeDetails);
  //         console.log('employeeDetails ---->', employeeDetails);
  //       } else {
  //         console.error('Error fetching employee details:', res.message);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.error('Error:', err.message);
  //     }
  //   });
  // }

  // populateFormWithEmployeeDetails(details: any[]): void {
  //   details.forEach(detail => {
  //     if (this.profileForm.controls[detail.fieldName]) {
  //       this.profileForm.controls[detail.fieldName].setValue(detail.fieldValue);
  //     }
  //   });
  // }

  private getNextTabID(currentTabID: number): number {
    const totalTabs = 11;
    const nextTabID = (currentTabID % totalTabs) + 1;
    console.log(`Current Tab ID: ${currentTabID}, Calculated Next Tab ID: ${nextTabID}`);
    return nextTabID;
  }
}

