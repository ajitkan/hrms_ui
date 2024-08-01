import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: ''
  };

  constructor() { }

  ngOnInit(): void {
    // Fetch the profile data from the backend and bind it to the profile object
    this.fetchProfileData();
  }

  fetchProfileData() {
   
    // this.http.get('/api/profile').subscribe(data => {
    //   this.profile = data;
    // });

    // Simulate fetching data
    setTimeout(() => {
      this.profile = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        designation: 'Software Engineer'
      };
    }, 1000);
  }

  onSubmit() {
    
    console.log('Form submitted:', this.profile);
  }
}
