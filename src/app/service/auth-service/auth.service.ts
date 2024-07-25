import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiUrl = environment.apiUrl1;
   private userSubject: BehaviorSubject<User>;  
   public user: Observable<User>;
  
  constructor(private http: HttpClient) {  
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!));
    this.user = this.userSubject.asObservable();
    
  }

public get userValue() {
  return this.userSubject.value;
}
  login(companyCode: string, employeeCode: string, password: string): Observable<any> {
  
    const payload = { companyCode, employeeCode, password };
    return this.http.post(`${this.apiUrl}/Login`, payload);
  }

  unlockedUser(payload:any): Observable<any> {
   
    return this.http.post(`${this.apiUrl}/UnlockedUser`, payload);
  }

  forgotPassword(payload:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ForgotPassword`, payload);
  }
  changePassword(token: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ChangePassword`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } 
getUserName(){
  const token = JSON.parse(localStorage.getItem('token')!);
    if (!token) {
      throw new Error('No token found');
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken?.unique_name; 
}

  logout(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const username = this.getUserName();//decodedToken?.unique_name; 

    // Call the logout API
    return this.http.post(`${this.apiUrl}/LogOut`, { username }, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  clearSession() {
    localStorage.removeItem('token');
   
  }// auth.service.ts
resetPassword(payload: {currentPassword:string; newPassword: string; userName: string; companyCode: string }, token: string): Observable<any> {
  debugger
  return this.http.post<any>(`${this.apiUrl}/ChangePassword`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

  
getNotifications(payload:{userName:string,pageNumber: number, pageSize: number},token:string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/FetchNotification`, payload ,{
    headers: { Authorization: `Bearer ${token}`}
  }); 
}
  
// getNotifications(payload: any, token: string): Observable<any> {
//   const url = `${this.apiUrl}/FetchNotification`;
  
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   });

//   return this.http.post(url, payload, { headers });
// }
}
