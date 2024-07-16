import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiUrl = environment.apiUrl1;

  constructor(private http: HttpClient) { }

  login(companyCode: string, empCode: string, password: string): Observable<any> {
    const payload = { companyCode, empCode, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }
}
