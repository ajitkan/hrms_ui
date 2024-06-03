import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { FooterComponent } from './pages/shared-components/footer/footer.component';
import { HeaderComponent } from './pages/shared-components/header/header.component';
import { JobPostComponent } from './pages/recruiter/job-post/job-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import{ HttpClientModule } from '@angular/common/http'
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddAttendanceComponent } from './pages/time-and-attendance/add-attendance/add-attendance.component';
import { ImportAttendancesComponent } from './pages/time-and-attendance/import-attendances/import-attendances.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    JobPostComponent,
    AddAttendanceComponent,
    ImportAttendancesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
     NgbModule,
     NgxPaginationModule,
     Ng2SearchPipeModule    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
