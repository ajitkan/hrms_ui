import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrms_ui';
  IsLogin = false;
  // isJobPostCollapsed: boolean = true;
  // isCollapsed:boolean=false;

  collapsedStates: { [key: string]: boolean } = {
    // uiElements: true,
    // buttons: true,
    // tables: true,
    // icons: true,
    // forms: true,
    Master:true,
    RMSection:true,
    EDMSection: true,
    jobPost: true,
    appSection: true,
    charts: true,
    users:true,
    authentication:true,
    otherpage:true,
    customization:true,
    email:true
  };


  ngOnInit(){
    // alert("login Success");
    // this.IsLogin = true;
    if(localStorage.getItem('LoggedIn') !== null){
      this.IsLogin = Boolean(localStorage.getItem('LoggedIn'))
    }

  }
  IsLoggedin(status:any){
    if(status)
      this.IsLogin = true;
      localStorage.setItem('LoggedIn',this.IsLogin.toString());

  }
  // toggleJobPostCollapse() {
  //   this.isJobPostCollapsed = !this.isJobPostCollapsed;
  // }

  toggleCollapse(menuItem: string) {
    this.collapsedStates[menuItem] = !this.collapsedStates[menuItem];
  }
}
