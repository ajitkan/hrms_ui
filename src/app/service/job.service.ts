import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'https://localhost:7254/api/Jobs';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any[]>{
      return this.http.get<any>(`${this.apiUrl}/GetAllJobs`);
  }
  addJob(job: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.apiUrl}/AddJob`, job);
    
  }
  updateJob(id: number, job: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateJob/${id}`, job);
  }

  deleteJob(id: number): Observable<any> {
    debugger
    return this.http.delete<any>(`${this.apiUrl}/DeleteJob/${id}`);
  }
  
}
