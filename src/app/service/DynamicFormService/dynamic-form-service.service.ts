import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private fb: FormBuilder,
     private apiService: ApiService,
     private httpClient: HttpClient
    ) {}

  // Create a dynamic form based on fields configuration
  createForm(fields: any[]): FormGroup {
    const formGroup: any = {};
    fields.forEach(field => {
      const validators = [];
      if (field.isMandatory) {
        validators.push(Validators.required);
      }
      formGroup[field.fieldName] = [field.defaultValue || '', validators];

      if (field.controls === 'DROPDOWNLIST') {
        this.fetchDropdownOptions(field.fieldID, field.tabID).subscribe(options => {
          field.options = options;
        });
      }
    });
    return this.fb.group(formGroup);
  }

  // Convert form values to a specific data structure (e.g., EmployeeDetailDto)
  convertFormValuesToDetails(formValues: any, extraData: any): any[] {
    const createdDate = new Date();
    return Object.keys(formValues).map(key => ({
      ...extraData,
      fieldName: key,
      fieldValue: formValues[key],
      isApplicable: true,
      createdDate: createdDate,
      updatedDate: createdDate
    }));
  }

  // Submit the form to the backend
  submitForm(details: any[], tabID: number, recordType:any): Observable<any> {
    return this.apiService.insertEmployeeDetails(details, tabID, recordType);
  }

 
  
  // Fetch fields for dynamic form creation
  fetchFields(roleID: number, tabID: number): Observable<any> {
    return this.apiService.fetchUserDetailsField({ roleID, tabID });
  }

  // Fetch dropdown options based on fieldID and tabID
  fetchDropdownOptions(fieldID: number, tabID: number): Observable<any> {
    return this.apiService.fetchDropdownOptions(fieldID, tabID);
  }


  // fetchEmployeeDetails(tabID: number, employeeCode: string, recordType: string | null) {
  //   const url = `https://localhost:7254/api/UserDetails/FeatchEmployeeDetail?TabID=${tabID}&EmployeeCode=${employeeCode}&RecordType=${recordType}`;
  //   return this.httpClient.get(url);
  // }

  fetchEmployeeDetails(tabID: number, employeeCode: any, recordType: any | null) {
    const params = new HttpParams()
      .set('TabID', tabID)
      .set('EmployeeCode', employeeCode || null)
      .set('RecordType', recordType || null);
    console.log('Service call for fetch', params);

    return this.httpClient.get(`${environment.apiUrl}/UserDetails/FeatchEmployeeDetail`, { params })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching employee details', error);
          return throwError(error);
        })
      );
  }
  
  // Utility function to determine the input type
  // getFieldType(dataType: string): string {
  //   switch (dataType) {
  //     case 'VARCHAR(50)':
  //     case 'VARCHAR(10)':
  //       return 'text';
  //     case 'DATE':
  //       return 'date';
  //     default:
  //       return 'text';
  //   }
  // }


  getFieldType(dataType: string): string {
    switch (dataType) {
      case 'VARCHAR(50)':
      case 'VARCHAR(10)':
        case 'TEXT':
        return 'text';
      case 'DATE':
        return 'date';
      case 'INT': // Add cases for numeric types
      case 'BIGINT':
      case 'DECIMAL':
      case 'NUMERIC':
      case 'NUMBER':
        return 'number';
      default:
        return 'text';
    }
  }
  
  // Utility function to divide fields into rows
  getRows(fields: any[]): any[][] {
    const rows = [];
    for (let i = 0; i < fields.length; i += 2) {
      rows.push(fields.slice(i, i + 2));
    }
    return rows;
  }

  // TrackBy function for ngFor
  trackByFn(index: number, item: any): any {
    return item.fieldName;
  }

  // Utility function for handling text input events
  onTextInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    console.log('Input Value:', inputElement.value);
  }

  // Check if a row has a single field or button
  // isSingleFieldOrButtonRow(row: any[]): boolean {
  //   return row.length === 1 || (row.length === 2 && row.some(field => field.controls === 'BUTTON'));
  // }

  // isSingleFieldOrButtonRow(row: any[]): boolean {
  //   return row.length === 1 && row[0].controls !== 'BUTTON'; // Ensure buttons don't trigger the single field layout
  // }
  
  isSingleFieldOrButtonRow(row: any[]): boolean {
    // Check if the row contains only one item and it's not a button
    return row.length === 1 && row[0].controls !== 'BUTTON' && row[0].isView;
  }

  onDropDownChange(form: FormGroup, field:any){
   if(field.fieldName =='title'){
    // alert(field.fieldName);
      const title = form.get('title')?.value;

      if (title === "1") {
        form.get('Gender')?.setValue('1');
        //form.controls(disabled);
      } else if(title === "3" || title === "2" ) {
        form.get('Gender')?.setValue('2');
      }
      else{
        form.get('Gender')?.setValue('');
      }
   }
    
  //}
  }
  textOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[0-9]/.test(control.value);
      return forbidden ? { 'textOnly': { value: control.value } } : null;
    };
  }
  numberOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = /^[0-9]+$/.test(control.value);
      return !isValid ? { 'numberOnly': { value: control.value } } : null;
    };
  }

  // BindMasterValue(fields:any,res:any,tabID:any){
  //   debugger
  //   if(res.code == 0){
  //     return;
  //   }
  //   else if(res.code == 1 ){
  //     let result = res;
  //    result.featchEmployeeDetailResponse.forEach(async (emp:any)=>{
  //       if(tabID==4){
  //         debugger
  //         await this.fetchDropdownOptions(fields.fieldID,tabID).subscribe({ // for College FieldId is 21
  //           next: (res: any) => {
  //             if (res.code === 1 && Array.isArray(res.masterList)) {
  //               res.masterList.forEach((item: any) => {
  //                 if(item.Code==emp.dynamicData.College){
  //                   emp.dynamicData.College = item.Text
  //                 }
  //               });
  //               // return res;
  //             } else {
  //               console.log('No data available');
  //             }
  //           },
  //           error: (err: any) => {
  //             console.log(`Error :`, err.message);
  //           }
  //         });
  //         // CourseTitle Status
  //         await this.fetchDropdownOptions(18,tabID).subscribe({ // for CourseTitle FieldId is 18
  //           next: (res: any) => {
  //             if (res.code === 1 && Array.isArray(res.masterList)) {
  //               res.masterList.forEach((item: any) => {
  //                 if(item.Code==emp.dynamicData.CourseTitle){
  //                   emp.dynamicData.CourseTitle = item.Text
  //                 }
  //               });
  //             } else {
  //               console.log('No data available');
  //             }
  //           },
  //           error: (err: any) => {
  //             console.log(`Error :`, err.message);
  //           }
  //         });
          
  //         //CourseType
  //          await this.fetchDropdownOptions(24,tabID).subscribe({ // for CourseType FieldId is 24
  //           next: (res: any) => {
  //             if (res.code === 1 && Array.isArray(res.masterList)) {
  //               res.masterList.forEach((item: any) => {
  //                 if(item.Code==emp.dynamicData.CourseType){
  //                   emp.dynamicData.CourseType = item.Text
  //                 }
  //               });
  //             } else {
  //               console.log('No data available');
  //             }
  //           },
  //           error: (err: any) => {
  //             console.log(`Error :`, err.message);
  //           }
  //         });
  //         //Specialization

  //         await this.fetchDropdownOptions(19,tabID).subscribe({ // for CourseTitle FieldId is 19
  //           next: (res: any) => {
  //             if (res.code === 1 && Array.isArray(res.masterList)) {
  //               res.masterList.forEach((item: any) => {
  //                 if(item.Code==emp.dynamicData.Specialization){
  //                   emp.dynamicData.Specialization = item.Text
  //                 }
  //               });
  //             } else {
  //               console.log('No data available');
  //             }
  //           },
  //           error: (err: any) => {
  //             console.log(`Error :`, err.message);
  //           }
  //         });

  //         //University
  //         await this.fetchDropdownOptions(20,tabID).subscribe({ // for University FieldId is 20
  //           next: (res: any) => {
  //             if (res.code === 1 && Array.isArray(res.masterList)) {
  //               res.masterList.forEach((item: any) => {
  //                 if(item.Code==emp.dynamicData.University){
  //                   emp.dynamicData.University = item.Text
  //                 }
  //               });
  //             } else {
  //               console.log('No data available');
  //             }
  //           },
  //           error: (err: any) => {
  //             console.log(`Error :`, err.message);
  //           }
  //         });


  //       }
  //     });

  //     return result;
  //   }
  // }

  BindMasterValue(fields: any, res: any, tabID: any) {
    debugger;
    if (res.code == 0) {
        return;
    } else if (res.code == 1) {
        let result = res;

        // Define a mapping of field IDs to dynamicData keys
        const fieldMappings = {
            21: 'College',
            18: 'CourseTitle',
            24: 'CourseType',
            19: 'Specialization',
            20: 'University',
            16: 'title',
            4: 'Gender',
            17: 'skills'
        };

        result.featchEmployeeDetailResponse.forEach(async (emp: any) => {
            if (tabID ) {
                for (const [fieldID, key] of Object.entries(fieldMappings)) {
                    await this.fetchDropdownOptions(Number(fieldID), tabID).subscribe({
                        next: (res: any) => {
                            if (res.code === 1 && Array.isArray(res.masterList)) {
                                res.masterList.forEach((item: any) => {
                                    if (item.Code == emp.dynamicData[key]) {
                                        emp.dynamicData[key] = item.Text;
                                    }
                                });
                            } else {
                                console.log('No data available');
                            }
                        },
                        error: (err: any) => {
                            console.log(`Error :`, err.message);
                        }
                    });
                }
            }
        });

        return result;
    }
}

}
