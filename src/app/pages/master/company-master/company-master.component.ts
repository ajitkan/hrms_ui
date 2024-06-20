import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent {

  searchText :string ='';
  formGroup!: FormGroup;
  editMode: boolean = false;
  @ViewChild('formModal') formModal !: ElementRef<any>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      CompanyName: ['', Validators.required],
      TradingName: [''],
      RegistrationNumber: [''],
      Phone: [''],
      Email: ['', [Validators.email]],
      Website: [''],
      LocationID: [''],
      TaxNumber: [''],
      CompanyLogo: ['']
    });
  }

  // get email() {
  //   return this.formGroup.get('Email');
  // }
  onEmailBlur() {
    this.formGroup.get('Email')?.markAsTouched();
  }
  addCompany(){
    console.log('---------add company form --- ')
      const companyControl = this.formGroup.get('CompanyName');
      if (companyControl) {
        console.log("Company ID value before showing modal:", companyControl.value);
        const modal = new Modal(this.formModal.nativeElement);
        modal.show();
      } else {
        console.error("Company control is null!");
      }
   
  }

  isInvalidAndTouched(controlName: string): any {
    const control = this.formGroup.get(controlName);
    return control?.invalid && control?.touched;
  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    if (this.editMode) {
      this.submitEditCompanyForm();
    } else {
      this.submitAddCompanyForm();
    }
  }

  submitAddCompanyForm(): void {
    const companyData = this.formGroup.value;
    console.log('Add Company Data:', companyData);
    // Add your add company logic here
  }

  submitEditCompanyForm(): void {
    const companyData = this.formGroup.value;
    console.log('Edit Company Data:', companyData);
    // Add your edit company logic here
  }

  closePopup(): void {
    this.formGroup.reset();
    this.editMode = false;
  }

  cancelEdit(): void {
    this.closePopup();
  }

  openAddCompanyModal(): void {
    this.editMode = false;
  }

  openEditCompanyModal(companyData: any): void {
    this.editMode = true;
    this.formGroup.patchValue(companyData);
  }
}
