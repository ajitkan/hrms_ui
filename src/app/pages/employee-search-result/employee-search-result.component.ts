import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommanSearchEmployeeService, Employee } from 'src/app/service/CommanService/comman-search-employee.service';

@Component({
  selector: 'app-employee-search-result',
  templateUrl: './employee-search-result.component.html',
  styleUrls: ['./employee-search-result.component.css']
})

export class EmployeeSearchResultComponent {
  searchResults:any[] = [];
  searchResults1:Employee | undefined;

  isIndivisualEmployee = false;
  constructor(private service:CommanSearchEmployeeService,private route:ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams.subscribe((params:any) => {
        const encodedJsonString = params['data'];
        const decodedString = decodeURIComponent(params['data']);
    
    // Check if the decoded string starts with '[' (indicating an array) or '{' (indicating an object)
    if (decodedString.startsWith('[')) {
      // Parse the JSON array
       this.searchResults = JSON.parse(decodedString);
    } else if (decodedString.startsWith('{')) {
      // Parse the JSON object
      this.searchResults1 = JSON.parse(decodedString);
    }
        // if (encodedJsonString) {
        //   this.searchResults = JSON.parse(decodeURIComponent(encodedJsonString));
        // }
      if(this.searchResults.length>0){
        return this.searchResults;
      }else{
        this.isIndivisualEmployee = true;
        return false;
      }
      //}
    });
    console.log(this.searchResults,this.searchResults1);
  }
}