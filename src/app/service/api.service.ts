import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  accurateTime: any;
  constructor(private http: HttpClient,
    private router: Router) { }


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
  login(data: any): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/Authenticate/login`, data).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }));
  }

  getAttendance() {
    return this.http.get<any>(`${environment.apiUrl}/Attendance/getAttendance`)
  }


  updateAttendance(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/Attendance/UpdateAttendance`, data)
  }

  getAttendanceByUserId(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/Attendance/GetAttendanceByUserId`, data)
  }




}
