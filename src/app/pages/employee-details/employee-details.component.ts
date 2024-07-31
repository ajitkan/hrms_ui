import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanSearchEmployeeService } from 'src/app/service/CommanService/comman-search-employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  searchResults:any[] = [];
  constructor(private service:CommanSearchEmployeeService,private route:ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const encodedJsonString = params['data'];
      if (encodedJsonString) {
        this.searchResults = JSON.parse(decodeURIComponent(encodedJsonString));
      }
    });
    console.log(this.searchResults);
  }
}
