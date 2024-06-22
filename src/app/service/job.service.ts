import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SalaryCalculationRequest {
  id: number;
  annualCTC: number;
  performanceBonus: number;
}

export interface SalaryCalculator {
  basicMonthly: number;
  hraMonthly: number;
  eduAllowanceMonthly: number;
  ltaMonthly: number;
  telAllowanceMonthly: number;
  specialMonthly: number;
  pfMonthly: number;
  ptMonthly: number;
  netMonthly: number;
  employerPFMonthly: number;
  medInsMonthly: number;
  termPlanMonthly: number;
  performanceBonusMonthly: number;
  gratuityMonthly: number;
  finalCTCMonthly: number;
  grossCTCMonthly: number;
  basicYearly: number;
  hraYearly: number;
  eduAllowanceYearly: number;
  ltaYearly: number;
  telAllowanceYearly: number;
  specialYearly: number;
  pfYearly: number;
  ptYearly: number;
  netYearly: number;
  employerPFYearly: number;
  medInsYearly: number;
  termPlanYearly: number;
  performanceBonusYearly: number;
  gratuityYearly: number;
  finalCTCYearly: number;
  grossCTC: number;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'https://localhost:7254/api/Jobs';
  private apiUrl2= 'https://localhost:7254/api/SalaryCalculator';

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
  
  calculateSalary(request: SalaryCalculationRequest): Observable<SalaryCalculator> {
    return this.http.post<SalaryCalculator>(`${this.apiUrl2}/CalculateSalary`, request);
  }
}
