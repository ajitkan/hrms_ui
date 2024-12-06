import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { LeaveRequestDto } from 'src/app/models/leave-request.dto';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
   constructor(private http : HttpClient) { }


   getDailyEmployeeGreetings(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/UserDetails/GetAllDailyEmployeeGreetings`);
  }

// Send greetings to employees (trigger the greeting sending process)
sendEmployeeGreetings(): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/UserDetails/SendEmployeeGreetings`, {});
}
  
  fetchEmployeeLeaveDetails(employeeCode: string): Observable<any> {
    const url = `${environment.apiUrl}/UserDetails/FetchEmployeeLeaveDetails`;
    return this.http.post(url, { employeeCode });
  }

  fetchHolidayDetails(employeeCode: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/UserDetails/FetchHolidayDetails`, { employeeCode });
  }

  fetchCompOffLeaves(employeeCode: string): Observable<any> {
    const payload = { employeeCode }; 
    return this.http.post<any>(`${environment.apiUrl}/UserDetails/FetchCompOffLeaves`, payload);
  }


  // getLeaveRequests(leaveApprover: string): Observable<LeaveRequestDto[]> {
  //   const params = new HttpParams().set('leaveApprover', leaveApprover);
  //   return this.http.get<LeaveRequestDto[]>(`${this.baseUrl}/UserDetails/GetLeaveRequestsForApprover`, { params });
  // }

   getLeaveRequests(payload: any): Observable<LeaveRequestDto[]> {
    // const params = new HttpParams().set('leaveApprover', payload);
    return this.http.post<LeaveRequestDto[]>(`${environment.apiUrl}/UserDetails/GetLeaveRequests`, payload);
  }

  getLeaveHistory(payload: any): Observable<LeaveRequestDto[]> {
    // const params = new HttpParams().set('leaveApprover', payload);
    return this.http.post<LeaveRequestDto[]>(`${environment.apiUrl}/UserDetails/FetchLeaveHistory`, payload);
  }

  getRegularizationRequests(payload: any): Observable<LeaveRequestDto[]> {
    // const params = new HttpParams().set('leaveApprover', payload);
    return this.http.post<LeaveRequestDto[]>(`${environment.apiUrl}/UserDetails/FetchRegularizationRequests`, payload);

  }

  applyLeave(leaveRequestPayload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/UserDetails/LeaveRequest`, leaveRequestPayload);
  }
  // applyLeave(leaveRequestPayload: any): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/UserDetails/LeaveRequest`, leaveRequestPayload);
  // }

  approveLeaveRequest(leaveApprovalPayload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/UserDetails/LeaveApproval`, leaveApprovalPayload);
  }

  // fetchLeaveCount(payload: any): Observable<any> {
  //   const url = `${environment.apiUrl}//UserDetails/GetEmployeeLeaveCount`;
  //   return this.http.post<any>(url, payload);
  // }

  approveRegularizationRequest(leaveApprovalPayload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/UserDetails/RegularizationApproval`, leaveApprovalPayload);
  }

  searchEmployee(payload:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/UserDetails/GetEmployeeDetails`,payload);
  }
  getAttendanceData(payload:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/UserDetails/GetCalendarDetails`,payload);
  }

  getEmployeeCode(){
    const token = JSON.parse(localStorage.getItem('token') as string);
    const decodedToken: any = jwtDecode(token);
    return decodedToken.unique_name;
  }
  fetchLeaveCount(payload: any): Observable<any> {
    // const url = `${this.baseUrl}/UserDetails/GetEmployeeLeaveCount`;
    return this.http.post<any>(`${environment.apiUrl}/UserDetails/GetEmployeeLeaveCount`, payload);
  }
}
