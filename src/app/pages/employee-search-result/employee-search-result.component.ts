import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommanSearchEmployeeService, Employee } from 'src/app/service/CommanService/comman-search-employee.service';

@Component({
  selector: 'app-employee-search-result',
  templateUrl: './employee-search-result.component.html',
  styleUrls: ['./employee-search-result.component.css']
})

export class EmployeeSearchResultComponent {
[x: string]: any;
  searchResults:any[] = [];
  searchResults1:Employee | undefined;

  isIndivisualEmployee = false;
  constructor(private service:CommanSearchEmployeeService,private route:ActivatedRoute){}

  ngOnInit(){
    // this.searchResults1=undefined;
    // this.searchResults = [];
    // this.route.queryParams.subscribe((params:any) => {
    //     const encodedJsonString = params['data'];
    //     const decodedString = decodeURIComponent(params['data']);
    
    // // Check if the decoded string starts with '[' (indicating an array) or '{' (indicating an object)
    // if (decodedString.startsWith('[')) {
    //   // Parse the JSON array
    //   this.searchResults1=undefined;
    //   return this.searchResults = JSON.parse(decodedString);
    // } else if (decodedString.startsWith('{')) {
    //   // Parse the JSON object
    //   this.isIndivisualEmployee = true;
    //   this.searchResults = []
    //   return this.searchResults1 = JSON.parse(decodedString);
    // }
    // });
    // console.log(this.searchResults,this.searchResults1);
  }
  ngDoCheck(){
    this.searchResults1=undefined;
    this.searchResults = [];
    this.route.queryParams.subscribe((params:any) => {
      const encodedJsonString = params['data'];
      const decodedString = decodeURIComponent(params['data']);
  
  // Check if the decoded string starts with '[' (indicating an array) or '{' (indicating an object)
  if (decodedString.startsWith('[')) {
    // Parse the JSON array
    this.searchResults1=undefined;
    return this.searchResults = JSON.parse(decodedString);
  } else if (decodedString.startsWith('{')) {
    // Parse the JSON object
    this.isIndivisualEmployee = true;
    this.searchResults = []

    return this.searchResults1 = JSON.parse(decodedString);
  }
  });
  console.log(this.searchResults,this.searchResults1);
  }
}