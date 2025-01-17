import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DateTimeComponent } from '../shared-components/date-time/date-time.component';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Tooltip } from 'bootstrap';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
// import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Styles } from 'jspdf-autotable';

import 'jspdf-autotable';
declare module 'jspdf' {
  interface jsPDF {
    autoTable:any;
    // lastAutoTable?: { finalY: number }; // Extend jsPDF to include lastAutoTable
  }
}
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// declare module 'jspdf' {
//   interface jsPDF {
//     autoTable: any;
//   }
// }




// In your dashboard.component.ts or a separate model file

interface PayslipResponse {
  code: number;
  status: string;
  message: string;
  attendanceItems: PayslipItem[];  // Array of payslip items
}

interface PayslipItem {
  fieldCategory: string;
  fieldCode: string;
  fieldName: string;
  fieldValue: string;
}


// import { DateTimeComponent } from '../shared-components/date-time/date-time.component'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
  // imports: [DateTimeComponent]
})
export class DashboardComponent {

  isShow = false;
  isHolidayListOpen = false;
  // showCheckInButton = false;
  employeeCode = 'K-101'
  holidays: Array<{ name: string, date: string }> = [];
  displayedHolidays: { name: string; date: string }[] = [];
  upcomingHolidays: { name: string; date: string }[] = [];
  categoryCounts: { [key: string]: number } = {};
  loading = true;
  error: string | null = null;

  dailyEmployeeGreetings: any[] = [];
  isPopupVisible: boolean = false;
  selectedCategory: string = '';
  filteredEmployees: any[] = [];
  isDropdownOpen = false;
  calendarData: any[][] = [];
  selectedDay: any = null;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth(); // Track the displayed month (0-11)
  years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];
  Month: any;
  attendanceSummary: any;
  attendanceRecords: any[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  // payslipData: any[] = [];
  isLoading = false;
  errorMessage: string = '';
  currentMonthYear: string;

  employeeData: any = {};  // Define employeeData here
  salaryData: any = {}; 
  @ViewChild('payslipContainer') payslipContainer!: ElementRef;

  payslipData: any[] = []; // Full API response
  payslipHeader: any = {};
  allowances: any[] = [];
  deductions: any[] = [];
   summary: any = {};
    // Explicitly expose Object to the template
  Object = Object;
  // @Input()
  // summary!: { TotalNetSalary: number; }; 
  // netSalaryInWords: string = '';
  netSalaryInWords: string | null = null;
  payslipVisible: boolean = false; 

  selectedMonthYear: string = `${this.monthNames[new Date().getMonth()]} ${this.currentYear}`;
  constructor(private leaveService: LeaveService, private cdr: ChangeDetectorRef, private datePipe: DatePipe
    , private attendanceService: AuthService, private toastr: ToastrService
  ) {
    this.currentMonthYear = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
    this.processPayslipData();
    this.netSalaryInWords = this.convertNumberToWords(this.summary.TotalNetSalary);

    console.log('this.netSalaryInWords-->',this.netSalaryInWords);
  }

  ngOnInit(): void {

      // Assuming you need to pass the current month and year
const monthString = this.monthNames[this.currentMonth]; // Get month name
    this.employeeCode = this.leaveService.getEmployeeCode();
    this.loadAttendanceData(this.currentYear, this.currentMonth);
    this.fetchEmployeeGreetings();
    this.loadHolidays();
     this.fetchPayslip('EMP001', 'December', 2024);
    // this.fetchPayslip(this.employeeCode, monthString, this.currentYear);
    this.netSalaryInWords = this.convertNumberToWords(this.summary.TotalNetSalary);

    console.log('this.netSalaryInWords-->',this.netSalaryInWords);
    this.fetchNetSalary();
  }

  getFormattedNetSalaryInWords(): string {
    if (!this.netSalaryInWords) {
      return 'Not Available';
    }
    return this.netSalaryInWords
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  fetchNetSalary(): void {
    // Simulating a dynamic value (e.g., from API, form, or calculation)
    const dynamicSalary = 58500; // Replace this with the actual dynamic logic
    this.summary = { TotalNetSalary: dynamicSalary }; 
    console.log('this.summary',this.summary);
    
    // Update the summary object
    this.updateNetSalaryInWords();
  }

  updateNetSalaryInWords(): void {
    if (this.summary?.TotalNetSalary != null) {
      const number = Math.floor(this.summary.TotalNetSalary); // Convert to an integer
      this.netSalaryInWords = this.convertNumberToWords(number);
    }
  }
  convertNumberToWords(amount: number): string {
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 
      'eighteen', 'nineteen'
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const g = ['', 'thousand', 'million', 'billion', 'trillion'];

    if (amount === 0) return 'zero';

    let words = '';
    let group = 0;

    while (amount > 0) {
      const num = amount % 1000;
      if (num !== 0) {
        let str = '';
        const hundred = Math.floor(num / 100);
        const rest = num % 100;
        if (hundred > 0) {
          str += a[hundred] + ' hundred ';
        }
        if (rest > 0) {
          if (rest < 20) {
            str += a[rest] + ' ';
          } else {
            const tens = Math.floor(rest / 10);
            const units = rest % 10;
            str += b[tens] + ' ' + a[units] + ' ';
          }
        }
        words = str + g[group] + ' ' + words;
      }
      amount = Math.floor(amount / 1000);
      group++;
    }

    return words.trim();
  }
 
  
  // downloadPDF(): void {
  //   // Get the element to be converted into PDF
  //   // setTimeout(() => {
  //   //   this.payslipVisible = true; // Show the payslip content after 5 seconds
  //   // }, 2000);
  //   this.payslipVisible = true; 
  //   const element = this.payslipContainer.nativeElement;
  //   // this.payslipVisible = true; 
  //   // Temporarily hide the content from the UI to avoid showing it while generating PDF
  //    // Hide the payslip content on UI
  
  //   // Wait until the DOM is fully updated and rendered before generating the PDF
  //   setTimeout(() => {
  //     html2canvas(element).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
  //       // Add image to PDF and save it
  //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //       pdf.save('payslip.pdf');
  
  //       // After PDF is generated, make the payslip content visible again
  //       this.payslipVisible = false;
  //     });
  //   }, 200);  // Adding a slight delay to ensure the DOM has fully rendered before capturing the content
  // }
  downloadPDF(): void {
    // Show the payslip content to be captured for PDF
    this.payslipVisible = true; 
  
    const element = this.payslipContainer.nativeElement;
  
    // Add a slight delay to ensure the DOM is fully rendered
    setTimeout(() => {
      // Ensure the content is ready before rendering
      html2canvas(element, {
        scale: 2, // Improve resolution of the image
        backgroundColor: "#ffffff", // Set white background to ensure it captures the background
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('payslip.pdf');
        
        // After the PDF is generated, make the payslip content visible again
        this.payslipVisible = false;
      }).catch((error) => {
        console.error("Error generating PDF:", error);
      });
    }, 500); // A slightly longer delay (500ms) to ensure full DOM rendering before capturing
  }
  
 

  fetchPayslip(employeeCode: string, month: string, year: number): void {
    this.isLoading = true;
    const request = { employeeCode, attendanceMonth: month, attendanceYear: year };
  
    this.leaveService.getPayslipData(request).subscribe(
      (response: any) => {
        console.log('API Response:', response);
  
        // Check if the response has attendanceItems and if they contain data
        if (response && response[0]?.attendanceItems?.length > 0) {
          this.payslipData = response[0].attendanceItems;
          this.processPayslipData(); // Call the processPayslipData function here
          this.errorMessage = '';  // Clear any previous error message
        } else {
          this.errorMessage = 'No payslip data available for the selected period.';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching payslip:', error);
        this.errorMessage = 'Failed to fetch payslip data.';
        this.isLoading = false;
      }
    );
  }
  
  processPayslipData(): void {
    // Ensure `payslipData` exists and is valid
    if (!this.payslipData || this.payslipData.length === 0) {
      this.errorMessage = 'No payslip data available to process.';
      return;
    }
  
    // Extract Header details
    this.payslipHeader = this.extractDataByCategory('Header',true);
    console.log(' this.payslipHeader', this.payslipHeader);
    
  
    // Extract Allowances
    this.allowances = this.extractDataByCategory('Allowance');
    console.log('allowances', this.allowances);
    
  
    // Extract Deductions
    this.deductions = this.extractDataByCategory('Deduction');
  
    // Extract Summary (Footer)
    this.summary = this.extractDataByCategory('Footer', true);
    console.log('summary' ,this.summary);
    

  }
  
  // Helper function to extract data by category
  extractDataByCategory(category: string, asObject: boolean = false): any {
    const filteredData = this.payslipData.filter(item => item.fieldCategory === category);
  
    if (asObject) {
      // Convert array to an object with fieldCode as keys
      return filteredData.reduce((acc, curr) => {
        acc[curr.fieldCode] = curr.fieldValue;
        return acc;
      }, {});
    }
  console.log('filteredData--------->',filteredData);
  
    return filteredData;

  
    
  }
  

  // fetchPayslip(employeeCode: string, month: string, year: number): void {
  //   this.isLoading = true;
  //   const request = { employeeCode, attendanceMonth: month, attendanceYear: year };

  //   this.leaveService.getPayslipData(request).subscribe(
  //     (response: any) => {
  //       console.log('API Response:', response);

  //       // Check if the response has attendanceItems and if they contain data
  //       if (response && response[0]?.attendanceItems?.length > 0) {
  //         this.payslipData = response[0].attendanceItems;
  //         this.errorMessage = '';  // Clear any previous error message
  //       } else {
  //         this.errorMessage = 'No payslip data available for the selected period.';
  //       }
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Error fetching payslip:', error);
  //       this.errorMessage = 'Failed to fetch payslip data.';
  //       this.isLoading = false;
  //     }
  //   );
  // }

  // generatePayslipPDF(): jsPDF {
  //   const doc = new jsPDF();

  //   let yPosition = 10; // Starting position for text

  //   doc.setFontSize(12);
  //   doc.text('Payslip Details', 10, yPosition);

  //   yPosition += 10; // Move down to start writing data

  //   // Loop through payslip data and add text to PDF
  //   this.payslipData.forEach((item, index) => {
  //     const text = `${item.fieldName}: ${item.fieldValue}`;
  //     doc.text(text, 10, yPosition);
  //     yPosition += 10; // Move down for the next line

  //     // If the text overflows, move to the next page
  //     if (yPosition > 270) { // 270 is the page height limit
  //       doc.addPage();
  //       yPosition = 10;
  //     }
  //   });

  //   // Add a footer or additional information if needed
  //   doc.setFontSize(10);
  //   doc.text('Generated on ' + new Date().toLocaleDateString(), 10, yPosition + 10);

  //   return doc;
  // }

  // View PDF

 
  // generatePayslipPDF(): jsPDF {
  //   const doc = new jsPDF();
    
  //   // Set modern font
  //   doc.setFont('helvetica', 'normal');
  //   doc.setFontSize(12);
  
  //   // Add logo at top-left
  //   // const logo = 'data:image/png;base64,<valid_base64_logo_string>'; // Replace with valid base64 logo string
  //   // doc.addImage(logo, 'PNG', 10, 10, 30, 30);
  
  //   // Add Company Name and Payslip Title
  //   doc.setFontSize(16);
  //   doc.setTextColor(0, 0, 0);
  //   doc.text('Company Name', 50, 20); // Company Name
  //   doc.setFontSize(14);
  //   doc.text('Payslip for ' + this.payslipData[0]?.fieldValue, 50, 30); // Payroll month and year
  
  //   // Add a horizontal line after the header
  //   doc.setLineWidth(0.5);
  //   doc.line(10, 35, 200, 35);
  
  //   // Employee Details Section
  //   let yPos = 40;
  //   const headerData = this.payslipData.filter(item => item.fieldCategory === 'Header');
  //   doc.setFontSize(12);
  //   doc.setTextColor(50, 50, 50); // Gray for field names
  //   headerData.forEach((item, index) => {
  //     const y = yPos + (index * 10);
  //     doc.text(item.fieldName + ':', 10, y); // Field name
  //     doc.setTextColor(0, 0, 0); // Black for field value
  //     doc.text(item.fieldValue, 70, y); // Field value
  //   });
  
  //   // Add a shaded box for allowance section
  //   let allowanceYPos = yPos + headerData.length * 10 + 5;
  //   const allowanceData = this.payslipData.filter(item => item.fieldCategory === 'Allowance');
  //   doc.setFontSize(14);
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFillColor(200, 220, 240); // Light blue background for allowance section
  //   doc.rect(10, allowanceYPos - 5, 200, allowanceData.length * 7 + 5, 'F'); // Shaded box
  //   doc.text('Allowances', 10, allowanceYPos);
  
  //   allowanceYPos += 10; // Space after header
  //   doc.setFontSize(10);
  //   allowanceData.forEach((item, index) => {
  //     doc.text(item.fieldName, 10, allowanceYPos + (index * 7)); // Field name
  //     doc.text(item.fieldValue, 150, allowanceYPos + (index * 7), { align: 'right' }); // Field value, right aligned
  //   });
  
  //   // Add a line separator between sections
  //   allowanceYPos += allowanceData.length * 7 + 10;
  //   doc.setLineWidth(0.5);
  //   doc.line(10, allowanceYPos, 200, allowanceYPos); // Horizontal line
  
  //   // Deductions Section
  //   let deductionYPos = allowanceYPos + 5;
  //   const deductionData = this.payslipData.filter(item => item.fieldCategory === 'Deduction');
  //   doc.setFontSize(14);
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFillColor(240, 240, 240); // Light gray background for deduction section
  //   doc.rect(10, deductionYPos - 5, 200, deductionData.length * 7 + 5, 'F'); // Shaded box
  //   doc.text('Deductions', 10, deductionYPos);
  
  //   deductionYPos += 10; // Space after header
  //   doc.setFontSize(10);
  //   deductionData.forEach((item, index) => {
  //     doc.text(item.fieldName, 10, deductionYPos + (index * 7)); // Field name
  //     doc.text(item.fieldValue, 150, deductionYPos + (index * 7), { align: 'right' }); // Field value, right aligned
  //   });
  
  //   // Add a line separator between sections
  //   deductionYPos += deductionData.length * 7 + 10;
  //   doc.setLineWidth(0.5);
  //   doc.line(10, deductionYPos, 200, deductionYPos); // Horizontal line
  
  //   // Summary Section - Total Allowance, Deduction, and Net Salary
  //   let footerYPos = deductionYPos + 5;
  //   const footerData = this.payslipData.filter(item => item.fieldCategory === 'Footer');
  //   doc.setFontSize(14);
  //   doc.setTextColor(0, 0, 0);
  //   doc.setFillColor(240, 240, 240); // Light gray background for footer section
  //   doc.rect(10, footerYPos - 5, 200, 40, 'F'); // Shaded box for footer
  //   doc.text('Summary', 10, footerYPos);
  
  //   footerYPos += 10; // Space after header
  //   doc.setFontSize(10);
  //   let totalAllowance = parseFloat(footerData.find(item => item.fieldCode === 'TotalAllowance')?.fieldValue || '0');
  //   let totalDeduction = parseFloat(footerData.find(item => item.fieldCode === 'TotalDeduction')?.fieldValue || '0');
  //   let netSalary = totalAllowance - totalDeduction;
  
  //   doc.text('Total Allowance:', 10, footerYPos);
  //   doc.text(totalAllowance.toFixed(2), 150, footerYPos, { align: 'right' });
    
  //   footerYPos += 7;
  //   doc.text('Total Deduction:', 10, footerYPos);
  //   doc.text(totalDeduction.toFixed(2), 150, footerYPos, { align: 'right' });
  
  //   footerYPos += 7;
  //   doc.text('Net Salary:', 10, footerYPos);
  //   doc.setTextColor(0, 0, 255); // Blue for net salary
  //   doc.text(netSalary.toFixed(2), 150, footerYPos, { align: 'right' });
  
  //   // Add Signature Image (if available)
  //   const ruleValueField = footerData.find(item => item.fieldCode === 'RuleValue');
  //   if (ruleValueField) {
  //     const ruleData = JSON.parse(ruleValueField.fieldValue);
  //     const signatureUrl = ruleData.SignatureURL;
  //     if (signatureUrl) {
  //       doc.addImage(signatureUrl, 'JPEG', 50, footerYPos + 10, 40, 20); // Add signature image
  //     }
  //   }
  
  //   // Add Page Footer (Date and Page Number)
  //   doc.setFontSize(8);
  //   const date = new Date().toLocaleDateString();
  //   doc.text(`Generated on: ${date}`, 10, doc.internal.pageSize.height - 20); // Footer date
  //   const pageCount = doc.internal.pages.length;
  //   doc.text(`Page ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 20); // Page number
  
  //   return doc;
  // }

  // generatePayslipPDF() {
  //   const doc = new jsPDF();
  
  //   // First Table
  //   autoTable(doc, {
  //     head: [['Column 1', 'Column 2']],
  //     body: [
  //       ['Row 1 Col 1', 'Row 1 Col 2'],
  //       ['Row 2 Col 1', 'Row 2 Col 2'],
  //     ],
  //     headStyles: {
  //       fillColor: [50, 50, 50],
  //       textColor: [255, 255, 255],
  //       font: 'helvetica',
  //       fontStyle: 'bold',
  //       halign: 'center',
  //       valign: 'middle',
  //       fontSize: 10,
  //       overflow: 'linebreak',
  //     },
  //     columnStyles: {
  //       0: { halign: 'left', font: 'helvetica', fontStyle: 'normal', overflow: 'linebreak' },
  //       1: { halign: 'right', font: 'helvetica', fontStyle: 'normal', overflow: 'linebreak' },
  //     },
  //     styles: {
  //       fontSize: 10,
  //       cellPadding: 4,
  //       font: 'helvetica',
  //       fontStyle: 'normal',
  //       overflow: 'linebreak',
  //       halign: 'left',
  //       valign: 'middle',
  //     },
  //   });
  
  //   // const deductionsY = doc.lastAutoTable?.finalY + 10 || 10;

  
  //   // Second Table
  //   autoTable(doc, {
  //     // startY: deductionsY,
  //     head: [['Column 1', 'Column 2']],
  //     body: [
  //       ['Row 1 Col 1', 'Row 1 Col 2'],
  //       ['Row 2 Col 1', 'Row 2 Col 2'],
  //     ],
  //     headStyles: {
  //       fillColor: [50, 50, 50],
  //       textColor: [255, 255, 255],
  //       font: 'helvetica',
  //       fontStyle: 'bold',
  //       halign: 'center',
  //       valign: 'middle',
  //       fontSize: 10,
  //       overflow: 'linebreak',
  //     },
  //     columnStyles: {
  //       0: { halign: 'left', font: 'helvetica', fontStyle: 'normal', overflow: 'linebreak' },
  //       1: { halign: 'right', font: 'helvetica', fontStyle: 'normal', overflow: 'linebreak' },
  //     },
  //     styles: {
  //       fontSize: 10,
  //       cellPadding: 4,
  //       font: 'helvetica',
  //       fontStyle: 'normal',
  //       overflow: 'linebreak',
  //       halign: 'left',
  //       valign: 'middle',
  //     },
  //   });
  
  //   // const footerY = doc.lastAutoTable?.finalY + 10 || 10;
  
  //   return doc; // Return the jsPDF instance
  // }
  
 


// Method to generate the payslip PDF
// generatePayslipPDF(): jsPDF | undefined {
//   if (!this.payslipData || this.payslipData.length === 0) {
//     alert('No payslip data available');
//     return undefined;  // Return undefined when there's no data
//   }

//   const doc = new jsPDF();
//   const tableData = this.payslipData.map(item => [item.description, item.amount]);

//   // Add Header
//   doc.setFontSize(16);
//   doc.text('Payslip', 14, 20);

//   // Add Employee Information
//   doc.setFontSize(12);
//   doc.text(`Employee Code: ${this.employeeCode}`, 14, 30);
//   doc.text(`Month: ${this.Month}`, 14, 40);
//   doc.text(`Year: ${this.years}`, 14, 50);

//   // Add Table for Payslip Data
//   autoTable(doc, {
//     startY: 60,
//     head: [['Description', 'Amount']],
//     body: tableData,
//     headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255], font: 'helvetica', fontStyle: 'bold' },
//     columnStyles: { 0: { halign: 'left', font: 'helvetica' }, 1: { halign: 'right', font: 'helvetica' } },
//     styles: { fontSize: 10, cellPadding: 4, font: 'helvetica' },
//   });

//   return doc;  // Return the doc object
// }



// generatePayslipPDF(): jsPDF | undefined {
//   if (!this.payslipData || this.payslipData.length === 0) {
//     alert('No payslip data available');
//     return undefined;  // Return undefined when there's no data
//   }

//   const doc = new jsPDF();
  
//   // Add Header
//   doc.setFontSize(16);
//   doc.text('Payslip', 14, 20);

//   // Add Employee Information (this part will be dynamically populated based on data)
//   doc.setFontSize(12);
//   const headerData = this.payslipData.filter(item => item.fieldCategory === 'Header');
//   headerData.forEach((item, index) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, 30 + index * 10);
//   });

//   let currentY = 30 + headerData.length * 10 + 10; // Adjust for the header section

//   // Add Allowance Section
//   doc.setFontSize(12);
//   const allowanceData = this.payslipData.filter(item => item.fieldCategory === 'Allowance');
//   doc.text('Allowance:', 14, currentY);  // Title for allowance section
//   currentY += 10;
//   allowanceData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Add Deduction Section
//   doc.setFontSize(12);
//   const deductionData = this.payslipData.filter(item => item.fieldCategory === 'Deduction');
//   doc.text('Deductions:', 14, currentY);  // Title for deduction section
//   currentY += 10;
//   deductionData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Add Footer Section (Total Salary and other information)
//   doc.setFontSize(12);
//   const footerData = this.payslipData.filter(item => item.fieldCategory === 'Footer');
//   footerData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Optionally, add a line to separate sections visually
//   doc.setLineWidth(0.5);
//   doc.line(14, currentY, 200, currentY);  // Horizontal line after footer
//   currentY += 5; // Space after line

//   // Save the PDF
//   return doc;
// }



// generatePayslipPDF(): jsPDF | undefined {
//   if (!this.payslipData || this.payslipData.length === 0) {
//     alert('No payslip data available');
//     return undefined;  // Return undefined when there's no data
//   }

//   const doc = new jsPDF();

//   // Filter data based on fieldCategory
//   const headerData = this.payslipData.filter(item => item.fieldCategory === 'Header');
//   const allowanceData = this.payslipData.filter(item => item.fieldCategory === 'Allowance');
//   const deductionData = this.payslipData.filter(item => item.fieldCategory === 'Deduction');
//   const footerData = this.payslipData.filter(item => item.fieldCategory === 'Footer');

//   // Add Header
//   doc.setFontSize(16);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Payslip', 14, 20);

//   // Add Employee Information (this part will be dynamically populated based on data)
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'normal');
//   headerData.forEach((item, index) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, 30 + index * 10);
//   });

//   let currentY = 30 + headerData.length * 10 + 10; // Adjust for the header section

//   // Add Allowance Section
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Allowance:', 14, currentY);  // Title for allowance section
//   currentY += 10;
//   doc.setFont('helvetica', 'normal');
//   allowanceData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Add Deduction Section
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Deductions:', 14, currentY);  // Title for deduction section
//   currentY += 10;
//   doc.setFont('helvetica', 'normal');
//   deductionData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Add Footer Section (Total Salary and other information)
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Total Summary:', 14, currentY);  // Title for footer section
//   currentY += 10;
//   doc.setFont('helvetica', 'normal');
//   footerData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Add a line after the footer
//   doc.setLineWidth(0.5);
//   doc.line(14, currentY, 200, currentY);  // Horizontal line after footer
//   currentY += 5; // Space after line

//   // Define tableData
//   const tableData = allowanceData.concat(deductionData).map(item => [item.fieldName, item.fieldValue]);

//   // Add the Table Section
//   autoTable(doc, {
//     startY: currentY,
//     head: [['Description', 'Amount']],
//     body: tableData,
//     headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255], font: 'helvetica', fontStyle: 'bold' },
//     columnStyles: { 0: { halign: 'left', font: 'helvetica' }, 1: { halign: 'right', font: 'helvetica' } },
//     styles: { fontSize: 10, cellPadding: 4, font: 'helvetica' },
//   });

//   // Save the PDF
//   return doc;
// }

// generatePayslipPDF(): jsPDF | undefined {
//   if (!this.payslipData || this.payslipData.length === 0) {
//     alert('No payslip data available');
//     return undefined;  // Return undefined when there's no data
//   }

//   const doc = new jsPDF();

//   // Filter data based on fieldCategory
//   const headerData = this.payslipData.filter(item => item.fieldCategory === 'Header');
//   const allowanceData = this.payslipData.filter(item => item.fieldCategory === 'Allowance');
//   const deductionData = this.payslipData.filter(item => item.fieldCategory === 'Deduction');
//   const footerData = this.payslipData.filter(item => item.fieldCategory === 'Footer');

//   // Add Header Section (Company Name, Payslip Title)
//   doc.setFontSize(18);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Company Name', 14, 20);  // Replace with your company name

//   doc.setFontSize(14);
//   doc.setFont('helvetica', 'normal');
//   doc.text('Payslip', 14, 30);

//   // Employee Information (Dynamic Fields)
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'normal');
//   headerData.forEach((item, index) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, 40 + index * 10);
//   });

//   let currentY = 40 + headerData.length * 10 + 10; // Adjust Y after header section

//   // Allowance Section Title
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Allowance:', 14, currentY);
//   currentY += 10;
//   doc.setFont('helvetica', 'normal');
//   allowanceData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Deduction Section Title
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Deductions:', 14, currentY);
//   currentY += 10;
//   doc.setFont('helvetica', 'normal');
//   deductionData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Salary Summary Section
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Salary Summary:', 14, currentY);
//   currentY += 10;
//   doc.setFont('helvetica', 'normal');
//   footerData.forEach((item) => {
//     doc.text(`${item.fieldName}: ${item.fieldValue}`, 14, currentY);
//     currentY += 10;
//   });

//   // Draw a Line After the Salary Summary
//   doc.setLineWidth(0.5);
//   doc.line(14, currentY, 200, currentY);
//   currentY += 5;

//   // Prepare Data for Table (Allowance and Deduction)
//   const tableData = allowanceData.concat(deductionData).map(item => [item.fieldName, item.fieldValue]);

//   // Create the Table for Allowance and Deduction
//   doc.autoTable({
//     startY: currentY,
//     head: [['Description', 'Amount']],
//     body: tableData,
//     theme: 'striped',  // Use striped theme for table rows
//     headStyles: {
//       fillColor: [50, 50, 50],  // Dark background color for header
//       textColor: [255, 255, 255],  // White text color
//       font: 'helvetica',
//       fontStyle: 'bold',
//     },
//     columnStyles: {
//       0: { halign: 'left', fontSize: 10 },
//       1: { halign: 'right', fontSize: 10 },
//     },
//     styles: {
//       fontSize: 10,
//       cellPadding: 5,
//       font: 'helvetica',
//       halign: 'center',
//       valign: 'middle',
//     },
//     margin: { top: 10, left: 14, right: 14 },
//   });

//   // Save the PDF
//   return doc;
// }

// Function to convert number to words
// function numberToWords(num: number): string {
//   const a = [
//     '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
//     'Twenty', 'Twenty One', 'Twenty Two', 'Twenty Three', 'Twenty Four', 'Twenty Five', 'Twenty Six', 'Twenty Seven', 'Twenty Eight', 'Twenty Nine', 'Thirty', 'Thirty One'
//   ];
//   return a[num] || '';
// }

// generatePayslipPDF(): jsPDF | undefined {
//   if (!this.payslipData || this.payslipData.length === 0) {
//     alert('No payslip data available');
//     return undefined;
//   }

//   const doc = new jsPDF();
//   doc.setFontSize(16);
//   doc.text('Company Name', 14, 20);

//   // Payslip header information
//   doc.setFontSize(12);
//   doc.text(`Payslip for: John Doe`, 14, 30);
//   doc.text(`Employee Code: K-101`, 14, 40);
//   doc.text(`Month: January 2025`, 14, 50);

//   // Line separator
//   doc.setLineWidth(0.5);
//   doc.line(14, 55, 200, 55); // Horizontal line

//   // Add Payroll Days information
//   doc.setFontSize(12);
//   doc.text('Payroll Days:', 14, 60);
//   doc.text('Total Days: 31.0', 14, 70);
//   doc.text('Days Paid: 31.0', 14, 80);
//   doc.text('Arrear Days: 0', 14, 90);
//   doc.text('Absent Days: 0.0', 14, 100);

//   // Line separator for Payroll days
//   doc.line(14, 105, 200, 105); // Horizontal line

//   // Earnings Section
//   doc.text('Earnings', 14, 110);
//   doc.text('Earning Head', 14, 120);
//   doc.text('Total Amount', 150, 120);

//   // Fixed Earnings
//   const earningData = [
//     ['Basic', '₹ 15,183.0'],
//     ['HRA', '₹ 7,592.0'],
//     ['LTA', '₹ 1,265.0'],
//     ['Special Allowance', '₹ 5,125.0'],
//     ['Education Allowance', '₹ 200.0'],
//     ['Telephone Allowance', '₹ 1,000.0']
//   ];

//   // Use autoTable to format the earnings data
//   doc.autoTable({
//     startY: 130,
//     head: [['Earning Head', 'Total Amount']],
//     body: earningData,
//     headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255], font: 'helvetica', fontStyle: 'bold' },
//     columnStyles: { 0: { halign: 'left', font: 'helvetica' }, 1: { halign: 'right', font: 'helvetica' } },
//     styles: { fontSize: 10, cellPadding: 4, font: 'helvetica' },
//   });

//   // Deductions Section
//   doc.text('Deductions', 14, doc.autoTable.previous.finalY + 10);
//   doc.text('Deduction Head', 14, doc.autoTable.previous.finalY + 20);
//   doc.text('Total Amount', 150, doc.autoTable.previous.finalY + 20);

//   const deductionData = [
//     ['Professional Tax', '₹ 200.0'],
//     ['Provident Fund', '₹ 1,822.0']
//   ];

//   // Use autoTable to format the deductions data
//   doc.autoTable({
//     startY: doc.autoTable.previous.finalY + 30,
//     head: [['Deduction Head', 'Total Amount']],
//     body: deductionData,
//     headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255], font: 'helvetica', fontStyle: 'bold' },
//     columnStyles: { 0: { halign: 'left', font: 'helvetica' }, 1: { halign: 'right', font: 'helvetica' } },
//     styles: { fontSize: 10, cellPadding: 4, font: 'helvetica' },
//   });

//   // Gross Earnings and Deductions Section
//   const grossEarnings = '₹ 30,365.0';
//   const grossDeductions = '₹ 2,022.0';
//   const netSalary = '₹ 28,343.0';

//   doc.text('Gross Earnings', 14, doc.autoTable.previous.finalY + 20);
//   doc.text(grossEarnings, 150, doc.autoTable.previous.finalY + 20);
//   doc.text('Gross Deductions', 14, doc.autoTable.previous.finalY + 30);
//   doc.text(grossDeductions, 150, doc.autoTable.previous.finalY + 30);
//   doc.text('Net Salary', 14, doc.autoTable.previous.finalY + 40);
//   doc.text(netSalary, 150, doc.autoTable.previous.finalY + 40);

//   // Line separator for Net Salary
//   doc.line(14, doc.autoTable.previous.finalY + 45, 200, doc.autoTable.previous.finalY + 45); // Horizontal line

//   // Save the PDF
//   return doc; // Return the jsPDF object
// }
generatePayslipPDF(): jsPDF | undefined {
  if (!this.payslipData || this.payslipData.length === 0) {
    alert('No payslip data available');
    return undefined;
  }

  const doc = new jsPDF();

  // Header Section
  doc.setFontSize(16);
  doc.text('Company Name', 14, 20);

  doc.setFontSize(12);
  doc.text('Payslip', 14, 30);
  doc.text('Employee Name: John Doe', 14, 40);
  doc.text('Employee Code: K-101', 14, 50);
  doc.text('Month: January 2025', 14, 60);

  // Separator Line
  doc.setLineWidth(0.5);
  doc.line(14, 65, 200, 65);

  // Salary Details Heading
  doc.setFontSize(12);
  doc.text('Salary Details', 14, 75);

  // Salary Details Data
  const salaryData = [
    ['Basic Pay', '₹ 15,183.0'],
    ['HRA', '₹ 7,592.0'],
    ['Special Allowance', '₹ 5,125.0'],
    ['Gross Salary', '₹ 30,365.0'],
    ['Deductions', '₹ 2,022.0'],
    ['Net Salary', '₹ 28,343.0'],
  ];

  // AutoTable Configuration
  doc.autoTable({
    startY: 85,
    head: [['Component', 'Amount']],
    body: salaryData,
    headStyles: {
      fillColor: [50, 50, 50],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 100, halign: 'left' }, // Component column, increased width
      1: { cellWidth: 50, halign: 'right' }, // Amount column, adjusted width
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    tableWidth: 'auto', // Ensures the table adjusts width automatically
  });

  // Final Line Separator
  doc.line(14, doc.autoTable.previous.finalY + 10, 200, doc.autoTable.previous.finalY + 10);

  // Footer
  doc.setFontSize(10);
  doc.text('This is a system-generated payslip.', 14, doc.autoTable.previous.finalY + 20);

  return doc;
}





downloadPayslipPDF(): void {
  const doc = this.generatePayslipPDF();  // Get the PDF document

  if (doc) {
    doc.save('Payslip.pdf');  // Download the PDF file
  } else {
    alert('Failed to generate payslip PDF.');
  }
}


// downloadPayslipPDF(): void {
//   const doc = this.generatePayslipPDF();  // Get the PDF document
//   doc.save('Payslip.pdf');  // Download the PDF file
// }
  
  
  
  // Helper function to calculate net salary
  calculateNetSalary(earningsData: any[], deductionsData: any[]): number {
    const totalEarnings = earningsData.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const totalDeductions = deductionsData.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    return totalEarnings - totalDeductions;
  }
  
  
  // // viewPayslipPDF(): void {
  // //   const doc = this.generatePayslipPDF();
  // //   const pdfBlob = doc.output('blob');
  // //   const pdfUrl = URL.createObjectURL(pdfBlob);
  // //   window.open(pdfUrl, '_blank');
  // // }
  
  // // Download PDF
  // downloadPayslipPDF(): void {
  //   const doc = this.generatePayslipPDF();
  //   doc.save('Payslip.pdf');
  // }
  
  ngAfterViewInit() {
    const tooltipTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    tooltipTriggerList.forEach((tooltipTriggerEl: HTMLElement) => {
      new Tooltip(tooltipTriggerEl);  // Initialize Tooltip
    });
  }



  loadAttendanceData(year: number, month: number) {
    const payload = {
      employeeCode: this.employeeCode,
      month: (month + 1).toString(), // Convert zero-based month to 1-based
      year: year.toString(),
    };

    this.leaveService.getAttendanceData(payload).subscribe((response) => {
      if (response.code === 1 && response.status === 'Successful') {
        this.attendanceRecords = response.attendanceRecords;
        console.log('this.attendanceRecords-->', this.attendanceRecords);

        // Calculate the counts for each attendance status
        this.attendanceSummary = this.calculateAttendanceSummary(this.attendanceRecords);
        console.log('this.attendanceSummary ----', this.attendanceSummary);

        // Generate the calendar only after receiving the attendance records
        this.generateCalendar(year, month);

        // Assign the correct month name
        const monthIndex = response.attendanceRecords.length > 0
          ? new Date(response.attendanceRecords[0].attendanceDate).getMonth()
          : month;
        this.Month = this.monthNames[monthIndex]; // Directly use the month name

        // Trigger change detection manually if using OnPush strategy
        this.cdr.detectChanges();
      }
    });
  }

  calculateAttendanceSummary(records: any[]) {
    const summary = {
      present: 0,
      absent: 0,
      leaveApply: 0,
      halfDay: 0,
      leaveApproved: 0,
    };

    // Use a set to keep track of unique attendance dates
    const seenDates = new Set<string>();

    // Iterate through the records and count each status
    records.forEach(record => {
      const attendanceDate = record.attendanceDate; // Assuming attendanceDate is the unique date field

      // Check if this date has already been processed
      if (!seenDates.has(attendanceDate)) {
        // Mark this date as processed
        seenDates.add(attendanceDate);

        // Process the attendance status
        switch (record.finalStatusName.trim()) {  // Trimming any extra spaces
          case 'Present':
            summary.present++;
            break;
          case 'Absent':
            summary.absent++;
            break;
          case 'LeaveApplied':
            summary.leaveApply++;
            break;
          case 'Half day':
            summary.halfDay++;
            break;
          case 'LeaveApproved':
            summary.leaveApproved++;
            break;
          default:
            console.warn('Unknown status:', record.finalStatusName); // Log unexpected status names
            break;
        }
      }
    });

    console.log('Attendance Summary:', summary); // Log the calculated summary
    return summary;
  }


  generateCalendar(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const attendanceMap = new Map(
      this.attendanceRecords.map(record => [new Date(record.attendanceDate).toDateString(), record])
    );

    let date = new Date(firstDay);
    let week: any[] = [];
    this.calendarData = [];

    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) week.push(null);

    const statusMapping: { [key: string]: string } = {
      Present: '', Absent: '', Holiday: '', WeekOff: 'WO', NoStatus: '', HalfDay: 'HD', LeaveApplied: 'LA', LeaveApproved: 'LA'
    };

    while (date <= lastDay) {
      const todayString = date.toDateString();
      const attendanceRecord = attendanceMap.get(todayString);

      week.push({
        date: new Date(date),
        status: attendanceRecord ? statusMapping[attendanceRecord.finalStatusName] || attendanceRecord.finalStatusName : null,
        fullStatus: attendanceRecord?.finalStatusName || null,
        remark: attendanceRecord?.systemRemark || null,
        checkIn: attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord.finalStatusName)
          ? this.datePipe.transform(attendanceRecord.actualPunchInTime, 'HH:mm')
          : '',
        checkOut: attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord.finalStatusName)
          ? this.datePipe.transform(attendanceRecord.actualPunchOutTime, 'HH:mm')
          : ''
      });

      date.setDate(date.getDate() + 1);
      if (week.length === 7) {
        this.calendarData.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) week.push(null);
      this.calendarData.push(week);
    }
    console.log('Generated Calendar Data:', this.calendarData);
  }
  selectDay(day: any) {
    this.selectedDay = day;

    console.log('this.selectedDay---> ', this.selectedDay);

  }
  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }



  getDayClass(day: any): string {
    if (!day) return 'bg-light'; // Default class for empty cells
    // const classes: { [key: string]: boolean } = {};
    // if (day?.date && this.selectedDay?.date && this.isSameDate(day.date, this.selectedDay.date)) {
    //   classes['selected-day'] = true;
    // }
    switch (day.fullStatus) {
      case 'Holiday':
        return 'holiday';
      case 'WeekOff':
        return 'week';
      case 'NoStatus':
        return '';
      case 'HalfDay':
        return 'text-warning';
      case 'LeaveApproved':
        return 'text-success';
      case 'LeaveApplied':
        return 'text-primary';
      case 'Present':
        return 'text-black';
      case 'Absent':
        return 'text-danger';
      default:
        return '';
    }
  }

  // Function to fetch data and count categories
  fetchEmployeeGreetings(): void {
    this.leaveService.getDailyEmployeeGreetings().subscribe({
      next: (response) => {
        if (response.code === 1) {
          // this.countCategories(response.dailyEmployeeGreetings);
          this.dailyEmployeeGreetings = response.dailyEmployeeGreetings;
          this.countCategories(response.dailyEmployeeGreetings);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employee greetings';
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Function to count the categories from the response data
  countCategories(greetings: any[]): void {
    this.categoryCounts = greetings.reduce((counts, greeting) => {
      counts[greeting.category] = (counts[greeting.category] || 0) + 1;
      return counts;
    }, {});
  }
  // toggleHolidayList(event: Event): void {
  //   this.isHolidayListOpen = !this.isHolidayListOpen;
  //   event.stopPropagation(); // Prevent click from closing immediately
  // }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    // if (this.isDropdownOpen) {
    // this.isDropdownOpen = !this.isDropdownOpen;
    // }
    if (this.isHolidayListOpen) {
      this.isHolidayListOpen = false;
    }

    // if (this.isDropdownOpen) {
    //   this.isDropdownOpen = false;
    // }
  }






  toggleButtons(): void {
    this.isShow = !this.isShow;
    // event.preventDefault();
    // this.showCheckInButton = !this.showCheckInButton;

  }


  // loadHolidays(): void {
  //   this.leaveService.fetchHolidayDetails(this.employeeCode).subscribe((response:any) => {
  //     if (response.code === 1) {
  //       this.holidays = response.holidayList.map((holiday: { holidayName: any; date: any; }) => ({


  //         name: holiday.holidayName,
  //         date: holiday.date
  //       }));
  //       console.log('holiday-------->',this.holidays)
  //     }
  //   });
  // }
  loadHolidays(): void {
    this.leaveService.fetchHolidayDetails(this.employeeCode).subscribe((response: any) => {
      if (response.code === 1) {
        const today = new Date(); // Today's date

        // Map all holidays from response
        this.holidays = response.holidayList.map((holiday: { holidayName: string; date: string }) => ({
          name: holiday.holidayName,
          date: holiday.date
        }));

        // Filter upcoming holidays
        this.upcomingHolidays = this.holidays.filter(
          (holiday: { date: string }) => new Date(holiday.date) >= today
        );

        // Initially display only first 2 upcoming holidays
        this.displayedHolidays = this.upcomingHolidays.slice(0, 2);

        console.log('All holidays:', this.holidays);
        console.log('Upcoming holidays:', this.upcomingHolidays);
      }
    });
  }

  toggleHolidayList(event: Event): void {
    this.isHolidayListOpen = !this.isHolidayListOpen;

    if (this.isHolidayListOpen) {
      // Show all holidays when "View All" is clicked
      this.displayedHolidays = this.holidays;
    } else {
      // Collapse back to upcoming holidays
      this.displayedHolidays = this.upcomingHolidays.slice(0, 2);
    }

    event.stopPropagation(); // Prevent unwanted event bubbling
  }



  toggleDropdown(category: string): void {
    if (this.selectedCategory === category && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    } else {
      this.selectedCategory = category;
      this.filteredEmployees = this.dailyEmployeeGreetings.filter(
        (greeting) => greeting.category === category
      );
      // this.isDropdownOpen = true;
      this.isDropdownOpen = !this.isDropdownOpen;

    }
  }

  sendMessagesForCategory(): void {
    // Replace this with your API call to send messages
    console.log('Sending messages to:', this.filteredEmployees);
  }

  sendMessageToEmployee(employee: { nameOfEmployee: string; emailID: string }) {
    // this.isDropdownOpen = !this.isDropdownOpen;
    this.leaveService.sendEmployeeGreetings().subscribe(
      (response) => {
        console.log(`Message sent successfully:`, response);
        alert(`Message sent to ${employee.nameOfEmployee}!`);
      },
      (error) => {
        console.error(`Error sending message:`, error);
        alert(`Failed to send message. Please try again.`);
      }
    );
  }

  // getStatusColor(status: string): string {
  //   switch (status) {
  //     case 'Present':
  //       return '#4caf50'; // Green
  //     case 'Absent':
  //       return '#f44336'; // Red
  //     case 'Holiday':
  //       return '#2196f3'; // Blue
  //     case 'WeekOff':
  //       return '#0d6efd'; // Orange
  //     case 'HalfDay':
  //       return '#ffc107'; // Yellow
  //     case 'LeaveApproved':
  //       return '#8bc34a'; // Light Green
  //     case 'LeaveApplied':
  //       return '#03a9f4'; // Light Blue
  //     default:
  //       return '#e0e0e0'; // Gray for NoStatus or default
  //   }
  // }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Present':
        return '#4caf50'; // Green for Present
      case 'Absent':
        return '#f44336'; // Red for Absent
      case 'Holiday':
        return '#673ab7'; // Purple for Holiday
      case 'WeekOff':
        return '#0dcaf0'; // Olive for WeekOff (distinct from HalfDay and Absent)
      case 'HalfDay':
        return '#ffc107'; // Yellow for HalfDay
      case 'LeaveApproved':
        return '#80cbc1'; // Light Green for LeaveApproved (distinct from Present)
      case 'LeaveApplied':
        return '#e91e63'; // Cyan for LeaveApplied
      default:
        return '#e0e0e0'; // Gray for NoStatus or default
    }
  }

  // checkIn() {
  //   companyCode: 'KANINFOS',
  //    employeeCode: string, employeeID: number
  //   this.attendanceService.handleAttendance(companyCode, employeeCode, employeeID, 1);
  // }

  // checkOut(companyCode: string, employeeCode: string, employeeID: number) {
  //   this.attendanceService.handleAttendance(companyCode, employeeCode, employeeID, 2);
  // }
  checkIn() {
    const condition = true; // Replace with your condition logic
    // const companyCode = condition ? 'KANINFOS' : 'KANINFOSNEW';
    const companyCode = condition ? 'KANINFONEW' : 'KANINFOS';

    const employeeCode = 'K-101'; // Replace with actual hardcoded value
    const employeeID = 1; // Replace with actual hardcoded value
    debugger
    this.attendanceService.handleAttendance(companyCode, employeeCode, employeeID, 1);
  }

  // async checkIn() {
  //   const condition = true; // Replace with your condition logic
  //   const companyCode = condition ? 'KANINFOS' : 'KANINFOSNEW';

  //   const employeeCode = 'K-101'; // Replace with actual hardcoded value
  //   const employeeID = 1; // Replace with actual hardcoded value

  //   try {
  //     const response = await this.attendanceService.handleAttendance(companyCode, employeeCode, employeeID, 1);
  //     this.toastr.success('Check-in successful!', 'Success');
  //     console.log('Response:', response);
  //   } catch (error) {
  //     this.toastr.error('Failed to check-in', 'Error');
  //     console.error('Error:', error);
  //   }
  // }


  checkOut() {
    const condition = true; // Replace with your condition logic
    const companyCode = condition ? 'KANINFONEW' : 'KANINFOS';

    const employeeCode = 'K-101'; // Replace with actual hardcoded value
    const employeeID = 1; // Replace with actual hardcoded value

    debugger;
    this.attendanceService.handleAttendance(companyCode, employeeCode, employeeID, 2);
  }

}



