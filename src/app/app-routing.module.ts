import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { EmployeeDataComponent } from './pages/employee-data/employee-data.component';

const routes: Routes = [
  { 
    path: 'login', component: LoginComponent 
  },
  { 
    path: 'employeeData', component: EmployeeDataComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
