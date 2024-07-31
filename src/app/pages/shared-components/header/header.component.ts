import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { CommanSearchEmployeeService,Employee } from 'src/app/service/CommanService/comman-search-employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
[x: string]: any;
  @Output() isLogin = new EventEmitter<{ isLoggedIn: boolean; screens: any[]; }>();
 
 user:any;
 isCollapsed:boolean=false;
 @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
 userName:any;
 token:any;

 //variable  for Search Employee
  TextFrees: string = '';
  searchResults: Employee[] = [];
  visibleResults: any[] = [];
  showDropdown: boolean = true;
  showAll: boolean = false;

  encodedJsonString:any;

 constructor(private formBuilder: FormBuilder,
  private authService:AuthService ,
  private CommanSearchEmployeeService:CommanSearchEmployeeService,
  private modalService: NgbModal,
  private router: Router
){
    
  }
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user")as string);
  }
  openChangePasswordModal() {
    this.modalService.open(this.changePasswordModal, { centered: true }); // Open modal with centered option
  }
  toggleCollapse() {
     this.isCollapsed =!this.isCollapsed
    // this.isCollapse.emit(true);
  }
  logoutRes: any;

  logout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        console.log('Logout response:', res); 
        this.logoutRes = res;
        
        if (res.status === 'Success') {
          this.authService.clearSession();
          console.log('Navigating to login page...');
          // this.isLogin.emit(false); 
          this.isLogin.emit({ isLoggedIn: false, screens: [] });
          this.router.navigate(['']).then(() => {
            console.log('Navigation successful!');
          }).catch((error) => {
            console.error('Navigation error:', error);
          });
        } else {
          console.warn('Logout response did not indicate success:', res);
        }
      },
      error: (error) => {
        console.error('Logout failed', error);
        
      }
    });
  }
  
  //______________________________For Search Employee______________________________________________

  onSearch(): void {
   
    if (this.TextFrees) {
      this.searchResults = this.CommanSearchEmployeeService.searchEmployees(this.TextFrees);
      if (this.searchResults.length > 0 && !this.showAll) {
        this.visibleResults = this.searchResults.slice(0, 3);
      } else {
        debugger;
        this.visibleResults = this.searchResults;
      }
      this.showDropdown = false;
    } 
    else {
      debugger;
      this.searchResults = [];
      this.visibleResults = [];
    }

    // const jsonString = JSON.stringify(this.searchResults);
    
  }
  showAllRecords(): void {
    this.showAll = true;
    this.visibleResults = this.searchResults;
    this.showDropdown = false; // Hide the dropdown
    //this.router.navigate(['/EmployeeList'], { queryParams: { data: this.encodedJsonArray } });
  }

  // get encodedJsonArray(): any {
  //   return this.encodedJsonString = encodeURIComponent(JSON.stringify(this.searchResults));//encodeURIComponent(JSON.stringify(this.jsonArray));
  // }


  encodedJsonArray(emp?: any): string {
    if(emp){
      const dataToEncode = emp ? emp : this.searchResults;
      this.encodedJsonString = encodeURIComponent(JSON.stringify(dataToEncode));
      console.log('Fetched Employee',JSON.stringify(this.encodedJsonString));
      return this.encodedJsonString;
    }
    else{
      return this.encodedJsonString = encodeURIComponent(JSON.stringify(this.searchResults));//encodeURIComponent(JSON.stringify(this.jsonArray));
    }
    
  }
  
  //-------------------Search Enmployee-------------------------------

 



  
}
