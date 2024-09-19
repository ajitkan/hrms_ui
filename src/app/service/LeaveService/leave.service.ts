import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeaveRequestDto } from 'src/app/models/leave-request.dto';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'https://localhost:7254/UserDetails/GetLeaveRequestsForApprover';
  private apiUrl1 = 'https://localhost:7254/UserDetails/LeaveRequest';
  private baseUrl = 'https://localhost:7254/UserDetails';
  private holidayApiUrl = 'https://localhost:7254/UserDetails/FetchHolidayDetails';
  constructor(private http : HttpClient) { }

  fetchEmployeeLeaveDetails(employeeCode: string): Observable<any> {
    const url = `${this.baseUrl}/FetchEmployeeLeaveDetails`;
    return this.http.post(url, { employeeCode });
  }
  fetchHolidayDetails(employeeCode: string): Observable<any> {
    const url = this.holidayApiUrl;
    return this.http.post(url, { employeeCode });
  }
  
  applyLeave(leaveRequestPayload: any): Observable<any> {
    return this.http.post(this.apiUrl1, leaveRequestPayload);
  }
 
  fetchCompOffLeaves(employeeCode: string): Observable<any> {
    debugger
    const payload = { employeeCode }; 
    return this.http.post<any>(`${this.baseUrl}/FetchCompOffLeaves`, payload);
  }

  getLeaveRequests(leaveApprover: string): Observable<LeaveRequestDto[]> {
    const params = new HttpParams().set('leaveApprover', leaveApprover);
    return this.http.get<LeaveRequestDto[]>(this.apiUrl, { params });
  }
}
