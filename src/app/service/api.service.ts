import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { ToastrService } from 'ngx-toastr';
import { User, employeeStatus } from '../models/user';

type EmployeeDetailDto = {
  employeeID?: number;
  employeeCode?: string;
  fieldName?: string;
  fieldValue?: string;
  isApplicable?: boolean;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  accurateTime: any;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  alertMessage: string | null = null;
  forgotPassAlertMessage: string | null = null;
  alertType: 'success' | 'error' | 'info' | null = null;
  alertTimeout:any;

  apiUrlsepration!: 'https://localhost:44315/api';
  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) {
    this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('token')!));

    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('token')!));
    return this.userSubject.value;
  }

  getIp() {
    return this.http.get<any>('https://api.ipify.org/?format=json')
  }

  getTimezoneInfo(ip: string) {
    const url = `https://ipinfo.io/${ip}?token=e198c30a1daaec`;
    return this.http.get<{ timezone: string }>(url);
  }

  // getInfo() {
  //   var ip = this.getIp().subscribe(resp=>{});
  //   console.log(ip);
  //   const url = 'https://ipinfo.io/' + '45.64.207.158' + '?token=e198c30a1daaec';
  //   return this.http.get(url).subscribe((resp:any)=>{
  //     if(resp != null && resp != undefined){
  //       console.log(resp);
  //       this.getCurrentTime(resp.timezone).subscribe(resp=>{
  //         console.log(resp)
  //       })

  //     }
  //   });
  // }


  getInfo() {
    return this.getIp()
      .pipe(
        switchMap(response => this.getTimezoneInfo(response.ip)),
        switchMap(info => this.getCurrentTime(info.timezone))
      )
    // .subscribe(
    //   (timeResponse) => {
    //     this.accurateTime = timeResponse;
    //     console.log('Current Time:', this.accurateTime);
    //     return this.accurateTime;
    //   },
    //   (error) => {
    //     console.error('Error fetching time:', error);
    //     this.accurateTime = 'Could not fetch time';
    //   }
    // );
  }

  //Cuttent Time Base On TimeZone   
  getCurrentTime(timezone: any): Observable<any> {

    const apiUrl = `http://worldtimeapi.org/api/timezone/${timezone}`;
    return this.http.get<any>(apiUrl);
  }



  //Login
  // login(data: any): Observable<any> {

  //   return this.http.post<any>(`${environment.apiUrl}/Authenticate/login`, data).pipe(map(user => {
  //     localStorage.setItem('user', JSON.stringify(user));
  //     return user;
  //   }));
  // }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Login/Login`, data).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user.obj));
      return user;
    }));
  }

  //   logout() {
  //     // remove user from local storage and set current user to null
  //     // sessionStorage.removeItem('user');
  //     sessionStorage.clear();
  //     localStorage.clear();
  //     this.toastr.success("LogOut Successfully...")
  //     // isLogin.status = false;
  //     this.router.navigate(['/login']);
  // }

  getAttendance() {
    return this.http.get<any>(`${environment.apiUrl}/api/Attendance/getAttendance`)
  }

  // Get Department Clearance 


  updateAttendance(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Attendance/UpdateAttendance`, data)
  }

  punchTimeApplication(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Attendance/PunchTimeApplication`, data)
  }

  getAttendanceByUserId(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Attendance/GetAttendanceByUserId`, data)
  }

  getApplicationByUserId(data: any) {
    const params = {
      Emp_Id: data.Emp_Id,
      Shift_Date: data.Shift_Date
    }
    return this.http.get<any>(`${environment.apiUrl}/Attendance/GetApplicationByUserId`,{params}) 
  }
  createEmployee(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/UserDetails/CreateEmployee`, data)
  }
}
