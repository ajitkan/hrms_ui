import { Injectable } from '@angular/core';

export interface Employee {
  FirstName: any;
  LastName: any;
  EmployeeCode: any;
  Email: any;
  PhoneNumber: any;
  RMName:any;
  RMEmail:any;
  RMContact:any;
}


@Injectable({
  providedIn: 'root'
})
export class CommanSearchEmployeeService {

  private employees: Employee[] = [
    {
      FirstName: 'Sagar',
      LastName: 'Chaudhari',
      EmployeeCode: 'K-192',
      Email: 'sagar.chaudhari@kaninfos.com',
      PhoneNumber: '9665399890',
      RMName: 'Vinayak Patil',
      RMEmail: 'vinayak.patil@kaninfos.com',
      RMContact:'9899997654'
    },
    {
      FirstName: 'Sagar',
      LastName: 'Deshpande',
      EmployeeCode: 'K-193',
      Email: 'sagar.deshpande@kaninfos.com',
      PhoneNumber: '9665399811',
      RMName: 'Vinayak Patil',
      RMEmail: 'vinayak.patil@kaninfos.com',
      RMContact:'9899997654'
    },
    {
      FirstName: 'Sagar',
      LastName: 'Kale',
      EmployeeCode: 'K-194',
      Email: 'sagar.Kale@kaninfos.com',
      PhoneNumber: '9665399899',
      RMName: 'Vinayak Patil',
      RMEmail: 'vinayak.patil@kaninfos.com',
      RMContact:'9899997654'
    },
    {
      FirstName: 'Sagar',
      LastName: 'Patil',
      EmployeeCode: 'K-195',
      Email: 'sagar.Patil@kaninfos.com',
      PhoneNumber: '9665399877',
      RMName: 'Vinayak Patil',
      RMEmail: 'vinayak.patil@kaninfos.com',
      RMContact:'9899997654'
    },
    {
      FirstName: 'Sagar',
      LastName: 'borole',
      EmployeeCode: 'K-196',
      Email: 'sagar.borole@kaninfos.com',
      PhoneNumber: '9665399888',
      RMName: 'Vinayak Patil',
      RMEmail: 'vinayak.patil@kaninfos.com',
      RMContact:'9899997654'
    },
    {
      FirstName: 'Sagar',
      LastName: 'Khan',
      EmployeeCode: 'K-192',
      Email: 'sagar.Khan@kaninfos.com',
      PhoneNumber: '9665399834',
      RMName: 'Vinayak Patil',
      RMEmail: 'vinayak.patil@kaninfos.com',
      RMContact:'9899997654'
    },
    {
      FirstName: 'Gaurav',
      LastName: 'Kale',
      EmployeeCode: 'K-193',
      Email: 'Gaurav.Kale@kaninfos.com',
      PhoneNumber: '9665399843',
      RMName: 'Vinayak Patil',
      RMEmail: 'vinayak.patil@kaninfos.com',
      RMContact:'9899997654'
    }
    // Add more employee objects here as needed
  ];


  constructor() { }

  searchEmployees(TextFrees: string): Employee[] {
    if (!TextFrees) {
      return this.employees;
    }

    TextFrees = TextFrees.toLowerCase();
    return this.employees.filter(employee =>
      employee.FirstName.toLowerCase().includes(TextFrees) ||
      employee.LastName.toLowerCase().includes(TextFrees) ||
      employee.EmployeeCode.toLowerCase().includes(TextFrees) ||
      employee.Email.toLowerCase().includes(TextFrees) ||
      employee.PhoneNumber.includes(TextFrees)
    );
  }
  
}
