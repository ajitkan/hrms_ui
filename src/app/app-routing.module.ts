import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';


import { AddAttendanceComponent } from './pages/time-and-attendance/add-attendance/add-attendance.component';
import { ImportAttendancesComponent } from './pages/time-and-attendance/import-attendances/import-attendances.component';

// import { JobPostComponent } from './pages/recruiter/job-post/job-post.component';
import { EmployeeListDataComponent } from './pages/EmployeeDataManagement/employee-list-data.component';
import { EmplyeeDetailsSummaryComponent } from './pages/EmployeeData/employee-details-summary/employee-details-summary.component';
import { PersonalDetailsComponent } from './pages/EmployeeData/personal-details/personal-details.component';
import { EmploymentDetailsComponent } from './pages/EmployeeData/employment-details/employment-details.component';
import { DocumentsComponent } from './pages/EmployeeData/documents/documents.component';
// import { ContactDetailsComponent } from './pages/EmployeeData/contact-details/contact-details.component';
import { NominationDetailsComponent } from './pages/EmployeeData/nomination-details/nomination-details.component';
// import { EducationDetailsComponent } from './pages/EmployeeData/education-details/education-details.component';
// import { BankDetailsComponent } from './pages/EmployeeData/bank-details/bank-details.component';
import { CompanyMasterComponent } from './pages/master/company-master/company-master.component';
import { MyApplicationComponent } from './pages/time-and-attendance/my-application/my-application.component';
import { AuthGuard } from './service/auth.guard';
// import { AppComponent} from './app.component';
import { AdmincalenderComponent } from './pages/shared-components/admincalender/admincalender.component';
import { ExitoffboardComponent } from './pages/exitoffboard/exitoffboard.component';
import { AdminexitoffboardComponent } from './pages/adminexitoffboard/adminexitoffboard.component';
import { AdminexitoffboardDetailComponent } from './pages/adminexitoffboard-detail/adminexitoffboard-detail.component';
import { User } from './models/user';
import { user } from './constant/constant';
import { CreateEmployeeComponent } from './pages/EmployeeDataManagement/create-employee/create-employee.component';
// import { SalaryCalculatorComponent } from './pages/Payroll/salary-calculator/salary-calculator.component';

import { AppComponent } from './app.component';
// import { SalaryCalculatorComponent } from './pages/Payroll/salary-calculator/salary-calculator.component';
import { MyTimesheetComponent } from './pages/time-and-attendance/my-timesheet/my-timesheet.component';
// import { SalaryDetailsComponent } from './pages/payroll/salary-details/salary-details.component';
import { SalaryCalculatorComponent } from './pages/Payroll/salary-calculator/salary-calculator.component';
import { ChangePasswordComponent } from './pages/authentication/change-password/change-password.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { EmployeeSearchResultComponent } from './pages/employee-search-result/employee-search-result.component';

import { NotificationComponent } from './pages/shared-components/notification/notification.component';
import { NotificationDetailsComponent } from './pages/shared-components/notification-details/notification-details.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { EducationDetailsComponent } from './pages/education/education-details/education-details.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details/contact-details.component'; 
import { BankDetailsComponent } from './pages/bank-details/bank-details/bank-details.component';
import { ExperienceDetailsComponent } from './pages/experience-details/experience-details/experience-details.component';
import { LeaveApplyComponent } from './pages/leave/leave-apply/leave-apply/leave-apply.component';
import { LeaveApprovalComponent } from './pages/leave/leave-approval/leave-approval/leave-approval.component';
import { RegularizationApplyComponent } from './pages/attendance/regularization-apply/regularization-apply/regularization-apply.component';
import { LeaveHistoryComponent } from './pages/leave/leave-history/leave-history.component';
import { PunchTimeComponent } from './pages/punch-time/punch-time.component';
import { PunchTimeApprovalComponent } from './pages/punch-time-approval/punch-time-approval.component';
import { AttendenceCalenderComponent } from './pages/attendence-calender/attendence-calender.component';
// import { CalendarComponent } from './pages/calendar/calendar/calendar.component';
import { ApplyResignationComponent } from './pages/separation/apply-resignation/apply-resignation/apply-resignation.component';
import { ApproveResignationComponent } from './pages/separation/approve-resignation/approve-resignation/approve-resignation.component';
import { ResignationChecklistComponent } from './pages/separation/resignation-checklist/resignation-checklist/resignation-checklist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {
  //   path:'login',component:LoginComponent
  // },
  // {
  //   path:'',component:DashboardComponent,
  //   canActivate:[AuthGuard]
  // },
  {
    path: 'home', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Admin', component: AdminDashboardComponent
  },
  {
    path: 'login', component: LoginComponent,
    // canActivate: [AuthGuard],
    // data:{ isLogin:localStorage.getItem('token')?true:false} 
  },
  {
    path: 'reset-password', component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notification', component: NotificationComponent
  },
  {
    path: 'notification/:id', component: NotificationDetailsComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'contact-details', component: ContactDetailsComponent
  },

  {
    path: 'bank-details', component: BankDetailsComponent
  },
  {
    path: 'education-details', component: EducationDetailsComponent
  },
  {
    path: 'experience-details', component: ExperienceDetailsComponent
  },
  {
    path: 'leave-apply', component: LeaveApplyComponent
  },
  {
    path: 'leave-approval', component: LeaveApprovalComponent
  },
  {
    path: 'regularization-apply', component: RegularizationApplyComponent
  },
  // {
  //   path: 'jobpost', component: JobPostComponent
  // },
  {
    path: 'add-attendance', component: AddAttendanceComponent
  },
  {
    path: 'import-attendance', component: ImportAttendancesComponent
  },
  {
    path: 'employeeList', component: EmployeeListDataComponent
  },
  {
    path: 'employeeData', component: EmplyeeDetailsSummaryComponent
  },
  {
    path: 'employeeData/:id', component: EmplyeeDetailsSummaryComponent,
    canActivate: [AuthGuard],
    data: { id: user.id }
  },
  {
    path: 'emp-personal-details', component: PersonalDetailsComponent
  },
  {
    path:'leave-history',component:LeaveHistoryComponent
  },
  {
    path:'regularization-approve',component:PunchTimeApprovalComponent
  },
  {
    path:'regurlization-history',component:PunchTimeComponent
  },
  {
    path:'timesheet',component:AttendenceCalenderComponent
  },

  {
    path: 'apply-resignation',
    component: ApplyResignationComponent
  },
  {
    path: 'approve-resignation',
    component: ApproveResignationComponent
  },

  {
    path: 'resignation-checklist',
    component: ResignationChecklistComponent
  },
  
  // {
  //   path:'emp-employement-history',component:EmploymentDetailsComponent
  // },
  {
    path: 'emp-documents', component: DocumentsComponent
  },
  // {
  //   path: 'emp-contact-details', component: ContactDetailsComponent
  // },
  {
    path: 'emp-nominee-details', component: NominationDetailsComponent
  },
  // {
  //   path: 'emp-education-details', component: EducationDetailsComponent
  // },
  {
    path: 'emp-bank-details', component: BankDetailsComponent
  },
  {
    path: 'company-master', component: CompanyMasterComponent
  },
  {
    path: 'Admincalender', component: AdmincalenderComponent
  },
  {
    path: 'create-employee', component: CreateEmployeeComponent
  },
  {
    path: 'my-application', component: MyApplicationComponent
  },
  {
    path: 'exitoffboard', component: ExitoffboardComponent
  },
  {
    path: 'adminexitoffboard', component: AdminexitoffboardComponent
  },
  {
    path: 'adminexitDetail', component: AdminexitoffboardDetailComponent
  },
  {
    path: 'EmployementDetail', component: EmploymentDetailsComponent
  },
  {
    path: 'EmployeeDetail', component: EmployeeDetailsComponent
  },
  // {
  //   path: 'salary-calculator', component: SalaryCalculatorComponent
  // },
  // {
  //   path: 'salary-details', component: SalaryDetailsComponent
  // },
  {
    path: 'my-timesheet', component: MyTimesheetComponent
  },
  {
    path: 'EmployeeList', component: EmployeeSearchResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
