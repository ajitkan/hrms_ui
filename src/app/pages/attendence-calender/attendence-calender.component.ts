import {  Component,  ChangeDetectionStrategy,  ViewChild,  TemplateRef, ElementRef, ChangeDetectorRef, Renderer2,} from '@angular/core';
import {  startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours,} from 'date-fns';
import { debounceTime, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarMonthViewDay,  CalendarView,} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';
import { startOfMonth, addMonths, subMonths } from 'date-fns';
import { color, index } from 'd3';
import { DatePipe } from '@angular/common';
// import bootstrap, { Tooltip } from 'bootstrap';
import bootstrap, { Tooltip } from 'bootstrap';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export interface AttendanceRecord {
  attendanceID: number;
  empID: number;
  employeeCode: string;
  shiftID: number;
  actualPunchInTime: string;
  actualPunchOutTime: string;
  attendanceDate: string;
  finalStatusID: number;
  finalStatusName: string;
  systemRemark: string;
  isApplicable: boolean;
  day:string;
}

export interface AttendanceResponse {
  code: number;
  status: string;
  message: string;
  attendanceRecords: AttendanceRecord[];
}




@Component({
  // selector: 'mwl-demo-component',app-attendence-calender
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-attendence-calender',
  templateUrl:'./calender-demo.component.html',
  styleUrls: ['./attendence-calender.component.css']
  // templateUrl: './attendence-calender.component.html',
})
export class AttendenceCalenderComponent {
 
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedMonth: number = new Date().getMonth(); // Set current month as default
  years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];

  filteredEmployees:any;
  attendanceData: any;
  // employeeCode: any;
  calendarData: any[][] = []; // Final calendar data for the month
  attendanceRecords: any[] = []; // Holds the attendance records from the API
  attendanceSummary:any;

  employeeCode: string | null = null;
  employeeName:any;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth(); // Track the displayed month (0-11)
  Month:any;
  // Month : any = new Date().getMonth();
  employeeNameChange$:any =new Subject();
  employeeSelected = false;
  selectedDay: any = null; 
  leaveReason: string = ''; 
  @ViewChild('dropdown-menu') container!: ElementRef;
  // selectedYear = new Date().getFullYear();
  constructor(private attendanceService: LeaveService, private cdr: ChangeDetectorRef, private datePipe:DatePipe, private renderer: Renderer2) {}

  ngOnInit(): void {

    // this.getDayClass(this.day);
    this.employeeCode = this.attendanceService.getEmployeeCode();
    this.loadAttendanceData(this.currentYear, this.currentMonth);
    this.cdr.detectChanges();

    this.employeeNameChange$.pipe(
          debounceTime(300) // Adjust the debounce time as necessary
        ).subscribe((searchTerm:any) => {
          this.onEmployeeNameChange(searchTerm);
        });

        // setTimeout(() => {
        //   const tooltipTriggerList = [].slice.call(
        //     document.querySelectorAll('[data-bs-toggle="tooltip"]')
        //   );
        //   tooltipTriggerList.forEach((tooltipTriggerEl) => {
        //     new Tooltip(tooltipTriggerEl);
        //   });
        // }, 0);
  }
   

  ngAfterViewInit() {
    const tooltipTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    tooltipTriggerList.forEach((tooltipTriggerEl: HTMLElement) => {
      new Tooltip(tooltipTriggerEl);  // Initialize Tooltip
    });
  }
  
  
  // getTooltipContent(day: any): string {
  //   // Find the corresponding attendance record for the day
  //   const attendanceRecord = this.attendanceRecords.find(record => 
  //     new Date(record.attendanceDate).toDateString() === day.date.toDateString()
  //   );

  //   console.log('-->', attendanceRecord);
    
  
  //   // If no record is found, set default status
  //   const attendanceStatus = attendanceRecord?.finalStatusName || 'No status available';
  //   console.log('------' , attendanceStatus);
    
  //   const checkIn = attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord.finalStatusName)
  //     ? this.datePipe.transform(attendanceRecord.actualPunchInTime, 'HH:mm') : 'Not Available';
  //     console.log(',,,', checkIn);
      
  //   const checkOutTime = attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord.finalStatusName)
  //     ? this.datePipe.transform(attendanceRecord.actualPunchOutTime, 'HH:mm') : 'Not Available';
  // console.log('chekin chekout for tooltip',checkIn);
  
  //   // Return content with line breaks for each new line
  //   return `Attendance Status - ${attendanceStatus}\nCheck In - ${checkIn}\nCheck Out - ${checkOutTime}`;
  // }
  
  formatTime(time: string): string {
    // You can customize the format based on your input time format
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  
  
  selectDay(day: any) {
    this.selectedDay = day;  
 
    console.log('this.selectedDay---> ',this.selectedDay );
    
  }
  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
  
  

 
  applyLeave() {
    if (this.leaveReason.trim()) {
      this.selectedDay.status = 'LeaveApplied';
      this.selectedDay.remark = this.leaveReason;  // Store the leave reason

      // Reset selected day and leave reason
      this.selectedDay = null;
      this.leaveReason = '';

      alert('Leave applied successfully!');
    } else {
      alert('Please provide a reason for leave.');
    }
  }

 
 
//   loadAttendanceData(year: number, month: number) {
//     const payload = {
//       employeeCode: this.employeeCode,
//       month: (month + 1).toString(), // Convert zero-based month to 1-based
//       year: year.toString(),
//     };
  
//     this.attendanceService.getAttendanceData(payload).subscribe((response) => {
//       if (response.code === 1 && response.status === 'Successful') {
//         this.attendanceRecords = response.attendanceRecords;
//         console.log('this.attendanceRecords-->', this.attendanceRecords);
  
//         // Calculate the counts for each attendance status
//         this.attendanceSummary = this.calculateAttendanceSummary(this.attendanceRecords);
//         // console.log('this.attendanceSummary ----', this.attendanceSummary);
  
//         // Generate the calendar only after receiving the attendance records
//         this.generateCalendar(year, month);
  
//         // Assign the correct month name
//         const monthIndex = response.attendanceRecords.length > 0
//           ? new Date(response.attendanceRecords[0].attendanceDate).getMonth()
//           : month;
//         this.Month = this.monthNames[monthIndex]; // Directly use the month name
  
//         // Trigger change detection manually if using OnPush strategy
//         this.cdr.detectChanges();
//       }
//     });
//   }
  
//   calculateAttendanceSummary(records: any[]) {
//     const summary = {
//       present: 0,
//       absent: 0,
//       leaveApply: 0,
//       halfDay: 0,
//       leaveApproved: 0,
//     };
  
//     // Use a set to keep track of unique attendance dates
//     const seenDates = new Set<string>();
  
//     // Iterate through the records and count each status
//     records.forEach(record => {
//       const attendanceDate = record.attendanceDate; // Assuming attendanceDate is the unique date field
  
//       // Check if this date has already been processed
//       if (!seenDates.has(attendanceDate)) {
//         // Mark this date as processed
//         seenDates.add(attendanceDate);
  
//         // Process the attendance status
//         switch (record.finalStatusName.trim()) {  // Trimming any extra spaces
//           case 'Present':
//             summary.present++;
//             break;
//           case 'Absent':
//             summary.absent++;
//             break;
//           case 'LeaveApplied':
//             summary.leaveApply++;
//             break;
//           case 'Half day':
//             summary.halfDay++;
//             break;
//           case 'LeaveApproved':
//             summary.leaveApproved++;
//             break;
//           default:
//             console.warn('Unknown status:', record.finalStatusName); // Log unexpected status names
//             break;
//         }
//       }
//     });
  
//     console.log('Attendance Summary:', summary); // Log the calculated summary
//     return summary;
//   }
  

//     generateCalendar(year: number, month: number) {
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const attendanceMap = new Map(
//       this.attendanceRecords.map(record => [new Date(record.attendanceDate).toDateString(), record])
//     );
  
//     let date = new Date(firstDay);
//     let week: any[] = [];
//     this.calendarData = [];
  
//     const startDay = firstDay.getDay();
//     for (let i = 0; i < startDay; i++) week.push(null);
  
//     const statusMapping: { [key: string]: string } = {
//       Present: '', Absent: '', Holiday: '', WeekOff: 'WO', NoStatus: '', HalfDay: 'HD', LeaveApplied: 'LA', LeaveApproved: 'LA'
//     };
  
//     while (date <= lastDay) {
//       const todayString = date.toDateString();
//       const attendanceRecord = attendanceMap.get(todayString);
  
//       week.push({
//         date: new Date(date),
//         // status: attendanceRecord ? statusMapping[attendanceRecord.finalStatusName] || attendanceRecord.finalStatusName : null,
//         // fullStatus: attendanceRecord?.finalStatusName || null,

//         status: attendanceRecord ? (statusMapping[attendanceRecord.finalStatusName?.trim()] || attendanceRecord.finalStatusName) : null,
//         fullStatus: attendanceRecord?.finalStatusName?.trim() || null,

//         remark: attendanceRecord?.systemRemark || null,
//         checkIn: attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord.finalStatusName)
//           ? this.datePipe.transform(attendanceRecord.actualPunchInTime, 'HH:mm')
//           : '',
//         checkOut: attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord.finalStatusName)
//           ? this.datePipe.transform(attendanceRecord.actualPunchOutTime, 'HH:mm')
//           : ''
//       });
//       console.log('Full status for day: ', attendanceRecord?.finalStatusName);
//       date.setDate(date.getDate() + 1);
//       if (week.length === 7) {
//         this.calendarData.push(week);
//         week = [];
//       }
//     }
  
//     if (week.length) {
//       while (week.length < 7) week.push(null);
//       this.calendarData.push(week);
//     }
//   }
  


// getDayClass(day: any): string {
//   if (!day) return 'bg-light'; // Default class for empty cells

//   // Ensure fullStatus is a non-null, non-undefined string
//   const fullStatus = day.fullStatus?.trim() || '';

//   switch (fullStatus) {
//     case 'Holiday':
//       return 'holiday';
//     case 'WeekOff':
//       return 'week';
//     case 'NoStatus':
//       return '';
//     case 'HalfDay':
//       return 'text-warning';
//     case 'LeaveApproved':
//       return 'text-success';
//     case 'LeaveApplied':
//       return 'text-primary';
//     case 'Present':
//       return 'text-black';
//     case 'Absent':
//       return 'text-danger';
//     default:
//       return '';
//   }
// }

 
loadAttendanceData(year: number, month: number) {
  const payload = {
    employeeCode: this.employeeCode,
    month: (month + 1).toString(), // Convert zero-based month to 1-based
    year: year.toString(),
  };

  this.attendanceService.getAttendanceData(payload).subscribe((response) => {
    if (response.code === 1 && response.status === 'Successful') {
      this.attendanceRecords = response.attendanceRecords || [];
      console.log('Attendance Records:', this.attendanceRecords);

      // Calculate attendance summary
      this.attendanceSummary = this.calculateAttendanceSummary(this.attendanceRecords);
      console.log('Attendance Summary:', this.attendanceSummary);

      // Generate calendar
      this.generateCalendar(year, month);

      // Assign the correct month name
      const monthIndex = this.attendanceRecords.length > 0
        ? new Date(this.attendanceRecords[0].attendanceDate).getMonth()
        : month;
      this.Month = this.monthNames[monthIndex];

      this.cdr.detectChanges(); // Trigger change detection
    }
  });
}

// calculateAttendanceSummary(records: any[]) {
//   const summary = {
//     present: 0,
//     absent: 0,
//     leaveApply: 0,
//     halfDay: 0,
//     leaveApproved: 0,
//   };

//   const seenDates = new Set<string>();
//   records.forEach(record => {
//     const attendanceDate = record.attendanceDate;
//     if (!seenDates.has(attendanceDate)) {
//       seenDates.add(attendanceDate);
//       const finalStatus = record.finalStatusName?.trim();
//       switch (finalStatus) {
//         case 'Present':
//           summary.present++;
//           break;
//         case 'Absent':
//           summary.absent++;
//           break;
//         case 'LeaveApplied':
//           summary.leaveApply++;
//           break;
//         case 'Half day':
//           summary.halfDay++;
//           break;
//         case 'LeaveApproved':
//           summary.leaveApproved++;
//           break;
//         default:
//           console.warn('Unknown status:', finalStatus);
//           break;
//       }
//     }
//   });
//   return summary;
// }

calculateAttendanceSummary(records: any[]) {
  const summary = {
    present: 0,
    absent: 0,
    leaveApply: 0,
    halfDay: 0,
    leaveApproved: 0,
  };

  records.forEach(record => {
    const finalStatus = record.finalStatusName?.trim();
    switch (finalStatus) {
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
        console.warn('Unknown status:', finalStatus);
        break;
    }
  });

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
      status: attendanceRecord ? (statusMapping[attendanceRecord.finalStatusName?.trim()] || attendanceRecord.finalStatusName) : null,
      fullStatus: attendanceRecord?.finalStatusName?.trim() || null,
      remark: attendanceRecord?.systemRemark || null,
      checkIn: attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord?.finalStatusName)
        ? this.datePipe.transform(attendanceRecord.actualPunchInTime, 'HH:mm')
        : '',
      checkOut: attendanceRecord && ['Present', 'HalfDay'].includes(attendanceRecord?.finalStatusName)
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

getDayClass(day: any): string {
  if (!day) return 'bg-light'; // Default class for empty cells

  const fullStatus = (day.fullStatus || '').trim(); // Ensure it's a string and trim
  switch (fullStatus) {
    case 'Holiday':
      return 'holiday';
    case 'WeekOff':
      return 'week';
    case 'NoStatus':
      return '';
    case 'HalfDay':
      return 'text-warning';
    case 'LeaveApproved':
      return 'LeaveApproved';
    case 'LeaveApplied':
      return 'leaveApplied';
    case 'Present':
      return 'Present';
    case 'Absent':
      return 'text-danger';
    default:
      return '';
  }
}


  getEventColorClass(status: string | null): string {
    switch (status) {
      case 'Absent':
        return 'text-absent';
      case 'LeaveApplied':
        return 'text-leave-apply';
      case 'HalfDay':
        return 'text-half-day';
      case 'LeaveApproved':
        return 'text-leave-approved';
      default:
        return ''; // No circle for undefined statuses
    }
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
  //       return '#e0e0e9'; // Light Blue
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
  
 
  
  
convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  onMonthChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const monthIndex = parseInt(target.value, 10); // Get the selected month index
    this.selectedMonth = monthIndex;
    this.loadAttendanceData(this.currentYear, monthIndex); // Reload data for the selected month
  }

 
  onYearChange(event:any){
    const selectedYear = event.target.value;
    console.log('Selected Year:', selectedYear);
    this.currentYear = selectedYear;
    this.loadAttendanceData(selectedYear,this.currentMonth)
  }

  // Navigate to the next month
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.loadAttendanceData(this.currentYear, this.currentMonth);
  }

  // Navigate to the previous month
  PreviousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.loadAttendanceData(this.currentYear, this.currentMonth);
  }
  
  onEmployeeNameInputChange(event: any) {
    const value = event.target.value;
    // console.log("employee search trigger!!!!")
      const inputValue = event.target.value.toLowerCase();
      
      this.employeeNameChange$.next(value);
  }
  onEmployeeNameChange(employeeName: string) {
    if (employeeName.trim()) {
      const payload = { EmpSearch: employeeName };
      this.attendanceService.searchEmployee(payload).subscribe({
        next: (employees: any) => {
          this.filteredEmployees = employees.employeeList; 
          this.employeeSelected = false;
          // this.renderer.addClass(this.container.nativeElement, 'show');
        },
        error: (error) => {
          console.error('Error searching for employees', error);
        }
      });
    }
    else{
      this.filteredEmployees = [];
    }
  }
  selectEmployee(employee: any) {
          this.employeeCode =employee.EmployeeCode.trim();
          this.employeeName =employee.FirstName+' '+ employee.LastName+' '+'('+employee.EmployeeCode.trim()+')'
          // const elements = this.container.nativeElement.querySelectorAll('dropdown-menu show');
          // elements.forEach((element: any) => {
          //   // element.style.backgroundColor = 'lightblue';
          //   // element.style.color = 'darkblue';
          // });
          // this.toggleClass();
          this.employeeSelected =true;
          this.loadAttendanceData(this.currentYear,this.currentMonth);
         }
  //   toggleClass() {
  //   // if (this.isActive) {
  //     this.renderer.removeClass(this.container.nativeElement, 'show');
  //   // } else {
  //     this.renderer.addClass(this.container.nativeElement, 'hide');
  //   // }
  //   // this.isActive = !this.isActive;
 
 
  // }


  
}