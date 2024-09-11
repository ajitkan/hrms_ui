import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DynamicFormService } from 'src/app/service/DynamicFormService/dynamic-form-service.service';
import { Location } from '@angular/common';
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
  private Roles:any;
  private recordType: string | null = null;
  private employeeCode: string = '';// New property for employeeCode
  showform=false;
  employeeDetails:any;
  educationList: any;

  constructor(
    private fb: FormBuilder,
    public dynamicFormService: DynamicFormService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.profileForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tabID = params['tabID'];
      this.token = JSON.parse(localStorage.getItem('token') as string);
      this.Roles = JSON.parse(localStorage.getItem('roles') as string);
      this.roleID = this.Roles.roleID;
      const decodedToken: any = jwtDecode(this.token);
      // debugger
      // this.roleID = decodedToken.nameid;
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

  onTitleChange(field:any) {
    console.log("field",field)
    this.dynamicFormService.onDropDownChange(this.profileForm,field);
  }

  createForm(fields: any[]): void {
    const formGroup: any = {};
  
    // Create form controls with initial values, validators, and disabled state
    fields.forEach(field => {
      if (field.isView && field.controls !== 'BUTTON')  { // Only create form controls for fields that should be visible
        const validators = [];
        if (field.isMandatory) {
          validators.push(Validators.required);
        }
        if (field.fieldDataType =='TEXT' ) {
          // validators.push(Validators.required);
          // debugger;
          // validators.push(Validators.email);//Validators.pattern("^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$")])
          validators.push(Validators.minLength(field.minLength));
          validators.push(Validators.maxLength(field.maxLength));
          // validators.push(this.dynamicFormService.textOnlyValidator());
          console.log("length of field",field.minLength);
          // alert(field.maxLength);
        }

        
        // Initialize the control with its value and disabled state
        const isDisabled = field.isEdit === false;
        formGroup[field.fieldName] = this.fb.control(
          { value: field.defaultValue || ''}, //disabled: isDisabled },
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
  
    if (fieldTitle === 'Save & Next' || fieldTitle === 'Save As Draft' || fieldTitle === 'Back') {
      this.onSubmit(fieldTitle);
    } else {
      console.log('Unknown action:', fieldTitle);
    }
  }
  
  onSubmit(fieldTitle: string): void {
    console.log('Form Valid:', this.profileForm.valid);
    console.log('Form Errors:', this.profileForm.errors);
  
    if (this.profileForm.valid || fieldTitle === 'Save As Draft') {
      const formValues = this.profileForm.getRawValue();
      const extraData = {
        employeeID: formValues.employeeID,
        employeeCode: this.employeeCode,
        createdBy: this.employeeCode
      };
      const details = this.dynamicFormService.convertFormValuesToDetails(formValues, extraData);
  
      this.dynamicFormService.submitForm(details, this.tabID, this.recordType).subscribe({
        next: (response: { message: string | null }) => {
          if (fieldTitle === 'Save & Next') {
            this.alertMessage = response.message || 'Saved successfully';
            this.alertType = 'success';
            this.profileForm.disable();
            this.profileForm.reset(); // This could potentially affect the form validity
            const nextTabID = this.getNextTabID(this.tabID);
            this.router.navigate(['/bank-details'], { queryParams: { tabID: nextTabID } });
          } else if (fieldTitle === 'Save As Draft') {
            this.alertMessage = 'Draft saved successfully.';
            this.alertType = 'success';
          } else if (fieldTitle === 'Back') {
            this.alertMessage = 'Navigating to dashboard.';
            this.alertType = 'success';
            // this.router.navigate(['/home']);
            this.location.back();
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
  
//   fetchEmployeeDetails(): void {
//     this.dynamicFormService.fetchEmployeeDetails(this.tabID, this.employeeCode, this.recordType)
//         .subscribe({
//             next: (res: any) => {
//               console.log('res--->',res);
              
//                 if (res.code === 1) {
                  
//                     const employeeDetails = res.featchEmployeeDetailResponse; // Ensure this property name matches
//                     if (employeeDetails && Array.isArray(employeeDetails)) {
//                         this.populateFormWithEmployeeDetails(employeeDetails);
//                         console.log('Employee Details:', employeeDetails);
//                     } else {
//                         console.error('No employee details found or invalid format:', employeeDetails);
//                     }
//                 } else {
//                     console.error('Error fetching employee details:', res.message);
//                 }
//             },
//             error: (err: any) => {
//                 console.error('Error:', err.message);
//             }
//         });
// }

// private populateFormWithEmployeeDetails(employeeDetails: any[]): void {
//     // Assuming profileForm is a FormGroup
//     employeeDetails.forEach(detail => {
//         if (detail.isApplicable) {
//           debugger;
//             const control = this.profileForm.get(detail.fieldName);
//             if (control) {
//               if(detail.fieldName === 'title'){
//                 control.setValue(detail.fieldValue);
//                 this.dynamicFormService.onDropDownChange(this.profileForm,detail);
//               }
//               control.setValue(detail.fieldValue);
//             } else {
//                 console.warn(`Form control for field '${detail.fieldName}' does not exist.`);
//             }
//         }
//     });
// }

fetchEmployeeDetails(): void {
  this.dynamicFormService.fetchEmployeeDetails(this.tabID, this.employeeCode, this.recordType)
      .subscribe({
          next: (res: any) => {
              console.log('res--->', res);

              if (res.code === 1) {
                  const employeeDetailsArray = res.featchEmployeeDetailResponse;
                  if (employeeDetailsArray && Array.isArray(employeeDetailsArray) && employeeDetailsArray.length > 0) {
                      // const employeeDetails = employeeDetailsArray[0].dynamicData;
                      this.educationList = res.featchEmployeeDetailResponse;
                      this.employeeDetails = this.dynamicFormService.BindMasterValue(this.fields,res,this.tabID);
                      if (this.employeeDetails) {
                          // this.populateFormWithEmployeeDetails(this.employeeDetails);
                          this.showform = false;
                          console.log('Employee Details:', this.employeeDetails);
                      } else {
                          console.error('No employee details found or invalid format:', this.employeeDetails);
                      }
                  } else {
                      console.error('No employee details found or invalid format:', employeeDetailsArray);
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



private populateFormWithEmployeeDetails(employeeDetails: any, educationList?:any): void {
  // Assuming employeeDetails is an object with key-value pairs
  debugger
  Object.keys(employeeDetails.dynamicData).forEach(fieldName => {
    if(fieldName=='Code' || fieldName=='EmpID'|| fieldName=='EMPCode'){
      console.log(fieldName+" is not a formcontrol");
    }
    else{
      const control = this.profileForm.get(fieldName);
      if (control) {
          if (fieldName === 'title') {
              control.setValue(employeeDetails.dynamicData[fieldName]);
              this.dynamicFormService.onDropDownChange(this.profileForm, { fieldName, fieldValue: employeeDetails.dynamicData[fieldName] });
          } else {
              control.setValue(employeeDetails.dynamicData[fieldName]);
          }
      } else {
          console.warn(`Form control for field '${fieldName}' does not exist.`);
      }
    }
  });
  console.log("SetValue of Form is",this.profileForm);
}



private getNextTabID(currentTabID: number): number {
    const totalTabs = 11;
    const nextTabID = (currentTabID % totalTabs) + 1;
    console.log(`Current Tab ID: ${currentTabID}, Calculated Next Tab ID: ${nextTabID}`);
    return nextTabID;
  }

  EditEducation(profile:any,index:any){
    this.showform = true;
     this.populateFormWithEmployeeDetails(profile,this.educationList);
  }
  showForm(){
    this.showform = !this.showform;
  }




}



// import { ChangeDetectorRef, Component } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';
// import { DynamicFormService } from 'src/app/service/DynamicFormService/dynamic-form-service.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileDetailsComponent {

//   public profileForm!: FormGroup;
//   public fields: any[] = [];
//   public alertMessage: string | null = null;
//   public alertType: 'success' | 'error' | 'info' | null = null;

//   private tabID!: number;
//   private roleID!: number;
//   private token: any;
//   private recordType: string | null = null;
//   private employeeCode: string = ''; // Property for employeeCode
//   showform = false;
//   employeeDetails: any;

//   constructor(
//     private fb: FormBuilder,
//     public dynamicFormService: DynamicFormService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private cdr: ChangeDetectorRef
//   ) {
//     this.profileForm = this.fb.group({});
//   }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.tabID = params['tabID'];
//       this.token = JSON.parse(localStorage.getItem('token') as string);
//       const decodedToken: any = jwtDecode(this.token);
//       this.roleID = decodedToken.nameid;
//       this.employeeCode = decodedToken.unique_name;

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
//       if (field.isView && field.controls !== 'BUTTON') {
//         const validators = [];
//         if (field.isMandatory) {
//           validators.push(Validators.required);
//         }

//         if (field.fieldDataType === 'TEXT') {
//           validators.push(Validators.minLength(field.minLength));
//           if (field.maxLength != null) {
//             validators.push(Validators.maxLength(field.maxLength));
//           }
//           validators.push(this.dynamicFormService.textOnlyValidator());
//         }

//         const isDisabled = field.isEdit === false;
//         formGroup[field.fieldName] = this.fb.control(
//           { value: field.defaultValue || '', disabled: isDisabled },
//           validators
//         );

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

//   onButtonClick(fieldTitle: string): void {
//     this.recordType = fieldTitle === 'Save & Next' ? null : 'Staging';

//     if (fieldTitle === 'Save & Next') {
//       this.onSubmit('Save & Next');
//     } else if (fieldTitle === 'Save As Draft') {
//       this.onSubmit('Save As Draft');
//     } else {
//       console.log('Unknown action:', fieldTitle);
//     }
//   }

//   onSubmit(fieldTitle: string): void {
//     if (this.profileForm.valid || fieldTitle === 'Save As Draft') {
//       const formValues = this.profileForm.getRawValue();
//       const extraData = {
//         employeeID: formValues.employeeID,
//         employeeCode: this.employeeCode,
//         createdBy: this.employeeCode
//       };
//       const details = this.dynamicFormService.convertFormValuesToDetails(formValues, extraData);

//       this.dynamicFormService.submitForm(details, this.tabID, this.recordType).subscribe({
//         next: (response: { message: string | null }) => {
//           if (fieldTitle === 'Save & Next') {
//             this.alertMessage = response.message || 'Saved successfully';
//             this.alertType = 'success';
//             const nextTabID = this.getNextTabID(this.tabID);
//             this.router.navigate(['/contact-details'], { queryParams: { tabID: nextTabID } });
//           } else if (fieldTitle === 'Save As Draft') {
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

//   fetchEmployeeDetails(): void {
//     this.dynamicFormService.fetchEmployeeDetails(this.tabID, this.employeeCode, this.recordType)
//       .subscribe({
//         next: (res: any) => {
//           if (res.code === 1) {
//             this.employeeDetails = this.dynamicFormService.BindMasterValue(res, this.tabID);
//             if (this.employeeDetails) {
//               this.populateFormWithEmployeeDetails(this.employeeDetails);
//               this.showform = false;
//             } else {
//               console.error('No employee details found or invalid format:', this.employeeDetails);
//             }
//           } else {
//             console.error('Error fetching employee details:', res.message);
//           }
//         },
//         error: (err: any) => {
//           console.error('Error:', err.message);
//         }
//       });
//   }

//   private populateFormWithEmployeeDetails(employeeDetails: any): void {
//     Object.keys(employeeDetails.dynamicData).forEach(fieldName => {
//       if (fieldName !== 'Code' && fieldName !== 'EmpID' && fieldName !== 'EMPCode') {
//         const control = this.profileForm.get(fieldName);
//         if (control) {
//           control.setValue(employeeDetails.dynamicData[fieldName]);
//         } else {
//           console.warn(`Form control for field '${fieldName}' does not exist.`);
//         }
//       }
//     });
//   }

//   private getNextTabID(currentTabID: number): number {
//     const totalTabs = 11;
//     const nextTabID = (currentTabID % totalTabs) + 1;
//     return nextTabID;
//   }

//   showForm() {
//     this.showform = !this.showform;
//   }
// }
