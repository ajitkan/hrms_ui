import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { FooterComponent } from './pages/shared-components/footer/footer.component';
import { HeaderComponent } from './pages/shared-components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAttendanceComponent } from './pages/time-and-attendance/add-attendance/add-attendance.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImportAttendancesComponent } from './pages/time-and-attendance/import-attendances/import-attendances.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AddAttendanceComponent,
    ImportAttendancesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
