import { Component } from '@angular/core';

@Component({
  selector: 'emp-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  registrationDetails = JSON.parse(sessionStorage.getItem('registration') as string)
  personalDetails = JSON.parse(sessionStorage.getItem("personalDetails")as string)  

  ngOnInit(){
    if(sessionStorage.getItem('registration')!=null)
        this.registrationDetails = JSON.parse(sessionStorage.getItem('registration') as string)
    if(sessionStorage.getItem("personalDetails")!=null)
        this.personalDetails = JSON.parse(sessionStorage.getItem("personalDetails")as string)  
  }
}
