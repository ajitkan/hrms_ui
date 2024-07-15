import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee-service.service';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from 'src/app/service/designation.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-list-data.component.html',
  styleUrls: ['./employee-list-data.component.css']
})
export class EmployeeListDataComponent {
  @ViewChild('formModal') formModal !: ElementRef<any>;
  @ViewChild('closeButton') closeButton !: ElementRef<any>;
  emloyeeList:any;
  employeeHRMSList:any;
  loading:boolean=false;
  addEmployeeForm!: FormGroup;
  employeeForm: FormGroup;
  createEmp: boolean =false;
  selectedFiles: File[] = [];
  
  // items: any[] = []; // Replace with your actual data type
  // paginatedItems: any[] = [];
  // currentPage: number = 1;
  // itemsPerPage: number = 10; // Adjust the number of items per page as needed

  constructor(private http: HttpClient,private employeeService:EmployeeService,
    private formBuilder: FormBuilder,
    private router:Router,
    private accountService:ApiService,
    private toastr : ToastrService,
    private designationService: DesignationService,
    private fb: FormBuilder){
      this.employeeForm = this.fb.group({
        registration: this.fb.group({
          title: [''],
          firstName: [''],
          middleName: [''],
          lastName: [''],
          personalEmail: [''],
          email: [''],
          mob: [''],
          gender: [''],
          currentCountry: [''],
          currentState: [''],
          currentLocation: [''],
          maritalStatus: [''],
          skills: ['']
        }),
        signUpDetails: this.fb.group({
          //id: [''],
          roles: [''],
          email: [''],
          designation: ['']
        }),
        educationDetails: this.fb.array([]),
        experienceDetails: this.fb.array([]),
        personalDetails: this.fb.group({
          imgSource: [''],
          title: [''],
          firstName: [''],
          middleName: [''],
          lastName: [''],
          email: [''],
          dob: [''],
          ftitle: [''],
          ffname: [''],
          fmname: [''],
          flname: [''],
          currentAdd: [''],
          permanantAdd: [''],
          mob: [''],
          perMob: [''],
          altermob: [''],
          emergencyContactName: [''],
          emergencyContactNo: [''],
          emergencyContactRelation: [''],
          emergencyContactRelationOther: [''],
          altEmergencyContactName: [''],
          altEmergencyContactNo: [''],
          altEmergencyContactRelation: [''],
          altEmergencyContactRelationOther: [''],
          aadhar: [''],
          pan: [''],
          uan: [''],
          accountNo: [''],
          accountHolderName: [''],
          branchCENTRE: [''],
          ifsc: [''],
          branchName: [''],
          branchDISTRICT: [''],
          branchADDRESS: [''],
          branchCONTACT: [''],
          bloodGroup: [''],
          hobbies: [''],
          majorIllness: [''],
          allegicTo: [''],
          branchSTATE: [''],
          aboutMe: ['']
        }),
        // documentDetails: this.fb.array([])
      });
  }

  get educationDetails(): FormArray {
    return this.employeeForm.get('educationDetails') as FormArray;
  }

  addEducationDetail() {
    this.educationDetails.push(this.fb.group({
      college: [''],
      courseTitle: [''],
      courseType: [''],
      duration: [''],
      otherCourseSpecialization: [''],
      otherCourseTitle: [''],
      perOrcgpa: [''],
      specialization: ['']
    }));
  }

  get experienceDetails(): FormArray {
    return this.employeeForm.get('experienceDetails') as FormArray;
  }

  addExperienceDetail() {
    this.experienceDetails.push(this.fb.group({
      companyName: [''],
      designation: [''],
      rmName: [''],
      rmMob: [''],
      rmMail: [''],
      hrName: [''],
      hrMob: [''],
      hrMail: [''],
      duration: ['']
    }));
  }

  get documentDetails(): FormArray {
    return this.employeeForm.get('documentDetails') as FormArray;
  }

  // addDocumentDetail() {
  //   this.documentDetails.push(this.fb.group({
  //     fileName: [''],
  //     companyName: [''],
  //     docSource: [''],
  //     docType: [''],
  //     docDescription: ['']
  //   }));
  // }
  ngOnInit(){
    // this.employeeForm = this.formBuilder.group({
     
    //   EmployeeName: ['', Validators.required], 
    //   ShiftID: ['', Validators.required], 
    //   JoiningDate: ['', Validators.required], 
    //   Designation: ['', Validators.required], 
    //   RoleID: ['', Validators.required], 
    // });
    
    if(localStorage.getItem('EmployeeList')!=null || localStorage.getItem('EmployeeList')!=undefined){
      this.emloyeeList = JSON.parse(localStorage.getItem('EmployeeList')as string);
      this.employeeHRMSList = JSON.parse(localStorage.getItem('employeeHRMSList')as string);
      this.employeeHRMSList.forEach((employee:any)=>{
        if(employee.designation!=null || employee.designation!=''){
          employee.designation = this.designationService.getDesignationNameById(employee.designation)
        }
      })
    }
    else{
      this.getOnboardingEmployeeList();
      this.getHRMSEmployeeList();
    }
  }
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.emloyeeList.forEach((employee: { checked: any; }) => employee.checked = checked);
  }

  onCheckboxChange(event: any, index: number): void {
    this.emloyeeList[index].checked = event.target.checked;
  }

  createEmployee(emp?:any) {
    // this.toastr.success('popup is open') 
    this.createEmp = true;
    const EmployeeNameControl = this.employeeForm.get('EmployeeName');
    if (EmployeeNameControl!=null) {
      console.log("EmployeeName value before showing modal:", EmployeeNameControl.value);
      const modal = new Modal(this.formModal.nativeElement);
      modal.show();
      this.employeeForm.controls['EmployeeName'].setValue(emp.first_name+" "+emp.last_name);
      // this.router.navigate(['/create-employee'])
    } else {
      const modal = new Modal(this.formModal.nativeElement);
      modal.show();
      console.error("EmployeeName control is null!");
    }
  }
  closePopup() {
    // const modal=new Modal(this.closeButton.nativeElement);
    this.closeButton.nativeElement.click();
    console.log('close button callledd');
    this.employeeForm.reset({Company :'', JobType:'',JobCategory:'',Gender:'',MinExperience:'',IsFeatured:'',Status:''});
    
  }
  getOnboardingEmployeeList(){
    this.loading = true;
    this.employeeService.getAllOnboardEmployee().pipe(first())
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

  getHRMSEmployeeList(){
    this.loading = true;
    this.employeeService.getAllHRMSEmployee().pipe(first())
    .subscribe({
      next:(res:any) => {
        this.employeeHRMSList = res.obj;
        localStorage.setItem('employeeHRMSList',JSON.stringify(res.obj));
        this.loading = false;
      },
      error:(error:any)=>{
        console.log('error');
      }})
    
  }
  addEmployeesToHRMS(): void {
    const selectedEmployees = this.emloyeeList.filter((employee: { checked: any; }) => employee.checked)
    .map((employee: { id: any; }) => employee.id);
    let employeeData:any;
   
    this.employeeService.addToHRMS(selectedEmployees).pipe(first())
    .subscribe({
      next: (res: any) => {
        console.log('Submit successful:', res);
        // employeeData = res.obj;
        this.getHRMSEmployeeList();
        },
      error:(error: any) => {
        console.error('Submit failed:', error);
        }
  });

  }
  // submitAddJobForm(){
  //   this.loading = true;
  //   this.accountService.createEmployee(this.addEmployeeForm.value).pipe(first())
  //   .subscribe({
  //     next:  (res:any) => {
  //       this.loading = false;
  //       this.employeeHRMSList= res.obj;
  //     },
  //     error: (error:any)=>{
  //       this.toastr.error(error);
  //     }
  //   });
  // }

  // onSubmit() {
  //   if (this.employeeForm.valid) {
  //     this.accountService.createEmployee(this.employeeForm.value).pipe(first())
  //     .subscribe({
  //       next:  (res:any) => {
  //         this.loading = false;
  //         this.employeeHRMSList= res.obj;
  //       },
  //       error: (error:any)=>{
  //         this.toastr.error(error);
  //       }
  //     });
  //   }
  // }
  // addDocumentDetail(event: any) {
  //   const files = event.target.files as FileList;
  //   for (let i = 0; i < files.length; i++) {
  //     this.selectedFiles.push(files[i]);
  //     this.documentDetails.push(this.fb.group({
  //       fileName: [files[i].name],
  //       companyName: [''], // Add appropriate form controls for other fields
  //       docSource: [''],
  //       docType: [''],
  //       docDescription: ['']
  //     }));
  //   }
  // }

  // removeDocumentDetail(index: number) {
  //   this.documentDetails.removeAt(index);
  //   this.selectedFiles.splice(index, 1);
  // }

  onSubmit() {
    if (this.employeeForm.valid) {
    

          // Submit other employee details
          this.accountService.createEmployee(this.employeeForm.value).pipe(first())
              .subscribe({
                next:  (res:any) => {
                  this.loading = false;
                  this.employeeHRMSList= res.obj;
                },
                error: (error:any)=>{
                  this.toastr.error(error);
                }
              });
        } else {
          // Handle upload error
        }
      }//);
    //}
 // }
  uploadDocuments(): Observable<any> {
    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    return this.http.post<any>(`${environment.apiUrl}/EDM/upload-documents`, formData);
  }
}