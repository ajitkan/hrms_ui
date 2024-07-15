import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,
    private router: Router,
    private toastr : ToastrService) {  }
    
    getEmployeeDetails(id:any) {
      return this.http.get<any>(`${environment.apiUrl}/UserDetails/GetEmployeeDetails`+id)
    }
    getAllOnboardEmployee() {
      return this.http.get<any>(`${environment.apiUrl}/UserDetails/GetAllEmployees`)
    }
    getAllHRMSEmployee() {
      return this.http.get<any>(`${environment.apiUrl}/UserDetails/GetAllHRMSEmployees`)
    }
    // addToHRMS(...userList:any){
    //   return this.http.post<any>(`${environment.apiUrl}/EDM/addToHRMS`,JSON.stringify(userList));
    // }

    addToHRMS(selectedEmployeeIds: number[]): Observable<any> {
      return this.http.post(`${environment.apiUrl}/EDM/addToHRMS`, selectedEmployeeIds, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    uploadDocuments(formData: FormData): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/EDM/upload-documents`, formData);
    }
}
