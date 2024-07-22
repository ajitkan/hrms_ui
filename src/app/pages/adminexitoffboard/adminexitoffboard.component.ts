import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
interface Employee {
  sepration_Id: number;
  employee_Id: number;
  employeeCode: string | null;
  employeeName: string;
  baseLocation: string | null;
  workLocation: string;
  designation: string;
  regionalManager: string | null;
  leaveBalance: number | null;
  contractEndDate: string | null;
  joiningDate: string;
  releaseDate: string;
  confirmDate: string | null;
  status: string | null;
  details: string | null;
  resignType: string;
  resignDate: string;
}


@Component({
  selector: 'app-adminexitoffboard',
  templateUrl: './adminexitoffboard.component.html',
  styleUrls: ['./adminexitoffboard.component.css']
})

export class AdminexitoffboardComponent implements OnInit {
   EmpData: Employee[] = [];
  
  //select Sepration_Id,Employee_Id,EmployeeName,WorkLocation,Designation,JoiningDate,ResignDate,ReleaseDate,ResignType from [Seperation].[EmployeeDetails] 
  // EmpData:  {
  //   // Sepration_Id: number ,
  //   // Employee_Id: number,
  //   //EmployeeCode: string,
  //   EmployeeName: string,
  // //   // BaseLocation: string,
  // //   WorkLocation: string,
  // //   Designation :string,
  // //   // RegionalManager : string
  // //   // LeaveBalance: number,
  // //   // ContractEndDate: string,
  // //   JoiningDate: Date,
  // //   ReleaseDate: Date,
  // //  // ConfirmDate: Date,
  // //   // Status: string,
  // //   // Details: string,
  // //   ResignType:string,
  // //   ResignDate:Date
  // }[] = [];
  // EmployeeName:string ="";
  //empData:string ="";
  departmentService: any;

  constructor(private seprationService:ApiService) { }


  
  ngOnInit(): void {
    this.fetchSeparationEmployeeDetail();
  }
  
 
  // fetchSeparationEmployeeDetail() {
   
  //   this.seprationService.GetSeparationEmployeeDetails().subscribe(
  //     (response: any) => {
  //       debugger
  //       this.EmpData = response.data;
  //       console.log(this.EmpData);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching:', error);
  //     }
  //   );
  //   console.log( this.EmpData);
  // }
  
  fetchSeparationEmployeeDetail() {
    console.log('fetchSeparationEmployeeDetail called');
    
    this.seprationService.GetSeparationEmployeeDetails().pipe(first())
    .subscribe({
      next:(res:any) => {
        debugger;
        console.log('Inside subscribe callback');
        this.EmpData = res.data;
        console.log(this.EmpData);
      },
      error:(error: any) => {
        console.error('Error fetching:', error);
      }
  });
    
    console.log('subscribe method called');
  }
  
  
  

}
