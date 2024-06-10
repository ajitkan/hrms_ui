import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { FooterComponent } from './pages/shared-components/footer/footer.component';
import { HeaderComponent } from './pages/shared-components/header/header.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ExpensepiechatComponent } from './pages/shared-components/expensepiechat/expensepiechat.component';
import { PrjstatuschartComponent } from './pages/shared-components/prjstatuschart/prjstatuschart.component';
import { EmpdeptchartComponent } from './pages/shared-components/empdeptchart/empdeptchart.component';
import { PaymentbarchartComponent } from './pages/shared-components/paymentbarchart/paymentbarchart.component';
// import { DateTimeComponent } from './pages/shared-components/date-time/date-time.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AdminDashboardComponent,
    ExpensepiechatComponent,
    PrjstatuschartComponent,
    EmpdeptchartComponent,
    PaymentbarchartComponent
    // DateTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
