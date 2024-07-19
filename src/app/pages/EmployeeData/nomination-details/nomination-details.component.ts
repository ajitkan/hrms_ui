import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'emp-nominee-details',
  templateUrl: './nomination-details.component.html',
  styleUrls: ['./nomination-details.component.css']
})
export class NominationDetailsComponent {
  nomineeForm!: FormGroup;
  nomineeList:any []=[];
// nomineeList=JSON.parse(sessionStorage.getItem("nomineeList") as string);
constructor(private fb: FormBuilder){

}
ngOnInit(){
  if(sessionStorage.getItem("nomineeList")!=null){
    this.nomineeList=JSON.parse(sessionStorage.getItem("nomineeList") as string);
  }
  else{
    // this.nomineeList
  }

  this.nomineeForm = this.fb.group({
    name: ['', Validators.required],
    relationship: ['', Validators.required],
    dob: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
  });
}
addNominee(){
  alert("nominee added successfully")
  var list:any = this.nomineeForm.value;
  this.nomineeList.push(list);
}
}
