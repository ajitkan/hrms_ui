import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeaveRequestDto } from 'src/app/models/leave-request.dto';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {


  leaveApplyRequest(payload: any): Observable<any> {
    console.log('Leave Apply Request Payload:', payload); // Log the payload for debugging

    // Static response simulating a successful API call
    const response = {
      code: 1,
      status: 'Success',
      message: 'Data retrieved successfully',
      leavesRequest: [
        {
          message: 'Leave Request Sent Successfully.', // Success message for the leave request
        },
      ],
    };

    // Return the static response as an observable
    return of(response);
  }
  private apiUrl = 'https://localhost:7254/UserDetails/GetLeaveRequestsForApprover';
  constructor(private http : HttpClient) { }

  getLeaveRequests(leaveApprover: string): Observable<LeaveRequestDto[]> {
    const params = new HttpParams().set('leaveApprover', leaveApprover);
    return this.http.get<LeaveRequestDto[]>(this.apiUrl, { params });
  }
}
