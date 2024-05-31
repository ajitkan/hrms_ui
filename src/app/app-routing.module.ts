import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { JobPostComponent } from './pages/recruiter/job-post/job-post.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'jobpost', component:JobPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
