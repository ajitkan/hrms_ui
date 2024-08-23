import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first, Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-adminexitoffboard-detail',
  templateUrl: './adminexitoffboard-detail.component.html',
  styleUrls: ['./adminexitoffboard-detail.component.css']
})
export class AdminexitoffboardDetailComponent implements OnInit{

  deptNames:  {deptId: number,deptName: string }[] = [];
  deptName:string ="";
  departmentService: any;



 // type seprationService = any
  constructor(private seprationService:ApiService) { }

  ngOnInit(): void {
    this.fetchDeptNames();
  }
  // fetchDeptNames(): void {
  //     this.seprationService.GetDepartmentDetails()
  //     .subscribe({
  //       next:(res:any) => {
  //         this.deptNames = res;
  //       },
  //       error:(error: any) => {
  //         console.error('Error fetching department names', error);
  //       }
  //   });
  // }
  fetchDeptNames() {
 
    this.seprationService.GetDepartmentDetails().subscribe(
      (response: any) => {
        this.deptNames = response.data;
        
        console.log(this.deptNames)
       
      
      },
      (error: any) => {
        console.error('Error fetching :', error);
      }
    );
         console.log("get all  ----> " , this.deptNames);
        //  this.updatePaginatedJobs();
         
  }
}
// https://localhost:44315/index.html