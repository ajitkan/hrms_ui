import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee-service.service';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap'

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-list-data.component.html',
  styleUrls: ['./employee-list-data.component.css']
})
export class EmployeeListDataComponent {
  @ViewChild('formModal') formModal !: ElementRef<any>;
  @ViewChild('closeButton') closeButton !: ElementRef<any>;
  emloyeeList:any;
  loading:boolean=false;
  addEmployeeForm!: FormGroup;
  
  // items: any[] = []; // Replace with your actual data type
  // paginatedItems: any[] = [];
  // currentPage: number = 1;
  // itemsPerPage: number = 10; // Adjust the number of items per page as needed

  constructor(private employeeService:EmployeeService,private formBuilder: FormBuilder, ){
  }
  ngOnInit(){
    this.addEmployeeForm = this.formBuilder.group({
     
      EmployeeName: ['', Validators.required], 
      ShiftID: ['', Validators.required], 
      JoiningDate: ['', Validators.required], 
      Designation: ['', Validators.required], 
      RoleID: ['', Validators.required], 
    });
    
    if(localStorage.getItem('EmployeeList')!=null || localStorage.getItem('EmployeeList')!=undefined){
      this.emloyeeList = JSON.parse(localStorage.getItem('EmployeeList')as string);
    }
    else{
      this.getEmployeeList();
    }
    // this.items = this.generateDummyData(); // Replace with your actual data fetching method
    // this.paginateItems();
  }
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.emloyeeList.forEach((employee: { checked: any; }) => employee.checked = checked);
  }

  onCheckboxChange(event: any, index: number): void {
    this.emloyeeList[index].checked = event.target.checked;
  }

  // onPageChange(page: number) {
  //   this.currentPage = page;
  //   this.paginateItems();
  // }

  // paginateItems() {
  //   const start = (this.currentPage - 1) * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   this.paginatedItems = this.items.slice(start, end);
  // }

  // generateDummyData(): any[] {
  //   // Generate some dummy data for demonstration purposes
  //   let data = [];
  //   for (let i = 1; i <= 100; i++) {
  //     data.push({ id: i, name: `Item ${i}` });
  //   }
  //   return data;
  // }

  createEmployee() {
    // this.toastr.success('popup is open')
    const EmployeeNameControl = this.addEmployeeForm.get('EmployeeName');
    if (EmployeeNameControl) {
      console.log("EmployeeName value before showing modal:", EmployeeNameControl.value);
      const modal = new Modal(this.formModal.nativeElement);
      modal.show();
    } else {
      console.error("EmployeeName control is null!");
    }
  }
  closePopup() {
    // const modal=new Modal(this.closeButton.nativeElement);
    this.closeButton.nativeElement.click();
    console.log('close button callledd');
    this.addEmployeeForm.reset({Company :'', JobType:'',JobCategory:'',Gender:'',MinExperience:'',IsFeatured:'',Status:''});
    
  }
  getEmployeeList(){
    this.loading = true;
    this.employeeService.getAllEmployee().pipe(first())
    .subscribe({
      next:(res:any) => {
        this.emloyeeList = res.obj;
        localStorage.setItem('EmployeeList',JSON.stringify(res.obj));
        this.loading = false;
      },
      error:(error:any)=>{
        console.log('error');
      }})
  }
  submitSelectedEmployees(): void {
    const selectedEmployees = this.emloyeeList.filter((employee: { checked: any; }) => employee.checked);
    // console.log('Selected Employees:', selectedEmployees);
    
    this.employeeService.addToHRMS(selectedEmployees).subscribe(
      (res: any) => {
        console.log('Submit successful:', res);
        },
      (error: any) => {
        console.error('Submit failed:', error);
        }
    );

  }
}