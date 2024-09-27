import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = environment.apiUrl;  // Fetch base URL from environment

  constructor(private http: HttpClient) {}

  // API call to fetch punch details
  fetchPunchingDetails(employeeCode: string, date: string): Observable<any> {
    const url = `${this.apiUrl}/UserDetails/FetchPunchingDetails`;
    const payload = { employeeCode, Date: date };
    return this.http.post(url, payload);
  }

  // API call to apply regularization
  applyRegularization(payload: any): Observable<any> {
    const url = `${this.apiUrl}/UserDetails/ApplyRegularization`;
    return this.http.post(url, payload);
  }

  // API call to fetch regularization history
  fetchRegularizationHistory(employeeCode: string): Observable<any> {
    const url = `${this.apiUrl}/UserDetails/FetchRegularizationHistory`;
    return this.http.post(url, { employeeCode });
  }
}
