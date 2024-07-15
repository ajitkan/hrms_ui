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
  employeeId: any;
  loading: boolean = false;
  //  empHistory:any;

  collapsedStates: { [key: string]: boolean } = {
    EDSSection: true,
    EHistory: true,
    Doc: true,
    Contact: true,
    Education: true,
    Bank: true
  };
  //  employeeList:any;
  // personalDetails =
  // {
  //                     "status":"200",
  //                     "message":"",
  //                     "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYmYiOjE3MTc0ODgzMDksImV4cCI6MTcxNzQ5MTkwOSwiaWF0IjoxNzE3NDg4MzA5fQ.TwoIOstb84CzXBOJpsKZnX83g4HHAEHXrj0DCsXuOkE",
  //                     "obj":
  //                         {
  //                           "id":1,
  //                           "imgSource":"data:image/jpeg;base64,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",
  //                           "title":"mr",
  //                           "first_name":"GAURAV",
  //                           "middle_name":"BALASAHEB",
  //                           "last_name":"kale",
  //                           "email":"gaurav.kale1@kaninfos.com",
  //                           "dob":"1994-08-19T18:30:00.000Z",
  //                           "ftitle":"mr",
  //                           "ffname":"BALASAHEB",
  //                           "fmname":"PUNJAJI",
  //                           "flname":"KALE",
  //                           "currentAdd":"{\"Address1\":\"ABC\",\"Address2\":\"ABC\",\"City\":\"Nashik\",\"State\":\"IN-MH\",\"Country\":\"IN\",\"pincode\":\"422103\"}",
  //                           "permanantAdd":"{\"Address1\":\"ABC\",\"Address2\":\"ABC\",\"City\":\"Mumbai\",\"State\":\"IN-MH\",\"Country\":\"IN\",\"pincode\":\"400709\"}",
  //                           "mob":8766570745,
  //                           "perMob":9889898989,
  //                           "altermob":8787778787,
  //                           "emergencyContactName":"BALASAHEB KALE",
  //                           "emergencyContactNo":8898989898,
  //                           "emergencyContactRelation":"Father",
  //                           "emergencyContactRelationOther":"",
  //                           "altEmergencyContactName":"VISHAL KALE",
  //                           "altEmergencyContactNo":8778778887,
  //                           "altEmergencyContactRelation":"Brother",
  //                           "altEmergencyContactRelationOther":"",
  //                           "aadhar":"676767676767",
  //                           "pan":"CUUPK6412Q",
  //                           "uan":"667767667667",
  //                           "account_No":"675677786768",
  //                           "account_holderName":"GAURAV KALE",
  //                           "branchCENTRE":"NASIK",
  //                           "ifsc":"CNRB0005607",
  //                           "branchName":"SINNAR",
  //                           "branchDISTRICT":"NASIK",
  //                           "branchADDRESS":"MAHALAXMI HEIGHTS DAMODAR NIWAS LAL CHOWK SINNAR NASIK PIN 422103",
  //                           "branchCONTACT":"+912025520717",
  //                           "branchSTATE":"MAHARASHTRA",
  //                           "bloodGroup":"O+ve","hobbies":"\"[\\\"READING\\\",\\\"HIKING\\\",\\\"RIDING\\\"]\"",
  //                           "majorIllness":"\"[\\\"NA\\\"]\"",
  //                           "allegicTo":"\"[\\\"NA\\\"]\"",
  //                           "regId":1,
  //                           "status":true,
  //                           "aboutMe":"I am a dedicated, organized and methodical individual. I have good interpersonal skills, am an excellent team worker and am keen and very willing to learn.",
  //                           "allowToEdit":false
  //                       }
  //   }
  // user!:User;
  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService, 
              private route: ActivatedRoute) 
              {  }
  
      registrationDetails = JSON.parse(sessionStorage.getItem('registration') as string)
      personalDetails = JSON.parse(sessionStorage.getItem("personalDetails") as string)
      user = JSON.parse(localStorage.getItem('user') as string);
      employeeList = JSON.parse(localStorage.getItem('EmployeeList') as string);
      empHistory = JSON.parse(localStorage.getItem('experienceDetails') as string);

  ngOnInit() {
    if (this.personalDetails != null || sessionStorage.getItem("personalDetails") != null) {
      this.personalDetails = JSON.parse(sessionStorage.getItem("personalDetails") as string)
      if (this.personalDetails.imgSource == null) {
        this.personalDetails.imgSource = './../assets/images/user/user.jpg'
      }
    }
    else {
      this.getEmployeeData(this.user);
    }
    if (sessionStorage.getItem('registration') != null) {
      this.registrationDetails = JSON.parse(sessionStorage.getItem('registration') as string)
    }
    // }
    if (this.user != null && (this.user.roles == 'Super Admin' || this.user.roles == 'Admin'))
      this.route.paramMap.subscribe(params => {
        if (params.has('id')) {
          this.employeeId = params.get('id');
          this.getEmployeeData(this.user, this.employeeId);
        }
      });

      if (sessionStorage.getItem('experienceDetails') != null) {
        this.empHistory = JSON.parse(sessionStorage.getItem('experienceDetails') as string)
      }
      // }
      if (this.user != null && (this.user.roles == 'Super Admin' || this.user.roles == 'Admin'))
        this.route.paramMap.subscribe(params => {
          if (params.has('id')) {
            this.employeeId = params.get('id');
            this.getEmployeeData(this.user, this.employeeId);
          }
        });

    
    for (let i = 0; i < (this.empHistory.length ? this.empHistory.length : Object.keys(this.empHistory).length); i++) {
      let arr = this.empHistory[i]
      if (this.empHistory.length > i || Object.keys(this.empHistory).length > i) //&& this.accordions[i].includes(res[i].courseTitle))
      {
        // var startdate = arr.duration.split(",",6);
        // this.accordions.splice(i,1,res[i]);
        var startdate = (arr.duration.split(",", 6));
        startdate = startdate[1].split(":", 6)
        startdate = startdate[1].replace('"', '')
        arr.startdate = startdate.slice(0, startdate.length - 3)
        var enddate = (arr.duration.split(",", 6));
        enddate = enddate[0].split(":", 6)
        enddate = enddate[1].replace('"', '')
        arr.enddate = enddate.slice(0, enddate.length - 3)
        console.log("enddate : ", arr)
        this.empHistory[i] = arr;
      }

      else {
        var startdate = (arr.duration.split(",", 6));
        startdate = startdate[1].split(":", 6)
        startdate = startdate[1].replace('"', '')
        arr.startdate = startdate.slice(0, startdate.length - 3)
        var enddate = (arr.duration.split(",", 6));
        enddate = enddate[0].split(":", 6)
        enddate = enddate[1].replace('"', '')
        arr.enddate = enddate.slice(0, enddate.length - 3)
        console.log("enddate : ", arr)
        this.empHistory[i] = arr;
      }
      arr.startdate = new Date(arr.startdate);
      arr.enddate = new Date(arr.enddate);
      this.empHistory[i].duration = (Date.UTC(arr.enddate.getFullYear(), arr.enddate.getMonth(), arr.enddate.getDate()) - Date.UTC(arr.startdate.getFullYear(), arr.startdate.getMonth(), arr.startdate.getDate())) / (1000 * 60 * 60 * 24)
      console.log("years of experience", this.empHistory[i].duration);
      //new date(this.empHistory[i].enddate) - new date(this.empHistory[i].startdate);
      // sessionStorage.setItem("EmployerDetails",JSON.stringify(this.accordions));
    }
  }
  getEmployeeData(user: User, employeeId?: any) {
    this.loading = true;
    this.employeeService.getEmployeeDetails(employeeId != undefined ? parseInt(employeeId, 10) : user.id).pipe(first())
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.personalDetails = res.obj.personalDetails;
          this.registrationDetails = res.obj.registration;//JSON.parse(sessionStorage.getItem('registration') as string)
          this.empHistory = res.obj.experienceDetails;
          if (this.personalDetails.imgSource == null) {
            this.personalDetails.imgSource = '../../../assets/images/user/user.jpg'
          }
          sessionStorage.setItem('personalDetails', JSON.stringify(this.personalDetails) as string)
          sessionStorage.setItem('documentDetails', JSON.stringify(res.obj.documentDetails) as string)
          sessionStorage.setItem('educationDetails', JSON.stringify(res.obj.educationDetails) as string)
          sessionStorage.setItem('experienceDetails', JSON.stringify(res.obj.experienceDetails) as string)
          sessionStorage.setItem('registration', JSON.stringify(res.obj.registration) as string)
          sessionStorage.setItem('signUpDetails', JSON.stringify(res.obj.signUpDetails) as string)

          this.toastr.success('Employee details fetch Successfully.....');
        },
        error: (error: any) => {
          this.toastr.error(error);
        }
      })
  }
}
