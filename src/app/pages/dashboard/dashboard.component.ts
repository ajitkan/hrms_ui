import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DateTimeComponent } from '../shared-components/date-time/date-time.component';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';
import { CommonModule, DatePipe } from '@angular/common';
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
  isHolidayListOpen=false;
  // showCheckInButton = false;
  employeeCode ='K-101'
  holidays: Array<{ name: string, date: string }> = [];
  categoryCounts: { [key: string]: number } = {};
  loading = true;
  error: string | null = null;
  
  dailyEmployeeGreetings: any[] = [];
  isPopupVisible: boolean = false;
  selectedCategory: string = '';
  filteredEmployees: any[] = [];
  isDropdownOpen: boolean = false;
  calendarData: any[][] = []; 
  selectedDay: any = null; 
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth(); // Track the displayed month (0-11)
  Month:any;
  attendanceSummary:any;
  attendanceRecords: any[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private leaveService:LeaveService,private cdr: ChangeDetectorRef, private datePipe:DatePipe){
     this.loadHolidays();
  }

  ngOnInit(): void {

    this.employeeCode = this.leaveService.getEmployeeCode();
    this.loadAttendanceData(this.currentYear, this.currentMonth);
    this.fetchEmployeeGreetings();
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
  toggleHolidayList(event: Event): void {
    this.isHolidayListOpen = !this.isHolidayListOpen;
    event.stopPropagation(); // Prevent click from closing immediately
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
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
 

  loadHolidays(): void {
    this.leaveService.fetchHolidayDetails(this.employeeCode).subscribe((response:any) => {
      if (response.code === 1) {
        this.holidays = response.holidayList.map((holiday: { holidayName: any; date: any; }) => ({
         
          
          name: holiday.holidayName,
          date: holiday.date
        }));
        console.log('holiday-------->',this.holidays)
      }
    });
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

 

}



