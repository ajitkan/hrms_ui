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

const sampleAttendanceData = [
  {
    attendanceID: 30,
    empID: 5,
    employeeCode: "K-105",
    shiftID: 4,
    attendanceDate: "2024-10-02T00:00:00",
    finalStatusID: 7,
    finalStatusName: "Holiday",
    systemRemark: "Gandhi Jayanti",
    isApplicable: true
  },
  {
    attendanceID: 45,
    empID: 5,
    employeeCode: "K-105",
    shiftID: 4,
    attendanceDate: "2024-10-05T00:00:00",
    finalStatusID: 9,
    finalStatusName: "WeekOff",
    systemRemark: "Weekly Off",
    isApplicable: true
  },
  {
    attendanceID: 100,
    empID: 5,
    employeeCode: "K-105",
    shiftID: 4,
    attendanceDate: "2024-10-16T00:00:00",
    finalStatusID: 8,
    finalStatusName: "NoStatus",
    systemRemark: "Status Pending",
    isApplicable: true
  },
  // ... Add more sample data as required
];


@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
      thead > tr > th{
        background-color: #4c6fbf;
      }
    `,
  ],
  templateUrl:'./calender-demo.component.html'
  // templateUrl: './attendence-calender.component.html',
})
export class AttendenceCalenderComponent {
  // calendarData: any[][] = []; // Final calendar data for the month
  // attendanceRecords: any[] = []; // Holds the attendance records from the API
  // employeeCode: string | null = null;
  // CurrentMonth:any; 
  // constructor(private attendanceService: LeaveService, private cdr: ChangeDetectorRef) {}

  // ngOnInit(): void {
  //   const payload = {
  //     employeeCode: this.employeeCode ? this.employeeCode : this.attendanceService.getEmployeeCode(),
  //     month: (new Date().getMonth()+1 ).toString(), // Current month
  //     year: new Date().getFullYear().toString() // Current year
  //   };
  //   this.fetchAttendanceData(payload);
  // }

  // // Fetch attendance data from the API
  // fetchAttendanceData(payload: any,action?:string,current?:any) {
  //   this.attendanceService.getAttendanceData(payload).subscribe(response => {
  //     if (response.code === 1 && response.status === 'Successful') {
  //       this.attendanceRecords = response.attendanceRecords;

  //       // Generate the calendar only after receiving the attendance records
  //       if(action==='Prev'){
  //         this.CurrentMonth = (new Date(this.attendanceRecords[0].attendanceDate).getMonth()-1).toString();
  //         this.generateCalendar(new Date().getFullYear(),this.CurrentMonth-1);
  //         // Trigger change detection manually if using OnPush strategy
  //         this.cdr.detectChanges();
  //       }
  //       else if(action==='Next'){
  //         this.CurrentMonth = (new Date(this.attendanceRecords[0].attendanceDate).getMonth()+2).toString();
  //         this.generateCalendar(new Date().getFullYear(), this.CurrentMonth+1);
  //         // Trigger change detection manually if using OnPush strategy
  //         this.cdr.detectChanges();
  //       }
  //       else{
  //         this.CurrentMonth = (new Date().getMonth()+1).toString();
  //         debugger;
  //         this.generateCalendar(new Date().getFullYear(), this.CurrentMonth);
  //         // Trigger change detection manually if using OnPush strategy
  //         this.cdr.detectChanges();
  //       }
  //     }
  //   });
  // }

  // // Generate the calendar data dynamically
  // generateCalendar(year: number, month: number) {
  //   const firstDay = new Date(year, month, 1);
  //   const lastDay = new Date(year, month + 1, 0);
  //   let date = new Date(firstDay);
  //   let week: any[] = [];

  //   this.calendarData = []; // Reset calendarData before generating the new calendar

  //   // Calculate the number of empty slots before the first day of the month
  //   const startDay = firstDay.getDay(); // Get the weekday index (0=Sun, 1=Mon, etc.)

  //   // Fill the initial week with empty slots until the first day of the month
  //   for (let i = 0; i < startDay; i++) {
  //     week.push(null);
  //   }

  //   // Fill the calendar days with the actual dates and corresponding statuses
  //   while (date <= lastDay) {
  //     // Match attendance record for the current date
  //     const attendanceRecord = this.attendanceRecords.find(
  //       record => new Date(record.attendanceDate).toDateString() === date.toDateString()
  //     );

  //     week.push({
  //       date: new Date(date),
  //       status: attendanceRecord ? attendanceRecord.finalStatusName : null
  //     });

  //     // Move to the next day
  //     date.setDate(date.getDate() + 1);

  //     // If the week is complete (7 days), push to the calendarData and start a new week
  //     if (week.length === 7) {
  //       this.calendarData.push(week);
  //       week = [];
  //     }
  //   }

  //   // Fill the remaining slots in the last week if incomplete
  //   while (week.length < 7) {
  //     week.push(null);
  //   }

  //   // Push the final week to the calendar
  //   if (week.length > 0) {
  //     this.calendarData.push(week);
  //   }
  // }

  // // Return the appropriate CSS class based on the day status
  // getDayClass(day: any) {
  //   if (!day) return 'bg-light'; // Default class for empty cells
  //   switch (day.status) {
  //     case 'Holiday':
  //       return 'bg-warning text-white';
  //     case 'WeekOff':
  //       return 'bg-info text-white';
  //     case 'NoStatus':
  //       return 'bg-secondary text-white';
  //     default:
  //       return '';
  //   }
  // }

  // nextMonth(){
  //   const payload = {
  //     employeeCode: this.employeeCode ? this.employeeCode : this.attendanceService.getEmployeeCode(),
  //     month: (new Date().getMonth()+1 ).toString(), // Current month
  //     year: new Date().getFullYear().toString() // Current year
  //   };
  //   this.fetchAttendanceData(payload,'Next' );
  // }
  // PreviousMonth(){
  //   const payload = {
  //     employeeCode: this.employeeCode ? this.employeeCode : this.attendanceService.getEmployeeCode(),
  //     month: (new Date().getMonth()-1 ).toString(), // Current month
  //     year: new Date().getFullYear().toString() // Current year
  //   };
  //   this.fetchAttendanceData(payload,'Prev');
  // }
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];

  filteredEmployees:any;
  attendanceData: any;
  // employeeCode: any;
  calendarData: any[][] = []; // Final calendar data for the month
  attendanceRecords: any[] = []; // Holds the attendance records from the API
  employeeCode: string | null = null;
  employeeName:any;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth(); // Track the displayed month (0-11)
  Month=''
  employeeNameChange$:any =new Subject();
  employeeSelected = false;
  @ViewChild('dropdown-menu') container!: ElementRef;
  // selectedYear = new Date().getFullYear();
  constructor(private attendanceService: LeaveService, private cdr: ChangeDetectorRef, private datePipe:DatePipe, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.employeeCode = this.attendanceService.getEmployeeCode();
    this.loadAttendanceData(this.currentYear, this.currentMonth);

    this.employeeNameChange$.pipe(
          debounceTime(300) // Adjust the debounce time as necessary
        ).subscribe((searchTerm:any) => {
          this.onEmployeeNameChange(searchTerm);
        });
  }
   
  // Fetch attendance data based on the year and month
  loadAttendanceData(year: number, month: number) {
    const payload = {
      employeeCode: this.employeeCode,
      month: (month + 1).toString(), // Convert zero-based month to 1-based
      year: year.toString(),
    };

    this.attendanceService.getAttendanceData(payload).subscribe((response) => {
      if (response.code === 1 && response.status === 'Successful') {
        this.attendanceRecords = response.attendanceRecords;

        // Generate the calendar only after receiving the attendance records
        this.generateCalendar(year, month);
        this.Month = this.monthNames[ response.attendanceRecords.length>0? new Date(response.attendanceRecords[0].attendanceDate).getMonth():month]
        // Trigger change detection manually if using OnPush strategy
        this.cdr.detectChanges();
      }
    });
  }

  // Generate the calendar data dynamically based on year and month
  generateCalendar(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let date = new Date(firstDay);
    let week: any[] = [];

    this.calendarData = []; // Reset calendarData before generating the new calendar

    // Calculate the number of empty slots before the first day of the month
    const startDay = firstDay.getDay(); // Get the weekday index (0=Sun, 1=Mon, etc.)

    // Fill the initial week with empty slots until the first day of the month
    for (let i = 0; i < startDay; i++) {
      week.push(null);
    }

    // Fill the calendar days with the actual dates and corresponding statuses
    while (date <= lastDay) {``
      // Match attendance record for the current date
      const attendanceRecord = this.attendanceRecords.find(
        (record) => new Date(record.attendanceDate).toDateString() === date.toDateString()
      );

      week.push({
        date: new Date(date),
        status: attendanceRecord ? attendanceRecord.finalStatusName : null,
        remark: attendanceRecord ? attendanceRecord.systemRemark : null,
        checkIn: attendanceRecord && (attendanceRecord.finalStatusName =='Present' || attendanceRecord.finalStatusName =='HalfDay')? this.datePipe.transform(attendanceRecord.actualPunchInTime, 'HH:mm'):'',
        checkOut:attendanceRecord && (attendanceRecord.finalStatusName =='Present' || attendanceRecord.finalStatusName =='HalfDay')? this.datePipe.transform(attendanceRecord.actualPunchOutTime, 'HH:mm') :''
      });

      // Move to the next day
      date.setDate(date.getDate() + 1);

      // If the week is complete (7 days), push to the calendarData and start a new week
      if (week.length === 7) {
        this.calendarData.push(week);
        week = [];
      }
    }

    // Fill the remaining slots in the last week if incomplete
    while (week.length < 7) {
      week.push(null);
    }

    // Push the final week to the calendar
    if (week.length > 0) {
      this.calendarData.push(week);
    }
  }
convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  // Return the appropriate CSS class based on the day status
  getDayClass(day: any) {
    if (!day) return 'bg-light'; // Default class for empty cells
    switch (day.status) {
      case 'Holiday':
        return ' holiday';
      case 'WeekOff':
        return 'week';
      case 'NoStatus':
        return '';
      case 'HalfDay':
        return 'text-warning';
      case 'Leave':
        return day.remark == 'Leave Approved'?'text-success':'text-primary ';//' text-primary ';
      // case 'Leave':
      //   return 'bg-success text-white';
      case 'Present':
        return 'text-black';
      case 'Absent':
      return 'text-danger';
      default:
        return '';
    }
  }
  onMonthChange(event:any){
    const selectedMonth = event.target.value;
    this.currentMonth = this.monthNames.indexOf(selectedMonth);
    console.log('Selected Month:', this.monthNames.indexOf(selectedMonth));
    this.loadAttendanceData(this.currentYear, this.monthNames.indexOf(selectedMonth));
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