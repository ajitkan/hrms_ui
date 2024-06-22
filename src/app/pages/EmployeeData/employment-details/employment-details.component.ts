import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'emp-employement-history',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.css']
})
export class EmploymentDetailsComponent {
  empHistory:any;
  employerDetailsform = new FormGroup({

        companyName : new FormControl('',[Validators.required]),
        designation:new FormControl('',[Validators.required]),
        rmName:new FormControl('',[Validators.required]),
        rmMail:new FormControl('',[Validators.required]),
        rmMob:new FormControl('',[Validators.required]),
        hrName:new FormControl('',[Validators.required]),
        hrMail:new FormControl('',[Validators.required]),
        hrMob:new FormControl('',[Validators.required])})
  constructor(private formBuilder: FormBuilder){}
  ngOnInit(){
    if(sessionStorage.getItem('experienceDetails')!=null){
      this.empHistory = JSON.parse(sessionStorage.getItem('experienceDetails') as string);
      console.log("history",this.empHistory);

      for(let i=0;i<(this.empHistory.length ? this.empHistory.length :Object.keys(this.empHistory).length);i++){
        let arr = this.empHistory[i]
        if(this.empHistory.length>i || Object.keys(this.empHistory).length>i) //&& this.accordions[i].includes(res[i].courseTitle))
        {
          // var startdate = arr.duration.split(",",6);
          // this.accordions.splice(i,1,res[i]);
          var startdate = (arr.duration.split(",",6));
          startdate = startdate[1].split(":",6)
          startdate = startdate[1].replace('"','')
          arr.startdate = startdate.slice(0, startdate.length - 3)
          var enddate = (arr.duration.split(",",6));
          enddate = enddate[0].split(":",6)
          enddate = enddate[1].replace('"','')
          arr.enddate = enddate.slice(0, enddate.length - 3)
          console.log("enddate : ",arr)
          this.empHistory[i] = arr;
        }
          
        else{
          var startdate = (arr.duration.split(",",6));
          startdate = startdate[1].split(":",6)
          startdate = startdate[1].replace('"','')
          arr.startdate = startdate.slice(0, startdate.length - 3)
          var enddate = (arr.duration.split(",",6));
          enddate = enddate[0].split(":",6)
          enddate = enddate[1].replace('"','')
          arr.enddate = enddate.slice(0, enddate.length - 3)
          console.log("enddate : ",arr)
          this.empHistory[i] = arr;
        }
        arr.startdate = new Date(arr.startdate);
        arr.enddate = new Date(arr.enddate);
        this.empHistory[i].duration = (Date.UTC(arr.enddate.getFullYear(), arr.enddate.getMonth(), arr.enddate.getDate()) - Date.UTC(arr.startdate.getFullYear(), arr.startdate.getMonth(), arr.startdate.getDate()) ) /(1000 * 60 * 60 * 24)
        console.log("years of experience",this.empHistory[i].duration);
        //new date(this.empHistory[i].enddate) - new date(this.empHistory[i].startdate);
        // sessionStorage.setItem("EmployerDetails",JSON.stringify(this.accordions));
      }
    }
    else{
      // this.employerDetailsform = this.formBuilder.group({
      //   companyName:['',Validators.required],
      //   designation:['',Validators.required],
      //   rmName:['',Validators.required],
      //   rmMail:['',Validators.required],
      //   rmMob:['',Validators.required],
      //   hrName:['',Validators.required],
      //   hrMail:['',Validators.required],
      //   hrMob:['',Validators.required]
      // });
    }
  }
  createEmployee(){
    alert("employee created....")
  }
}
