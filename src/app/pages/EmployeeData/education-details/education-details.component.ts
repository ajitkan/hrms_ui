import { Component } from '@angular/core';

@Component({
  selector: 'emp-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent {
  eduHistory=JSON.parse(sessionStorage.getItem("educationDetails") as string);
  ngOnInit(){
    if(sessionStorage.getItem("educationDetails")!=null){
      this.eduHistory=JSON.parse(sessionStorage.getItem("educationDetails") as string);
      for(let i=0;i<(this.eduHistory.length ? this.eduHistory.length :Object.keys(this.eduHistory).length);i++){
        let arr = this.eduHistory[i]
        if(this.eduHistory.length>i || Object.keys(this.eduHistory).length>i) //&& this.accordions[i].includes(res[i].courseTitle))
        {
          var startdate = (arr.duration.split(",",6));
              startdate = startdate[1].split(":",6)
              startdate = startdate[1].replace('"','')
              arr.startdate = startdate.slice(0, startdate.length - 3)
          var enddate = (arr.duration.split(",",6));
              enddate = enddate[0].split(":",6)
              enddate = enddate[1].replace('"','')
              arr.enddate = enddate.slice(0, enddate.length - 3)
              console.log("enddate : ",arr)
          this.eduHistory[i] = arr;
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
          this.eduHistory[i] = arr;
        }
        arr.startdate = new Date(arr.startdate);
        arr.enddate = new Date(arr.enddate);
        this.eduHistory[i].duration = (Date.UTC(arr.enddate.getFullYear(), arr.enddate.getMonth(), arr.enddate.getDate()) - Date.UTC(arr.startdate.getFullYear(), arr.startdate.getMonth(), arr.startdate.getDate()) ) /(1000 * 60 * 60 * 24)
        console.log("years of experience",this.eduHistory[i].duration);
      }
    }
    else{
      this.eduHistory = ""; 
    }
  }
}
