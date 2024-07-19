import { Component } from '@angular/core';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.css']
})
export class SalaryDetailsComponent {




  statutoryDetails = [
    { component: 'Gratuity', membership: 'No' },
    { component: 'Provident Fund', membership: 'No' },
  ];

  financialDetails = {
    effectiveDate: '01/Jul/2024',
    revisedMonth: 'Jul 2024',
    profession: 'Salaried',
    onCompanyPayroll: true,
    currentAnnualCTC: 364380,
    proposedAnnualCTC: 500000,
    currentAnnualGross: 0,
    proposedAnnualGross: 0,
    revisionType: 'Increment',
  };

  calculate() {
    // Implement your calculation logic here
  }

}
