import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { User } from 'src/app/models/user';
import { EmployeeService } from 'src/app/service/employee-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emplyee-details-summary',
  templateUrl: './employee-details-summary.component.html',
  styleUrls: ['./employee-details-summary.component.css']
})
export class EmplyeeDetailsSummaryComponent {
  //  personalDetails:any; 
   employeeId:any;
   loading:boolean=false;
  //  empHistory:any;

   collapsedStates: { [key: string]: boolean } = {
    EDSSection:true,
    EHistory:true,
    Doc:true,
    Contact:true,
    Education:true,
    Bank:true    
  };

    constructor(private employeeService:EmployeeService,
      private toastr : ToastrService,
      private route: ActivatedRoute,){
    }
    registrationDetails = JSON.parse(sessionStorage.getItem('registration') as string)
    personalDetails = JSON.parse(sessionStorage.getItem("personalDetails")as string)   
    user = JSON.parse(localStorage.getItem('user')as string);
    employeeList = JSON.parse(localStorage.getItem('EmployeeList') as string);
    empHistory = JSON.parse(localStorage.getItem('experienceDetails')as string);
    
  // ngOnInit(){
  //     if(this.personalDetails != null || sessionStorage.getItem("personalDetails")!=null){
  //       this.personalDetails = JSON.parse(sessionStorage.getItem("personalDetails")as string)   
  //       if(this.personalDetails.imgSource==null){
  //         this.personalDetails.imgSource='./../assets/images/user/user.jpg'
  //       }
  //     }
  //     else{
  //       this.getEmployeeData(this.user);
  //     }
  //     if(sessionStorage.getItem('registration')!=null){
  //       this.registrationDetails = JSON.parse(sessionStorage.getItem('registration') as string)
  //     }
  //   // }
  //    if(this.user!=null && (this.user.roles =='Super Admin' || this.user.roles =='Admin'))
  //       this.route.paramMap.subscribe(params => {
  //         if (params.has('id')) {
  //           this.employeeId = params.get('id');
  //           this.getEmployeeData(this.user,this.employeeId);
  //          } 
  //       });
      
   
  //   // if(this.personalDetails != null || sessionStorage.getItem("personalDetails")!=null)
  //   //     this.personalDetails = JSON.parse(sessionStorage.getItem("personalDetails")as string)
  //   // // this.user = JSON.parse(localStorage.getItem('user')as string);
  //   // if(this.personalDetails==null || this.personalDetails==undefined){
  //   //   this.getEmployeeData(this.user);
  //   // }
  //   for(let i=0;i<(this.empHistory.length ? this.empHistory.length :Object.keys(this.empHistory).length);i++){
  //       let arr = this.empHistory[i]
  //       if(this.empHistory.length>i || Object.keys(this.empHistory).length>i) //&& this.accordions[i].includes(res[i].courseTitle))
  //       {
  //         // var startdate = arr.duration.split(",",6);
  //         // this.accordions.splice(i,1,res[i]);
  //         var startdate = (arr.duration.split(",",6));
  //         startdate = startdate[1].split(":",6)
  //         startdate = startdate[1].replace('"','')
  //         arr.startdate = startdate.slice(0, startdate.length - 3)
  //         var enddate = (arr.duration.split(",",6));
  //         enddate = enddate[0].split(":",6)
  //         enddate = enddate[1].replace('"','')
  //         arr.enddate = enddate.slice(0, enddate.length - 3)
  //         console.log("enddate : ",arr)
  //         this.empHistory[i] = arr;
  //       }
          
  //       else{
  //         var startdate = (arr.duration.split(",",6));
  //         startdate = startdate[1].split(":",6)
  //         startdate = startdate[1].replace('"','')
  //         arr.startdate = startdate.slice(0, startdate.length - 3)
  //         var enddate = (arr.duration.split(",",6));
  //         enddate = enddate[0].split(":",6)
  //         enddate = enddate[1].replace('"','')
  //         arr.enddate = enddate.slice(0, enddate.length - 3)
  //         console.log("enddate : ",arr)
  //         this.empHistory[i] = arr;
  //       }
  //       arr.startdate = new Date(arr.startdate);
  //       arr.enddate = new Date(arr.enddate);
  //       this.empHistory[i].duration = (Date.UTC(arr.enddate.getFullYear(), arr.enddate.getMonth(), arr.enddate.getDate()) - Date.UTC(arr.startdate.getFullYear(), arr.startdate.getMonth(), arr.startdate.getDate()) ) /(1000 * 60 * 60 * 24)
  //       console.log("years of experience",this.empHistory[i].duration);
  //       //new date(this.empHistory[i].enddate) - new date(this.empHistory[i].startdate);
  //       // sessionStorage.setItem("EmployerDetails",JSON.stringify(this.accordions));
  //     }
  // }
  // getEmployeeData(user:User,employeeId?:any){
  // this.loading = true;
  //    this.employeeService.getEmployeeDetails(employeeId!=undefined ? parseInt(employeeId, 10):user.id ).pipe(first())
  //   .subscribe({
  //     next:  (res:any) => {
  //       this.loading = false;
  //       this.personalDetails = res.obj.personalDetails;
  //       this.registrationDetails = res.obj.registration;//JSON.parse(sessionStorage.getItem('registration') as string)
  //       this.empHistory = res.obj.experienceDetails;
  //       if(this.personalDetails.imgSource==null){
  //         this.personalDetails.imgSource='../../../assets/images/user/user.jpg'
  //       }
  //       sessionStorage.setItem('personalDetails',JSON.stringify(this.personalDetails)as string)
  //       sessionStorage.setItem('documentDetails',JSON.stringify(res.obj.documentDetails)as string)
  //       sessionStorage.setItem('educationDetails',JSON.stringify(res.obj.educationDetails)as string)
  //       sessionStorage.setItem('experienceDetails',JSON.stringify(res.obj.experienceDetails)as string)
  //       sessionStorage.setItem('registration',JSON.stringify(res.obj.registration)as string)
  //       sessionStorage.setItem('signUpDetails',JSON.stringify(res.obj.signUpDetails)as string)

  //       this.toastr.success('Employee details fetch Successfully.....');
  //     },
  //     error: (error:any)=>{
  //       this.toastr.error(error);
  //     }
  //   })
  // }
  ngOnInit() {

    this.employeeId = this.route.snapshot.paramMap.get('id');
    console.log('Employee ID:', this.employeeId);
    // Check if personalDetails exists in sessionStorage or is already loaded
    const personalDetailsFromStorage = sessionStorage.getItem("personalDetails");
    if (personalDetailsFromStorage) {
      try {
        this.personalDetails = JSON.parse(personalDetailsFromStorage);
        if (!this.personalDetails.imgSource) {
          this.personalDetails.imgSource = './../assets/images/user/user.jpg';
        }
      } catch (error) {
        console.error('Error parsing personal details from session storage', error);
      }
    } else {
      this.getEmployeeData(this.user);
    }
  
    // Check if registration details are in sessionStorage
    const registrationFromStorage = sessionStorage.getItem('registration');
    if (registrationFromStorage) {
      try {
        this.registrationDetails = JSON.parse(registrationFromStorage);
      } catch (error) {
        console.error('Error parsing registration details from session storage', error);
      }
    }
  
    // If user roles are 'Super Admin' or 'Admin', check for employee ID in route parameters
    if (this.user && (this.user.roles === 'Super Admin' || this.user.roles === 'Admin')) {
      this.route.paramMap.subscribe(params => {
        const employeeId = params.get('id');
        if (employeeId) {
          this.employeeId = employeeId;
          this.getEmployeeData(this.user, this.employeeId);
        }
      });
    }
  
    // Processing employee history (empHistory)
    if (this.empHistory && Array.isArray(this.empHistory)) {
      this.empHistory.forEach((arr, i) => {
        // Split the duration and extract startdate and enddate
        if (arr.duration) {
          let [enddateStr, startdateStr] = arr.duration.split(",", 2);
          startdateStr = startdateStr.split(":")[1].replace('"', '').slice(0, -3);
          enddateStr = enddateStr.split(":")[1].replace('"', '').slice(0, -3);
  
          arr.startdate = new Date(startdateStr);
          arr.enddate = new Date(enddateStr);
  
          // Calculate the duration in days
          arr.duration = (Date.UTC(arr.enddate.getFullYear(), arr.enddate.getMonth(), arr.enddate.getDate()) -
            Date.UTC(arr.startdate.getFullYear(), arr.startdate.getMonth(), arr.startdate.getDate())) / (1000 * 60 * 60 * 24);
  
          console.log("Years of experience", arr.duration);
        }
      });
    }
  }
  
  getEmployeeData(user: User, employeeId?: any) {
    this.loading = true;
    const empId = (employeeId !== undefined && employeeId !== null) ? parseInt(employeeId, 10) : user.id;
  
    this.employeeService.getEmployeeDetails(empId).pipe(first())
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.personalDetails = res.obj.personalDetails;
          this.registrationDetails = res.obj.registration; //JSON.parse(sessionStorage.getItem('registration') as string)
          this.empHistory = res.obj.experienceDetails;
  
          if (this.personalDetails.imgSource == null) {
            this.personalDetails.imgSource = '../../../assets/images/user/user.jpg';
          }
  
          sessionStorage.setItem('personalDetails', JSON.stringify(this.personalDetails) as string);
          sessionStorage.setItem('documentDetails', JSON.stringify(res.obj.documentDetails) as string);
          sessionStorage.setItem('educationDetails', JSON.stringify(res.obj.educationDetails) as string);
          sessionStorage.setItem('experienceDetails', JSON.stringify(res.obj.experienceDetails) as string);
          sessionStorage.setItem('registration', JSON.stringify(res.obj.registration) as string);
          sessionStorage.setItem('signUpDetails', JSON.stringify(res.obj.signUpDetails) as string);
  
          this.toastr.success('Employee details fetched successfully!');
        },
        error: (error: any) => {
          this.toastr.error(error);
          this.loading = false;
        }
      });
  }
  
}
