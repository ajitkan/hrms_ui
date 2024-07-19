import { Component } from '@angular/core';
import { JobService, SalaryCalculationRequest, SalaryCalculator } from 'src/app/service/job.service';

@Component({
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css']
})
export class SalaryCalculatorComponent {

  request: SalaryCalculationRequest = { id: 0, annualCTC: 0, performanceBonus: 0 };
  result?: SalaryCalculator;
  error?: string;

  constructor(private service:JobService){

  }

  calculateSalary(): void {
    if (!this.request.annualCTC) {
      this.error = 'Please enter Annual CTC.';
      this.result = undefined;
      return;
    }

    this.service.calculateSalary(this.request).subscribe({
      next: (data) => {
        if (data === null) {
          this.result = undefined;
          this.error = 'No salary calculation data found.';
        } else {
          this.result = data;
          this.error = undefined;
        }
      },
      error: (err: any) => {
        console.error('Error while calculating salary:', err);
        this.error = err.message || 'An error occurred while calculating salary.';
        this.result = undefined;
      }
    });
  }


}
