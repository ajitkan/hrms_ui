import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  [x: string]: any;
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

    return this.httpClient.get('https://localhost:7254/api/UserDetails/FeatchEmployeeDetail', { params })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching employee details', error);
          return throwError(error);
        })
      );
  }
  
  // Utility function to determine the input type
  getFieldType(dataType: string): string {
    switch (dataType) {
      case 'VARCHAR(50)':
      case 'VARCHAR(10)':
        return 'text';
      case 'DATE':
        return 'date';
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
  
}
