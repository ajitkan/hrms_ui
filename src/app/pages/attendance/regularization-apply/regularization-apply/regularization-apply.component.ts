import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-regularization-apply',
  templateUrl: './regularization-apply.component.html',
  styleUrls: ['./regularization-apply.component.css']
})
export class RegularizationApplyComponent {

  attendanceDate: string = ''; 
  startTime: string = '';     
  endTime: string = '';         
  previousPunchIn: string = '';   
  previousPunchOut: string = ''; 
  approvalLevel: string = '';
  approverName: string = ''; 
  regularizationForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  
  employeeCode: string = '';   
  token: string = '';         
  allCount:any = 1;
  openCount:any =1;
  approvedCount:any= 0;
  declinedCount:any = 0;
  cancelledCount:any =0;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployeeCodeFromToken(); 

    // Initialize the form with one attendance row
    this.regularizationForm = this.fb.group({
      attendanceDetails: this.fb.array([this.createAttendanceRow()])
    });
  }

  get attendanceDetails(): FormArray {
    return this.regularizationForm.get('attendanceDetails') as FormArray;
  }

  createAttendanceRow(): FormGroup {
    return this.fb.group({
      timeIn: [''],
      timeOut: [''],
      remark: ['']
    });
  }

  addAttendanceRow(): void {
    this.attendanceDetails.push(this.createAttendanceRow());
  }

  removeAttendanceRow(index: number): void {
    if (this.attendanceDetails.length > 1) {
      this.attendanceDetails.removeAt(index);
    }
  }

  resetForm(): void {
    this.regularizationForm.reset();
    this.attendanceDetails.clear();
    this.addAttendanceRow(); // Reset form to a single row
  }

  // Get employee code from the token stored in localStorage
  getEmployeeCodeFromToken(): void {
    this.token = JSON.parse(localStorage.getItem('token') as string); // Retrieve token from localStorage
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token);  // Decode token
      this.employeeCode = decodedToken.unique_name;     // Extract employeeCode from the token
      console.log('Employee Code:', this.employeeCode); // Debug: print employee code
    } else {
      this.errorMessage = 'No token found';
    }
  }

  // Call API to fetch punch details based on the selected date and employee code

  
  // fetchPunchingDetails(): void {
  //   const url = `https://localhost:7254/UserDetails/FetchPunchingDetails`;
  
  //   const formattedDate = new Date(this.attendanceDate).toISOString().split('T')[0]; // Ensures 'YYYY-MM-DD' format
  
  //   const payload = {
  //     employeeCode: this.employeeCode,
  //     Date: formattedDate 
  //   };
  
  //   this.http.post(url, payload).subscribe({
  //     next: (response: any) => {
  //       console.log('API Response:', response); 
  
  //       if (Array.isArray(response) && response.length > 0) {
  //         // Access the first element of the array
  //         const result = response[0];
  //         console.log('API Result:', result); 
  
  //         if (result.punchingDetails && result.punchingDetails.length > 0) {
  //           const punchingDetails = result.punchingDetails[0];
  //           console.log('Punching Details:', punchingDetails); // Log details to check values
  
  //           // Set values with default fallbacks
  //           this.previousPunchIn = punchingDetails.earliestPunchIn || '00:00:00';
  //           this.previousPunchOut = punchingDetails.lastPunchOut ? punchingDetails.lastPunchOut : '00:00:00';
  //           this.approvalLevel = punchingDetails.approvalLevel || 'N/A';
  //           this.approverName = punchingDetails.approverName || 'N/A';
  //         } else {
  //           this.errorMessage = 'No punch details found for the selected date.';
  //           this.previousPunchIn = 'N/A';
  //           this.previousPunchOut = 'N/A';
  //         }
  //       } else {
  //         this.errorMessage = 'Invalid response format.';
  //         this.previousPunchIn = 'N/A';
  //         this.previousPunchOut = 'N/A';
  //       }
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Error fetching punch details.';
  //       console.error('Error:', error);
  //     },
  //     complete: () => {
  //       console.log('Punching details fetch completed.');
  //     }
  //   });
  // }
  
  // Declare an array to hold punching details
punchingDetailsArray: any[] = [];

fetchPunchingDetails(): void {
  const url = `https://localhost:7254/UserDetails/FetchPunchingDetails`;
  
  const formattedDate = new Date(this.attendanceDate).toISOString().split('T')[0]; // Ensures 'YYYY-MM-DD' format

  const payload = {
    employeeCode: this.employeeCode,
    Date: formattedDate 
  };

  this.http.post(url, payload).subscribe({
    next: (response: any) => {
      console.log('API Response:', response); 

      if (Array.isArray(response) && response.length > 0) {
        const result = response[0];
        console.log('API Result:', result); 

        if (result.punchingDetails && result.punchingDetails.length > 0) {
          // Transform the punching details into an array
          this.punchingDetailsArray = result.punchingDetails.map((detail: { earliestPunchIn: any; lastPunchOut: any; approvalLevel: any; approverName: any; }) => ({
            previousPunchIn: detail.earliestPunchIn || '00:00:00',
            previousPunchOut: detail.lastPunchOut || '00:00:00',
            approvalLevel: detail.approvalLevel || 'N/A',
            approverName: detail.approverName || 'N/A'
          }));
        } else {
          this.punchingDetailsArray = []; // No details found
          this.errorMessage = 'No punch details found for the selected date.';
        }
      } else {
        this.punchingDetailsArray = []; // Invalid response format
        this.errorMessage = 'Invalid response format.';
      }
    },
    error: (error) => {
      this.punchingDetailsArray = []; // Clear the array on error
      this.errorMessage = 'Error fetching punch details.';
      console.error('Error:', error);
    },
    complete: () => {
      console.log('Punching details fetch completed.');
    }
  });
}

  
  
  // Handle date change and call the API
  onDateChange(event: any): void {
    debugger;
    this.attendanceDate = event.target.value;  // Set selected date
    if (this.attendanceDate) {
      this.fetchPunchingDetails();  // Fetch punch details based on date and employee code
    }
  }

  

  // onSubmit(): void {
  //   // Function to convert 12-hour format to 24-hour format and handle 'N/A'
  //   const formatTime = (time: string | null): string => {
  //     if (!time || time === 'N/A') {
  //       return '00:00:00'; // Default to '00:00:00' if time is 'N/A' or null
  //     }
  
  //     // Handle 12-hour format with AM/PM
  //     const timeFormat12Hour = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
  //     const match = time.match(timeFormat12Hour);
  
  //     if (match) {
  //       let [_, hours, minutes, period] = match;
  //       let hoursAsNumber = parseInt(hours, 10); // Parse hours as a number
  
  //       if (period.toUpperCase() === 'PM' && hoursAsNumber < 12) {
  //         hoursAsNumber += 12; // Convert PM hours to 24-hour format
  //       } else if (period.toUpperCase() === 'AM' && hoursAsNumber === 12) {
  //         hoursAsNumber = 0; // Convert 12 AM to 00 hours
  //       }
  
  //       hours = hoursAsNumber.toString().padStart(2, '0'); // Convert back to string and pad
  //       return `${hours}:${minutes}:00`; // Return 'HH:mm:ss'
  //     }
  
  //     // Handle 24-hour format (HH:mm or HH:mm:ss)
  //     const timeFormat24Hour = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
  //     if (timeFormat24Hour.test(time)) {
  //       return time.length === 5 ? `${time}:00` : time; // Add ':00' if only HH:mm
  //     }
  
  //     console.error('Invalid time format:', time);
  //     return '00:00:00'; // Fallback to '00:00:00' if time is invalid
  //   };
  
  //   // Extract attendance details
  //   const attendanceDetail = this.attendanceDetails.at(0).value;
  
  //   // Construct payload with formatted time values
  //   const payload = {
  //     RegDate: this.attendanceDate,
  //     EmployeeCode: this.employeeCode,
  //     ActualPunchInTime: formatTime(this.previousPunchIn),
  //     ActualPunchOutTime: formatTime(this.previousPunchOut),
  //     NewPunchInTime: formatTime(attendanceDetail.timeIn),
  //     NewPunchOutTime: formatTime(attendanceDetail.timeOut),
  //     Remark: attendanceDetail.remark
  //   };
  
  //   console.log('Payload:', payload); // Verify the payload
  //   debugger;
  
  //   // Call API with constructed payload
  //   this.applyRegularization(payload);
  // }
  
  
  
  onSubmit(): void {
    // Function to convert 12-hour format to 24-hour format and handle 'N/A'
    const formatTime = (time: string | null): string => {
      if (!time || time === 'N/A') {
        return '00:00:00'; // Default to '00:00:00' if time is 'N/A' or null
      }
  
      // Handle 12-hour format with AM/PM
      const timeFormat12Hour = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
      const match = time.match(timeFormat12Hour);
  
      if (match) {
        let [_, hours, minutes, period] = match;
        let hoursAsNumber = parseInt(hours, 10); // Parse hours as a number
  
        if (period.toUpperCase() === 'PM' && hoursAsNumber < 12) {
          hoursAsNumber += 12; // Convert PM hours to 24-hour format
        } else if (period.toUpperCase() === 'AM' && hoursAsNumber === 12) {
          hoursAsNumber = 0; // Convert 12 AM to 00 hours
        }
  
        hours = hoursAsNumber.toString().padStart(2, '0'); // Convert back to string and pad
        return `${hours}:${minutes}:00`; // Return 'HH:mm:ss'
      }
  
      // Handle 24-hour format (HH:mm or HH:mm:ss)
      const timeFormat24Hour = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
      if (timeFormat24Hour.test(time)) {
        return time.length === 5 ? `${time}:00` : time; // Add ':00' if only HH:mm
      }
  
      console.error('Invalid time format:', time);
      return '00:00:00'; // Fallback to '00:00:00' if time is invalid
    };
  
    // Format RegDate to "YYYY-MM-DDTHH:mm:ss"
    const formatRegDate = (date: string | Date): string => {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        console.error('Invalid date format:', date);
        return '2024-09-17T00:00:00'; // Fallback to default date if invalid
      }
      return dateObj.toISOString().split('T')[0] + 'T00:00:00'; // Format date as "YYYY-MM-DDT00:00:00"
    };
  
    // Extract attendance details
    const attendanceDetail = this.attendanceDetails.at(0).value;
  
    // Construct payload with formatted time values
    const payload = {
      RegDate: formatRegDate(this.attendanceDate),
      EmployeeCode: this.employeeCode,
      ActualPunchInTime: formatTime(this.previousPunchIn),
      ActualPunchOutTime: formatTime(this.previousPunchOut),
      NewPunchInTime: formatTime(attendanceDetail.timeIn),
      NewPunchOutTime: formatTime(attendanceDetail.timeOut),
      Remark: attendanceDetail.remark
    };
  
    console.log('Payload:', payload); // Verify the payload
    debugger;
  
    // Call API with constructed payload
    this.applyRegularization(payload);
  }
  
  

  
  applyRegularization(payload: any): void {
    const url = `https://localhost:7254/UserDetails/ApplyRegularization`;
  debugger
    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        if (response && response.code === 1) {
          this.successMessage = 'Regularization request submitted successfully.';
        } else {
          this.errorMessage = 'Failed to submit regularization request: ' + (response?.message || 'Unknown error.');
        }
      },
      error: (error) => {
        this.errorMessage = 'Error submitting regularization request.';
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Regularization request submission completed.');
      }
    });
  }
  
}
