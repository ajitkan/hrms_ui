import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrms_ui';
  IsLogin = false;
  isJobPostCollapsed: boolean = true;
  // isCollapsed:boolean=false;


  ngOnInit(){
    // alert("login Success");
    // this.IsLogin = true;
  }
  IsLoggedin(status:any){
    if(status)
      this.IsLogin = true;
  }
  toggleJobPostCollapse() {
    this.isJobPostCollapsed = !this.isJobPostCollapsed;
  }
}
