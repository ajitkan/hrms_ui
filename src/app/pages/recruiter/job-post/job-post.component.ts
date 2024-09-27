// import { DatePipe } from '@angular/common';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import * as bootstrap from 'bootstrap';
// import { Modal } from 'bootstrap'
// import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
// import { JobService } from 'src/app/service/job.service';

// @Component({
//   selector: 'app-job-post',
//   templateUrl: './job-post.component.html',
//   styleUrls: ['./job-post.component.css']
// })
// export class JobPostComponent {


//   @ViewChild('formModal') formModal !: ElementRef<any>;
//   @ViewChild('closeButton') closeButton !: ElementRef<any>;
//   addJobForm!: FormGroup;
//   jobs: any[] = [];
//   selectedJob: any;
//   editMode: boolean = false;
 
//   addMode!: boolean;
//   viewedJob!: any;
//   // Pagination
//   // jobs: any[] = []; // Replace with the appropriate type
//   page: number = 1;
//   itemsPerPage: number = 5;
//   // dropdownOpen: boolean = false;
//    // Pagination
//    searchText :string ='';
   
//   @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ElementRef;
//   jobIdToDelete: number | null = null;
 
//   @ViewChild('jobDetailsModal', { static: true }) jobDetailsModal!: ElementRef;
//   @ViewChild('toastrContainer')
//   toastrContainer!: ElementRef;
//   // @ViewChild(ToastContainerDirective, { static: true }) toastrContainer: ToastContainerDirective | undefined;
 
//   constructor(private formBuilder: FormBuilder,
//     private router: Router,
//     private toastr: ToastrService,
//     private jobService: JobService,
//     private datePipe: DatePipe) { }

   
//   ngOnInit(): void {
   
//     this.addJobForm = this.formBuilder.group({
//       Id:[],
//       Company: ['', Validators.required], 
//       JobTitle: ['', Validators.required], 
//       JobType: ['', Validators.required], 
//       JobCategory: [''], 
//       NoOfVacancy: [''], 
//       // PostedDate:[this.postedDate.toISOString()],
//       ClosingDate: [''], 
//       Gender: ['', Validators.required], 
//       MinExperience: ['', Validators.required], 
//       IsFeatured: ['', Validators.required],
//       Status: ['', Validators.required], 
//       ShortDescription: [''], 
//       LongDescription: [''] 
//     });
//     this.loadJobs();
//     // this.toastr.overlayContainer = this.toastrContainer;
//   }


// // sortDirection: { [key: string]: 'asc' | 'desc' } = {};

// // sort(prop: string): void {
// //   if (!this.sortDirection[prop] || this.sortDirection[prop] === 'desc') {
// //     this.sortDirection[prop] = 'asc';
// //   } else {
// //     this.sortDirection[prop] = 'desc';
// //   }

// //   this.jobs.sort((a, b) => {
// //     if (this.sortDirection[prop] === 'asc') {
// //       return a[prop] > b[prop] ? 1 : -1;
// //     } else {
// //       return a[prop] < b[prop] ? 1 : -1;
// //     }
// //   });
// // }

// // isSortedBy(prop: string, direction: string): boolean {
  
// //   return this.sortDirection[prop] === direction;
// // }


// setItemsPerPage(value: number) {
//   this.itemsPerPage = value;
// }

//   pageChange(newPage: number): void {
//     this.page = newPage;
//     // this.updatePaginatedJobs();
//   }
//   loadJobs() {
  
//     this.jobService.getAllJobs().subscribe(
//       (response: any) => {
//         this.jobs = response.data;
    
//       },
//       (error: any) => {
//         console.error('Error fetching jobs:', error);
//       }
//     );
//          console.log("get all Jobs ----> " , this.jobs);
//         //  this.updatePaginatedJobs();
         
//   }
//   addJobPopup() {
//     // this.toastr.success('popup is open')
//     const companyControl = this.addJobForm.get('Company');
//     if (companyControl) {
//       console.log("Company ID value before showing modal:", companyControl.value);
//       const modal = new Modal(this.formModal.nativeElement);
//       modal.show();
//     } else {
//       console.error("Company control is null!");
//     }
//   }
//   closePopup() {
//     // const modal=new Modal(this.closeButton.nativeElement);
//     this.closeButton.nativeElement.click();
//     console.log('close button callledd');
//     this.addJobForm.reset({Company :'', JobType:'',JobCategory:'',Gender:'',MinExperience:'',IsFeatured:'',Status:''});
    
//   }

// //   public findInvalidControls() {
// //     const invalid = [];
// //     const controls = this.addJobForm.controls;
// //     for (const name in controls) {
// //         if (controls[name].invalid) {
// //             invalid.push(name);
// //         }
// //     }
// //     return invalid;
// // }
// public findInvalidControls() {
//   const invalid = [];
//   const controls = this.addJobForm.controls;
//   for (const name in controls) {
//       if (controls[name].invalid && controls[name].errors?.['required']) {
//           invalid.push(name);
//       }
//   }
//   return invalid;
// }


//   submitAddJobForm() {
//     this.findInvalidControls();
  
//     if (!this.addJobForm.valid) {
//       console.log('Please fill in all required fields.');
//       alert('Please fill in all required fields.');
//       // this.toastr.error('Please fill in all required fields.', 'Error');
//       return;
//     }
  
//     // Handle null values for optional fields
//     const jobData = this.addJobForm.value;
//     jobData.JobCategory = jobData.JobCategory || '';
//     jobData.NoOfVacancy = jobData.NoOfVacancy || 0;
//     jobData.ShortDescription = jobData.ShortDescription || '';
//     jobData.LongDescription = jobData.LongDescription || '';
//     jobData.ClosingDate = jobData.ClosingDate || null;
  
//     if (this.editMode) {
//       this.jobService.updateJob(this.selectedJob.id, jobData).subscribe(
//         () => {
//           console.log('Job updated successfully!');
//           this.toastr.success('Success', 'Job updated successfully!');
//           this.addJobForm.reset({Company :'', JobType:'',JobCategory:'',Gender:'',MinExperience:'',IsFeatured:'',Status:''});
//           this.loadJobs();
//           this.closePopup();
//           // this.addJobForm.reset();
//         },
//         error => {
//           console.error('Error updating job', error);
//           // alert('An error occurred while updating the job. Please try again later.');
//           this.toastr.error('An error occurred while updating the job. Please try again later.', 'Error');
//         }
//       );
//     } else {
    
//       this.jobService.addJob(jobData).subscribe(
//         () => {
//           console.log('Job added successfully!');
//           this.toastr.success('Success', 'Job added successfully!');
//           this.addJobForm.reset();
//           this.loadJobs();
//           this.closePopup();
//         },
//         (error) => {
//           console.error('Error adding job', error);
//           // alert('An error occurred while adding the job. Please try again later.');
//           this.toastr.error('An error occurred while adding the job. Please try again later.', 'Error');
//         }
//       );
//     }
//   }
  
  

//   markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach(control => {
//       control.markAsTouched();

//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }
//   isInvalidAndTouched(controlName: string): boolean {
//     const control = this.addJobForm.get(controlName);
//     if (control) {
//       return control.invalid && control.touched;
//     } else {
//       return false;
//     }
//   }
  
//   editJob(job: any) {
//     this.selectedJob = job;
//     console.log("_____edit Job ", job);
  
  
//     console.log("ClosingDate: ", job.ClosingDate);
//     job.Id = job.id;
//     job.Company = job.company;
//     job.JobTitle = job.jobTitle;
//     job.JobType = job.jobType;
//     job.JobCategory = job.jobCategory;
//     job.NoOfVacancy = job.noOfVacancy;
//     job.ClosingDate = this.datePipe.transform(job.closingDate, 'yyyy-MM-dd'); 
//     //job.ClosingDate = job.closingDate;
//     job.Gender = job.gender;
//     job.MinExperience = job.minExperience;
//     job.IsFeatured = job.isFeatured;
//     job.Status = job.status;
//     job.ShortDescription = job.shortDescription;
//     job.LongDescription = job.longDescription;
  
  
//     this.addJobForm.patchValue(job);
  
//     console.log("Form Values after Patch: ", this.addJobForm.value);
    
//     this.editMode = true;
//     this.addJobPopup();
//     // this.addJobForm.reset();
//   }
 
//   cancelEdit() {
//     this.editMode = false;
//     this.closePopup();
//     this.addJobForm.reset({Company :'', JobType:'',JobCategory:'',Gender:'',MinExperience:'',IsFeatured:'',Status:''});
//   }

//   viewJob(job: any) {
//     this.viewedJob = job;
//     console.log('--------------->>> view job' ,job);
//     const modalElement = this.jobDetailsModal.nativeElement;
//     if (modalElement) {
//       const modal = new bootstrap.Modal(modalElement);
//       modal.show();
//     }
//   }

//  // deleteJob(jobId: number) {
//   //   debugger
//   //   if (confirm('Are you sure you want to delete this job?')) {
//   //     this.jobService.deleteJob(jobId).subscribe(
//   //       () => {
//   //         // Job deleted successfully
//   //         // Perform any additional actions here
//   //         console.log('Job deleted successfully');
//   //         this.loadJobs();
//   //       },
//   //       (error) => {
//   //         // Handle error
//   //         console.error('Error deleting job:', error);
//   //       }
//   //     );
//   //   }
//   // }
//   closeModal() {
//     const modalElement = this.jobDetailsModal.nativeElement;
//     if (modalElement) {
//       const modal = bootstrap.Modal.getInstance(modalElement);
//       modal?.hide();
//     }
//   }

//   deleteJob(jobId: number) {
//     this.jobIdToDelete = jobId;
//     const modal = new bootstrap.Modal(this.deleteConfirmationModal.nativeElement);
//     modal.show();
//   }

//   confirmDelete() {
//     if (this.jobIdToDelete !== null) {
//       this.jobService.deleteJob(this.jobIdToDelete).subscribe(
//         () => {
//           this.toastr.success('Job deleted successfully');
//           this.loadJobs();
//           this.closeDeleteModal();
//         },
//         error => {
//           console.error('Error deleting job:', error);
//           this.closeDeleteModal();
//         }
//       );
//     }
//   }

//   closeDeleteModal() {
//     const modal = bootstrap.Modal.getInstance(this.deleteConfirmationModal.nativeElement);
//     modal?.hide();
//   }
// }

 




