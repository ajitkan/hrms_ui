import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DynamicFormService } from 'src/app/service/DynamicFormService/dynamic-form-service.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  // public contactForm: FormGroup;
  // public fields: any[] = [];
  // public alertMessage: string | null = null;
  // public alertType: 'success' | 'error' | 'info' | null = null;

  // private tabID!: number;
  // private roleID!: number;
  // private token: any;

  // constructor(
  //   private fb: FormBuilder,
  //   public dynamicFormService: DynamicFormService,
  //   private route: ActivatedRoute,
  //   private cdr: ChangeDetectorRef,
  //   private router : Router
  // ) {
  //   this.contactForm = this.fb.group({});
  // }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.tabID = params['tabID'];
  //     this.token = JSON.parse(localStorage.getItem('token') as string);
  //     const decodedToken: any = jwtDecode(this.token);
  //     this.roleID = decodedToken.nameid;

  //     this.fetchFields();
  //   });
  // }

  // fetchFields(): void {
  //   this.dynamicFormService.fetchFields(this.roleID, this.tabID).subscribe({
  //     next: (res: any) => {
  //       if (res.code === 1) {
  //         this.fields = res.fieldResponces || [];
  //         this.createForm(this.fields);
  //       } else {
  //         console.error('Error fetching fields:', res.message);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.error('Error:', err.message);
  //     }
  //   });
  // }


  // // createForm(fields: any[]): void {
  // //   const formGroup: any = {};
  
  // //   fields.forEach(field => {
  // //     if (field.controls !== 'BUTTON') {
  // //       const validators = [];
  // //       if (field.isMandatory) {
  // //         validators.push(Validators.required);
  // //       }
  // //       formGroup[field.fieldName] = [field.defaultValue || '', validators];
  // //     }
  // //   });
  
  // //   this.contactForm = this.fb.group(formGroup);
  
  // //   fields.forEach(field => {
  // //     if (field.controls === 'DROPDOWNLIST') {
  // //       this.dynamicFormService.fetchDropdownOptions(field.fieldID, field.tabID).subscribe({
  // //         next: (res: any) => {
  // //           console.log(`Response for fieldID ${field.fieldID}:`, res);
  // //           if (res.code === 1 && Array.isArray(res.masterList)) {
  // //             field.options = res.masterList.map((item: any) => ({
  // //               value: item.Code,
  // //               text: item.Text
  // //             }));
  // //             console.log(`Dropdown options for fieldID ${field.fieldID}:`, field.options);
  // //             // this.contactForm.get(field.fieldName)?.updateValueAndValidity();
  // //           } else {
  // //             console.warn(`No dropdown options available for fieldID ${field.fieldID}`);
  // //           }
  // //         },
  // //         error: (err: any) => {
  // //           console.error(`Error fetching dropdown options for fieldID ${field.fieldID}:`, err);
  // //         }
  // //       });
  // //     }
  // //   });
  // // }
  

  // createForm(fields: any[]): void {
  //   const formGroup: any = {};
  
  //   // Initialize form controls based on field configurations
  //   fields.forEach(field => {
  //     if (field.controls !== 'BUTTON') {
  //       const validators = [];
  //       if (field.isMandatory) {
  //         validators.push(Validators.required);
  //       }
  //       formGroup[field.fieldName] = [field.defaultValue || '', validators];
  //     }
  //   });
  
  //   // Create the form group
  //   this.contactForm = this.fb.group(formGroup);
  
  //   // Fetch and set dropdown options
  //   fields.forEach(field => {
  //     if (field.controls === 'DROPDOWNLIST') {
  //       this.dynamicFormService.fetchDropdownOptions(field.fieldID, field.tabID).subscribe({
  //         next: (res: any) => {
  //           console.log(`Response for fieldID ${field.fieldID}:`, res);
  //           if (res.code === 1 && Array.isArray(res.masterList)) {
  //             field.options = res.masterList.map((item: any) => ({
  //               value: item.Code,
  //               text: item.Text
  //             }));
  //             console.log(`Dropdown options for fieldID ${field.fieldID}:`, field.options);
              
  //             // Update form control options (if needed)
  //             const control = this.contactForm.get(field.fieldName);
  //             if (control) {
  //               control.updateValueAndValidity();
  //             }
  //           } else {
  //             console.warn(`No dropdown options available for fieldID ${field.fieldID}`);
  //           }
  //         },
  //         error: (err: any) => {
  //           console.error(`Error fetching dropdown options for fieldID ${field.fieldID}:`, err);
  //         }
  //       });
  //     }
  //   });
  // }
  

  // // onSubmit(): void {
  // //   if (this.contactForm.valid) {
  // //     const formValues = this.contactForm.getRawValue();
  // //     const extraData = {
  // //       employeeID: formValues.employeeID,
  // //       employeeCode: formValues.EmployeeCode,
  // //       createdBy: formValues.EmployeeCode
  // //     };
  // //     const details = this.dynamicFormService.convertFormValuesToDetails(formValues, extraData);

  // //     this.dynamicFormService.submitForm(details, this.tabID).subscribe({
  // //       next: (response) => {
  // //         this.alertMessage = response.message;
  // //         this.alertType = 'success';
  // //         // this.contactForm.disable();
  // //         // this.contactForm.reset();
  // //         const nextTabID = this.getNextTabID(this.tabID);
  // //         console.log("NextTabId is -->" , nextTabID);
          

  // //         this.router.navigate(['/bank-details'], { queryParams: { tabID: nextTabID } });
        
  // //       },
  // //       error: (error) => {
  // //         console.error('Error:', error);
  // //         this.alertMessage = 'Something went wrong; please try again later.';
  // //         this.alertType = 'error';
  // //       }
  // //     });
  // //   } else {
  // //     this.alertMessage = 'Please correct the errors in the form.';
  // //     this.alertType = 'error';
  // //   }
  // // }

  // private getNextTabID(currentTabID: number): number {
  //   const totalTabs = 11; 
  //   const nextTabID = (currentTabID % totalTabs) + 1; 
  //   console.log(`Current Tab ID: ${currentTabID}, Calculated Next Tab ID: ${nextTabID}`);
  //   return nextTabID;
  // }





  public contactForm!: FormGroup;
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
    this.contactForm = this.fb.group({});
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
          this.fetchEmployeeDetails();  
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
  //       formGroup[field.fieldName] = [field.defaultValue || '', validators];

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
  //   this.contactForm = this.fb.group(formGroup);
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
        
        if (field.fieldDataType =='TEXT') {
          validators.push(Validators.minLength(field.minLength));
          validators.push(this.dynamicFormService.textOnlyValidator());
         }

        if(field.fieldDataType =='EMAIL'){
          //if (field.fieldDataType =='TEXT') {
            validators.push(Validators.email);
        }

        if (field.fieldDataType === 'NUMBER') {
          validators.push(Validators.minLength(field.minLength));
          validators.push(this.dynamicFormService.numberOnlyValidator()); // Apply the number-only validator here
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
    this.contactForm = this.fb.group(formGroup);
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
    if (this.contactForm.valid || fieldTitle === 'Save As Draft') {
       const formValues = this.contactForm.getRawValue();
      const extraData = {
        employeeID: formValues.employeeID,
        employeeCode: this.employeeCode,
        createdBy: this.employeeCode
      };
      // const formValues = this.employeeCode
      const details = this.dynamicFormService.convertFormValuesToDetails(formValues, extraData);

      this.dynamicFormService.submitForm(details, this.tabID, this.recordType).subscribe({
        next: (response: { message: string | null }) => {
          if (fieldTitle === 'Save & Next') {
            this.alertMessage = response.message || 'Saved successfully';
            this.alertType = 'success';
            this.contactForm.disable();
            this.contactForm.reset();
            const nextTabID = this.getNextTabID(this.tabID);
            this.router.navigate(['/bank-details'], { queryParams: { tabID: nextTabID } });
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
            const control = this.contactForm.get(detail.fieldName);
            if (control) {
                control.setValue(detail.fieldValue);
            } else {
                console.warn(`Form control for field '${detail.fieldName}' does not exist.`);
            }
        }
    });
}



  private getNextTabID(currentTabID: number): number {
    const totalTabs = 11;
    const nextTabID = (currentTabID % totalTabs) + 1;
    console.log(`Current Tab ID: ${currentTabID}, Calculated Next Tab ID: ${nextTabID}`);
    return nextTabID;
  }
}



