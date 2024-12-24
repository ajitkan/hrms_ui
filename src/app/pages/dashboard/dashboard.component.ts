import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DateTimeComponent } from '../shared-components/date-time/date-time.component';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Tooltip } from 'bootstrap';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
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
  Month:any;
  attendanceSummary:any;
  attendanceRecords: any[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private leaveService:LeaveService,private cdr: ChangeDetectorRef, private datePipe:DatePipe
    ,private attendanceService:AuthService, private toastr: ToastrService
  ){
     
  }

  ngOnInit(): void {

    this.employeeCode = this.leaveService.getEmployeeCode();
    this.loadAttendanceData(this.currentYear, this.currentMonth);
    this.fetchEmployeeGreetings();
    this.loadHolidays();
  }

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
    const companyCode = condition ? 'KANINFOSNEW' : 'KANINFOS';
  
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
  
  
  checkOut(){
    
  }
}



