import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';


import { AddAttendanceComponent } from './pages/time-and-attendance/add-attendance/add-attendance.component';
import { ImportAttendancesComponent } from './pages/time-and-attendance/import-attendances/import-attendances.component';

import { JobPostComponent } from './pages/recruiter/job-post/job-post.component';
import { EmployeeListDataComponent } from './pages/EmployeeData/employee-data/employee-list-data.component';
import { EmplyeeDetailsSummaryComponent } from './pages/EmployeeData/employee-details-summary/employee-details-summary.component';
import { PersonalDetailsComponent } from './pages/EmployeeData/personal-details/personal-details.component';
import { EmploymentDetailsComponent } from './pages/EmployeeData/employment-details/employment-details.component';
import { DocumentsComponent } from './pages/EmployeeData/documents/documents.component';
import { ContactDetailsComponent } from './pages/EmployeeData/contact-details/contact-details.component';
import { NominationDetailsComponent } from './pages/EmployeeData/nomination-details/nomination-details.component';
import { EducationDetailsComponent } from './pages/EmployeeData/education-details/education-details.component';
import { BankDetailsComponent } from './pages/EmployeeData/bank-details/bank-details.component';
import { CompanyMasterComponent } from './pages/master/company-master/company-master.component';
import { MyApplicationComponent } from './pages/time-and-attendance/my-application/my-application.component';
import { AuthGuard } from './service/auth.guard';
import { AppComponent, DashboardComponent } from './app.component';


const routes: Routes = [
  {
    path:'',component:DashboardComponent,
  },
  {
    path:'login',component:LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'jobpost', component:JobPostComponent
  },
  {
    path:'add-attendance',component:AddAttendanceComponent
  },
  {
    path:'import-attendance',component:ImportAttendancesComponent
  },
  { 
    path: 'employeeList', component: EmployeeListDataComponent 
  },
  { 
    path: 'employeeData', component: EmplyeeDetailsSummaryComponent 
  },

  {
    path:'emp-personal-details',component:PersonalDetailsComponent
  },
  {
    path:'emp-employement-history',component:EmploymentDetailsComponent
  },
  { 
    path: 'emp-documents', component: DocumentsComponent 
  },
  { 
    path: 'emp-contact-details', component: ContactDetailsComponent 
  },
  {
    path:'emp-nominee-details',component:NominationDetailsComponent
  },
  {
    path:'emp-education-details',component:EducationDetailsComponent
  },
  { 
    path: 'emp-bank-details', component:  BankDetailsComponent
  },

 {
  path: 'company-master', component: CompanyMasterComponent
 }

  // { 
  //   path: 'emp-contact-details', component: ContactDetailsComponent 
  // },
  { 
    path: 'my-application', component: MyApplicationComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
