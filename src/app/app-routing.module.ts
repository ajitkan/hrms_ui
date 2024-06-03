import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { AddAttendanceComponent } from './pages/time-and-attendance/add-attendance/add-attendance.component';
import { ImportAttendancesComponent } from './pages/time-and-attendance/import-attendances/import-attendances.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'add-attendance',component:AddAttendanceComponent},
  {path:'import-attendance',component:ImportAttendancesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
