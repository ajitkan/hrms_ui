import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { EmployeeDataComponent } from './pages/employee-data/employee-data.component';


import { AddAttendanceComponent } from './pages/time-and-attendance/add-attendance/add-attendance.component';
import { ImportAttendancesComponent } from './pages/time-and-attendance/import-attendances/import-attendances.component';

import { JobPostComponent } from './pages/recruiter/job-post/job-post.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'jobpost', component:JobPostComponent},
  {path:'add-attendance',component:AddAttendanceComponent},
  {path:'import-attendance',component:ImportAttendancesComponent},
  { 
    path: 'employeeData', component: EmployeeDataComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
