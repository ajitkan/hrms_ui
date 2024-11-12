import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DynamicFormService } from 'src/app/service/DynamicFormService/dynamic-form-service.service';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent {


  public educationForm!: FormGroup<any>;
 
  // public bankdetailsForm!: FormGroup;
 
  public fields: any[] = [];
  public alertMessage: string | null = null;
  public alertType: 'success' | 'error' | 'info' | null = null;

  private tabID!: number;
  private roleID!: number;
  private token: any;
  private recordType: string | null = null;
  private employeeCode: string = '';// New property for employeeCode
  showform=true;
  employeeDetails:any;
  educationList: any;
//   {
//     "code": 1,
//     "status": "Success",
//     "message": "Data fetched successfully",
//     "featchEmployeeDetailResponse": [
//         {
//             "dynamicData": {
//                 "Code": "1",
//                 "EmpID": null,
//                 "EMPCode": "K-101",
//                 "College": "1",
//                 "CourseTitle": "2",
//                 "CourseType": "1",
//                 "FromDate": "2024-08-30",
//                 "Percetage": "100",
//                 "Specialization": "1",
//                 "ToDate": "2024-08-30",
//                 "University": "3"
//             }
//         }
//     ]
// }
  constructor(
    private fb: FormBuilder,
    public dynamicFormService: DynamicFormService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.educationForm = this.fb.group({});
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tabID = params['tabID'];
      this.token = JSON.parse(localStorage.getItem('token') as string);
      const decodedToken: any = jwtDecode(this.token);
      debugger
      this.roleID = (JSON.parse(localStorage.getItem('roles') as string)).roleID;//decodedToken.nameid;
      this.employeeCode = decodedToken.unique_name;

      this.fetchFields();
      // console.log('Form controls:', this.form.controls);
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



  createForm(fields: any[]): void {
    const formGroup: any = {};
  
    // Create form controls with initial values, validators, and disabled state
    fields.forEach(field => {
      if (field.isView && field.controls !== 'BUTTON')  { // Only create form controls for fields that should be visible
        const validators = [];
        if (field.isMandatory) {
          validators.push(Validators.required);
        }
        if (field.fieldDataType === 'DATE') {
          // Initialize date range validator if both fromDate and toDate exist
          //this.educationForm.setValidators(this.dateRangeValidator('FromDate', 'ToDate'));
          validators.push(this.dateRangeValidator());
        }
       
        if (field.fieldDataType =='TEXT' ) {
          // validators.push(Validators.required);
          // debugger;
          // validators.push(Validators.email);//Validators.pattern("^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$")])
          if(field.minLength!=null){
            validators.push(Validators.minLength(field.minLength));
          }
          if(field.maxLength != null){
          validators.push(Validators.maxLength(field.maxLength));
          }
          validators.push(this.dynamicFormService.textOnlyValidator());
          console.log("length of field",field.minLength);
          // alert(field.maxLength);}
        }

        
        // Initialize the control with its value and disabled state
        const isDisabled = field.isEdit === false;
        formGroup[field.fieldName] = this.fb.control(
          { value: field.defaultValue || ''},//, disabled: isDisabled }, 
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
    this.educationForm = this.fb.group(formGroup);
  }

    // Custom Validator Function for Date Range
    dateRangeValidator(){//(fromDateKey: string, toDateKey: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        debugger;
        const fromDate = this.educationForm.controls['FromDate']?.value;
        const toDate = this.educationForm.controls['ToDate']?.value;
  
        if (fromDate && toDate && fromDate === toDate) {
          // !isValid ? { 'numberOnly': { value: control.value } } : null;
          return { 'dateRangeInvalid': { value: control.value } };//{ dateRangeInvalid: true };
        }
        return null;
      };
    }
  onButtonClick(educationForm:FormGroup,fieldTitle: string): void {
    console.log('Button clicked with fieldTitle:', fieldTitle);

    // Set recordType based on button clicked
    this.recordType = fieldTitle === 'Save & Next' ? null : 'Staging';

    if (fieldTitle === 'Save & Next') {
      this.onSubmit(educationForm,'Save & Next');
    } else if (fieldTitle === 'Save As Draft') {
      this.onSubmit(educationForm,'Save As Draft');
    } else {
      console.log('Unknown action:', fieldTitle);
    }
  }

  onSubmit(educationForm:FormGroup,fieldTitle: string): void {
    if (educationForm.valid || fieldTitle === 'Save As Draft') {
      const formValues = this.educationForm.getRawValue();
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
            // this.contactForm.disable();
            // this.contactForm.reset();
            const nextTabID = this.getNextTabID(this.tabID);
            this.router.navigate(['/experience-details'], { queryParams: { tabID: nextTabID } });
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
    debugger
    this.dynamicFormService.fetchEmployeeDetails(this.tabID, this.employeeCode, this.recordType)
        .subscribe({
            next: (res: any) => {
                console.log('res--->', res);
  
                if (res.code === 1) {
                    const employeeDetailsArray = res.featchEmployeeDetailResponse;
                    if (employeeDetailsArray && Array.isArray(employeeDetailsArray) && employeeDetailsArray.length > 0) {
                        //  this.employeeDetails = employeeDetailsArray[0].dynamicData;
                        this.educationList = res.featchEmployeeDetailResponse.dynamicData;
                        this.employeeDetails = this.dynamicFormService.BindMasterValue(this.fields,res,this.tabID);
                        if (this.employeeDetails) {
                             this.populateFormWithEmployeeDetails(employeeDetailsArray);
                            this.showform = false;
                            console.log('Employee Details:', employeeDetailsArray);
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
  
  EditEducation(education:any,index:any){
    this.showform = false;
    this.populateFormWithEmployeeDetails(education,this.educationList);
  }
  
  // private populateFormWithEmployeeDetails(educationDetails: any[], educationList?:any): void {
  //   // Assuming employeeDetails is an object with key-value pairs
  //   // debugger
  //   Object.keys(educationDetails).forEach((education:any) => {
  //     Object.keys(education.dynamicData).forEach((fieldName:any)=>{
  //       if(fieldName=='Code' || fieldName=='EmpID'|| fieldName=='EMPCode'){
  //         console.log(fieldName+" is not a formcontrol");
  //       }
  //       else{
  //         const control = this.educationForm.get(fieldName);
  //         if (control) {
  //             if (fieldName === 'title') {
  //                 control.setValue(education.dynamicData[fieldName]);
  //                 this.dynamicFormService.onDropDownChange(this.educationForm, { fieldName, fieldValue: education.dynamicData[fieldName] });
  //             } else {
  //                 control.setValue(education.dynamicData[fieldName]);
  //             }
  //         } else {
  //             console.warn(`Form control for field '${fieldName}' does not exist.`);
  //         }
  //       }
  //     }) ;
      
  //   });
  //   console.log("SetValue of Form is",this.educationForm);
  // }


  private populateFormWithEmployeeDetails(educationDetails: any[], educationList?: any): void {
    // Loop through each item in the educationDetails array
    educationDetails.forEach((education: any) => {
      // Check if the `dynamicData` object is present
      if (education.dynamicData) {
        // Iterate through each key-value pair in the dynamicData object
        Object.keys(education.dynamicData).forEach((fieldName: any) => {
          // Skip these fields as they are not form controls
          if (fieldName === 'Code' || fieldName === 'EmpID' || fieldName === 'EMPCode') {
            console.log(fieldName + " is not a form control");
          } else {
            // Get the form control from the form group using the fieldName
            const control = this.educationForm.get(fieldName);
            if (control) {
              // Handle specific form control behaviors
              if (fieldName === 'title') {
                control.setValue(education.dynamicData[fieldName]);
                // Trigger any dropdown-related changes for the form
                this.dynamicFormService.onDropDownChange(this.educationForm, {
                  fieldName,
                  fieldValue: education.dynamicData[fieldName]
                });
              } else {
                // Set the value of the form control
                control.setValue(education.dynamicData[fieldName]);
              }
            } else {
              console.warn(`Form control for field '${fieldName}' does not exist.`);
            }
          }
        });
      } else {
        console.warn('No dynamicData found in the educationDetails item');
      }
    });
  
    console.log("SetValue of Form is", this.educationForm);
  }  


  private getNextTabID(currentTabID: number): number {
    const totalTabs = 11;
    const nextTabID = (currentTabID % totalTabs) + 1;
    console.log(`Current Tab ID: ${currentTabID}, Calculated Next Tab ID: ${nextTabID}`);
    return nextTabID;
  }

  showForm(){
    this.showform = !this.showform;
    this.educationForm.reset();
  }
}


