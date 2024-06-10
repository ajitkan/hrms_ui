import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
}
