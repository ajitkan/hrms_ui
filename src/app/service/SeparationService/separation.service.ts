import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SeparationService {
  private resignationDetailsUrl = 'https://localhost:7254/UserDetails/GetResignationDetails';
  private applyResignationUrl = 'https://localhost:7254/UserDetails/ApplyResignation';

  private baseUrl = environment.apiUrl; 
  constructor(private http: HttpClient) {}

  // Get Resignation Details
  getResignationDetails(employeeCode: string): Observable<any> {
    return this.http.post(this.resignationDetailsUrl, { employeeCode });
  }

  // Apply Resignation
  applyResignation(payload: any): Observable<any> {
    return this.http.post(this.applyResignationUrl, payload);
  }


  // getResignationHistory(employeeCode: string): Observable<any> {
  //   const payload = { employeeCode }; // Create payload
  //   return this.http.post<any>(this.baseUrl, payload).pipe(
  //     map((response:any) => response.resignationDetails) 
  //   );
  // }

  // fetchCompOffLeaves(employeeCode: string): Observable<any> {
  //   const payload = { employeeCode }; 
  //   return this.http.post<any>(`${this.baseUrl}/UserDetails/FetchCompOffLeaves`, payload);
  // }
  

  getResignationHistory(employeeCode: string): Observable<any> {
    const payload = { employeeCode }; 
    return this.http.post<any>(`${this.baseUrl}/UserDetails/FetchResignationHistory`, payload);
  }

    // Method to approve or reject and revoke resignation
    approveOrRejectResignation(userId: string, requestId: any, statusId: string): Observable<any> {
      const payload = {
        UserID: userId,
        RequestID: requestId,
        StatusID: statusId
      };
      return this.http.post(`${this.baseUrl}/UserDetails/ApproveResignation`, payload);
    }
  
}
