// // import { Component, OnInit } from '@angular/core';
// // import { LeaveService } from 'src/app/service/LeaveService/leave.service';
// // export interface AttendanceRecord {
// //   attendanceID: number;
// //   empID: number;
// //   employeeCode: string;
// //   shiftID: number;
// //   actualPunchInTime: string;
// //   actualPunchOutTime: string;
// //   attendanceDate: string;
// //   finalStatusID: number;
// //   finalStatusName: string;
// //   systemRemark: string;
// //   isApplicable: boolean;
// //   day:string;
// // }

// // export interface AttendanceResponse {
// //   code: number;
// //   status: string;
// //   message: string;
// //   attendanceRecords: AttendanceRecord[];
// // }


// // @Component({
// //   selector: 'app-attendence-calender',
// //   templateUrl: './attendence-calender.component.html',
// //   styleUrls: ['./attendence-calender.component.css']
// // })
// // export class AttendenceCalenderComponent implements OnInit{
// //   // public attendanceData: any[] = [];
// //   // public daysInMonth: number[] = [];
// //   // public month: number = 9; // October (0-based)
// //   // public year: number = 2023;

// //   // constructor(private attendanceService: LeaveService) { }

// //   // ngOnInit(): void {
// //   //   this.fetchAttendanceData();
// //   //   this.generateCalendarDays();
// //   // }

// //   // fetchAttendanceData(): void {
// //   //   const payload ={
// //   //       "employeeCode": 'K-101',
// //   //       "month": 0,
// //   //       "year": 0
// //   //     }
// //   //   this.attendanceService.getAttendanceData(payload).subscribe(data => {
// //   //     this.attendanceData = data;
// //   //   });
// //   // }

// //   // generateCalendarDays(): void {
// //   //   const days = new Date(this.year, this.month + 1, 0).getDate();
// //   //   this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
// //   // }

// //   // getAttendanceStatus(day: number): string {
// //   //   const date = new Date(this.year, this.month, day).toISOString().split('T')[0];
// //   //   const record = this.attendanceData.find(att => att.AttendanceDate === date);
// //   //   return record ? record.FinalStatusName : '';
// //   // }

// //   // getClassForDay(day: number): string {
// //   //   const status = this.getAttendanceStatus(day);
// //   //   switch (status) {
// //   //     case 'Present': return 'bg-success text-white';
// //   //     case 'Leave': return 'bg-info text-white';
// //   //     case 'Absent': return 'bg-danger text-white';
// //   //     case 'Half Day': return 'bg-warning text-dark';
// //   //     case 'Holiday': return 'bg-primary text-white';
// //   //     default: return '';
// //   //   }
// //   // }
// //   currentYear: number = new Date().getFullYear();
// //   currentMonth: number = new Date().getMonth();
// //   daysInMonth!: number;
// //   calendar: any[] = [];
// //   attendanceRecords!: AttendanceResponse;
// //   calendarDays: any[] = []; // This will hold calendar data by day

// //   constructor(private attendanceService: LeaveService) {}
// //   // attendanceRecords: any; // Holds the JSON response data

// //   ngOnInit(): void {
// //     this.fetchAttendanceRecords();
// //   }

// //   fetchAttendanceRecords(): void {
// //     const payload={
// //       EmployeeCode: "K-103",
// //       Month: 9,
// //       Year:2024
// //     }
// //     this.attendanceRecords = {
// //       "code": 1,
// //       "status": "Successful",
// //       "message": "Records fetched successfully.",
// //       "attendanceRecords": [
// //           {
// //               "attendanceID": 43,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-01T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Sunday"
// //           },
// //           {
// //               "attendanceID": 48,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-02T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Monday"
// //           },
// //           {
// //               "attendanceID": 53,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-03T00:00:00",
// //               "finalStatusID": 7,
// //               "finalStatusName": "Holiday",
// //               "systemRemark": "Testing",
// //               "isApplicable": false,
// //               "day":"Tuesday"
// //           },
// //           {
// //               "attendanceID": 58,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-04T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Wednesday"
// //           },
// //           {
// //               "attendanceID": 63,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-05T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Thursday"
// //           },
// //           {
// //               "attendanceID": 68,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-06T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Firday"
// //           },
// //           {
// //               "attendanceID": 73,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-07T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Saturday"
// //           },
// //           {
// //               "attendanceID": 78,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-08T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Sunday"
// //           },
// //           {
// //               "attendanceID": 83,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-09T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Monday"
// //           },
// //           {
// //               "attendanceID": 88,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-10T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Tuesdayday"
// //           },
// //           {
// //               "attendanceID": 93,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-11T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Wednesday"
// //           },
// //           {
// //               "attendanceID": 98,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-12T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Thursday"
// //           },
// //           {
// //               "attendanceID": 103,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-13T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Friday"
// //           },
// //           {
// //               "attendanceID": 108,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-14T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Saturday"
// //           },
// //           {
// //               "attendanceID": 113,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-15T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Sunday"
// //           },
// //           {
// //               "attendanceID": 118,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-16T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Monday"
// //           },
// //           {
// //               "attendanceID": 123,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-17T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Tuesday"
// //           },
// //           {
// //               "attendanceID": 128,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-18T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Wednesday"
// //           },
// //           {
// //               "attendanceID": 133,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-19T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Thursday"
// //           },
// //           {
// //               "attendanceID": 138,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-20T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Friday"
// //           },
// //           {
// //               "attendanceID": 143,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-21T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Saturday"
// //           },
// //           {
// //               "attendanceID": 148,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-22T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Sunday"
// //           },
// //           {
// //               "attendanceID": 153,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-23T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Monday"
// //           },
// //           {
// //               "attendanceID": 158,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-24T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Tuesday"
// //           },
// //           {
// //               "attendanceID": 163,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-25T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Wednesday"
// //           },
// //           {
// //               "attendanceID": 168,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-26T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Thursday"
// //           },
// //           {
// //               "attendanceID": 173,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-27T00:00:00",
// //               "finalStatusID": 9,
// //               "finalStatusName": "WeekOff",
// //               "systemRemark": "Weekly Off",
// //               "isApplicable": false,
// //               "day":"Friday"
// //           },
// //           {
// //               "attendanceID": 178,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-28T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Saturday"
// //           },
// //           {
// //               "attendanceID": 183,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-29T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Sunday"
// //           },
// //           {
// //               "attendanceID": 188,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-30T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Monday"
// //           },
// //           {
// //               "attendanceID": 193,
// //               "empID": 3,
// //               "employeeCode": "K-103     ",
// //               "shiftID": 3,
// //               "actualPunchInTime": "0001-01-01T00:00:00",
// //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //               "attendanceDate": "2024-10-31T00:00:00",
// //               "finalStatusID": 8,
// //               "finalStatusName": "NoStatus",
// //               "systemRemark": "Status Pending",
// //               "isApplicable": false,
// //               "day":"Thuesday"
// //           }
// //       ]
// //     }
// //     this.generateCalendar();
// //     // this.attendanceService.getAttendanceData(payload).subscribe(
// //     //   (response: AttendanceResponse) => {
// //     //     this.attendanceRecords = {
// //     //       "code": 1,
// //     //       "status": "Successful",
// //     //       "message": "Records fetched successfully.",
// //     //       "attendanceRecords": [
// //     //           {
// //     //               "attendanceID": 43,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-01T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 48,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-02T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 53,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-03T00:00:00",
// //     //               "finalStatusID": 7,
// //     //               "finalStatusName": "Holiday",
// //     //               "systemRemark": "Testing",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 58,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-04T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 63,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-05T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 68,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-06T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 73,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-07T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 78,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-08T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 83,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-09T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 88,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-10T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 93,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-11T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 98,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-12T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 103,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-13T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 108,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-14T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 113,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-15T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 118,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-16T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 123,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-17T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 128,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-18T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 133,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-19T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 138,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-20T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 143,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-21T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 148,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-22T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 153,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-23T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 158,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-24T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 163,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-25T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 168,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-26T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 173,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-27T00:00:00",
// //     //               "finalStatusID": 9,
// //     //               "finalStatusName": "WeekOff",
// //     //               "systemRemark": "Weekly Off",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 178,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-28T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 183,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-29T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 188,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-30T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           },
// //     //           {
// //     //               "attendanceID": 193,
// //     //               "empID": 3,
// //     //               "employeeCode": "K-103     ",
// //     //               "shiftID": 3,
// //     //               "actualPunchInTime": "0001-01-01T00:00:00",
// //     //               "actualPunchOutTime": "0001-01-01T00:00:00",
// //     //               "attendanceDate": "2024-10-31T00:00:00",
// //     //               "finalStatusID": 8,
// //     //               "finalStatusName": "NoStatus",
// //     //               "systemRemark": "Status Pending",
// //     //               "isApplicable": false
// //     //           }
// //     //       ]
// //     //   }//response;
// //     //   },
// //     //   (error:any) => {
// //     //     console.error('Error fetching attendance records', error);
// //     //   }
// //     // );
// //   }
// //   generateCalendar() {
// //     let daysInMonth = 31; // Assuming October 2024 as per your data (you can make it dynamic)
// //     let calendar = [];

// //     for (let i = 1; i <= daysInMonth; i++) {
// //       let dayRecord = this.attendanceRecords.attendanceRecords.find(record => {
// //         let recordDate = new Date(record.attendanceDate).getDate();
// //         return recordDate === i;
// //       });

// //       // If there's no record for that day, create a default one
// //       if (!dayRecord) {
// //         calendar.push({
// //           date: i,
// //           day: this.getDayOfWeek(i, 9, 2024), // Get the day name
// //           status: "NoStatus", // Default status for empty days
// //           remark: "No record available",
// //         });
// //       } else {
// //         calendar.push({
// //           date: i,
// //           day: dayRecord.day,
// //           status: dayRecord.finalStatusName,
// //           remark: dayRecord.systemRemark,
// //         });
// //       }
// //     }

// //     this.calendarDays = calendar;
// //   }

// //   // Helper function to get day name (e.g., Sunday, Monday, etc.)
// //   getDayOfWeek(day: number, month: number, year: number): string {
// //     const date = new Date(year, month - 1, day); // Month is zero-indexed
// //     return date.toLocaleDateString('en-US', { weekday: 'long' });
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { CalendarEvent } from 'angular-calendar';
// import { debounceTime, Subject } from 'rxjs';
// import { LeaveService } from 'src/app/service/LeaveService/leave.service';


// @Component({
//     selector: 'app-attendence-calender',
//     templateUrl: './attendence-calender.component.html',
//     styleUrls: ['./attendence-calender.component.css']
//   })
// export class AttendenceCalenderComponent implements OnInit {

//       attendanceRecords = {
//       "code": 1,
//       "status": "Successful",
//       "message": "Records fetched successfully.",
//       "attendanceRecords": [
//           {
//               "attendanceID": 43,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-01T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Sunday"
//           },
//           {
//               "attendanceID": 48,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-02T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Monday"
//           },
//           {
//               "attendanceID": 53,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-03T00:00:00",
//               "finalStatusID": 7,
//               "finalStatusName": "Holiday",
//               "systemRemark": "Testing",
//               "isApplicable": false,
//               "day":"Tuesday"
//           },
//           {
//               "attendanceID": 58,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-04T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Wednesday"
//           },
//           {
//               "attendanceID": 63,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-05T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Thursday"
//           },
//           {
//               "attendanceID": 68,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-06T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Firday"
//           },
//           {
//               "attendanceID": 73,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-07T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Saturday"
//           },
//           {
//               "attendanceID": 78,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-08T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "Leave",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Sunday"
//           },
//           {
//               "attendanceID": 83,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-09T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "HalfDay",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Monday"
//           },
//           {
//               "attendanceID": 88,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-10T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Tuesdayday"
//           },
//           {
//               "attendanceID": 93,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-11T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Wednesday"
//           },
//           {
//               "attendanceID": 98,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-12T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Thursday"
//           },
//           {
//               "attendanceID": 103,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-13T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Friday"
//           },
//           {
//               "attendanceID": 108,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-14T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Saturday"
//           },
//           {
//               "attendanceID": 113,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-15T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Sunday"
//           },
//           {
//               "attendanceID": 118,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-16T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Monday"
//           },
//           {
//               "attendanceID": 123,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-17T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Tuesday"
//           },
//           {
//               "attendanceID": 128,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-18T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Wednesday"
//           },
//           {
//               "attendanceID": 133,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-19T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Thursday"
//           },
//           {
//               "attendanceID": 138,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-20T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Friday"
//           },
//           {
//               "attendanceID": 143,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-21T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Saturday"
//           },
//           {
//               "attendanceID": 148,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-22T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Sunday"
//           },
//           {
//               "attendanceID": 153,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-23T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Monday"
//           },
//           {
//               "attendanceID": 158,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-24T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Tuesday"
//           },
//           {
//               "attendanceID": 163,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-25T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Wednesday"
//           },
//           {
//               "attendanceID": 168,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-26T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Thursday"
//           },
//           {
//               "attendanceID": 173,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-27T00:00:00",
//               "finalStatusID": 9,
//               "finalStatusName": "WeekOff",
//               "systemRemark": "Weekly Off",
//               "isApplicable": false,
//               "day":"Friday"
//           },
//           {
//               "attendanceID": 178,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-28T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Saturday"
//           },
//           {
//               "attendanceID": 183,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-29T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Sunday"
//           },
//           {
//               "attendanceID": 188,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-30T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Monday"
//           },
//           {
//               "attendanceID": 193,
//               "empID": 3,
//               "employeeCode": "K-103     ",
//               "shiftID": 3,
//               "actualPunchInTime": "0001-01-01T00:00:00",
//               "actualPunchOutTime": "0001-01-01T00:00:00",
//               "attendanceDate": "2024-10-31T00:00:00",
//               "finalStatusID": 8,
//               "finalStatusName": "NoStatus",
//               "systemRemark": "Status Pending",
//               "isApplicable": false,
//               "day":"Thuesday"
//           }
//       ]
//     }

//   daysInMonth: any[] = [];
//   weeks: any[] = [];
//   weekends: number[] = [6, 0]; // 6 = Saturday, 0 = Sunday
//   attendanceData: any;
//   employeeNameChange$ = new Subject<string>();
//   filteredEmployees: any;
// employeeName: any;
  
//   constructor(private attendanceService:LeaveService){}
//   ngOnInit() {
//     this.generateCalendar(2024, 9); // For October 2024 (Month is 0-based)
//     this.fetchAttendanceData();
//     this.employeeNameChange$.pipe(
//       debounceTime(300) // Adjust the debounce time as necessary
//     ).subscribe(searchTerm => {
//       this.onEmployeeNameChange(searchTerm);
//     }); 
//   }

//   generateCalendar(year: number, month: number) {
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     let currentDate = new Date(firstDay);

//     // Loop through all the days in the month
//     while (currentDate <= lastDay) {
//       const day = {
//         date: new Date(currentDate),
//         finalStatusName: this.getStatusForDate(currentDate) || 'NoStatus',
//       };
//       this.daysInMonth.push(day);
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     this.createWeeks();
//   }

//   createWeeks() {
//     let week: any[] = [];
//     this.daysInMonth.forEach(day => {
//       if (week.length === 7) {
//         this.weeks.push(week);
//         week = [];
//       }
//       week.push(day);
//     });

//     if (week.length > 0) {
//       this.weeks.push(week);
//     }
//   }

//   getStatusForDate(date: Date) {
//     const record = this.attendanceRecords.attendanceRecords.find((r: any) =>
//       new Date(r.attendanceDate).toDateString() === date.toDateString()
//     );
//     return record ? record.finalStatusName : null;
//   }

//   getDayClass(day: any) {
//     const dayOfWeek = day.date.getDay(); // 0 is Sunday, 6 is Saturday
//     if (this.weekends.includes(dayOfWeek)) {
//       return 'weekoff'; // Apply weekoff class for defined weekend days
//     }
//     switch (day.finalStatusName) {
//       case 'Holiday':
//         return 'holiday';
//       case 'Leave':
//         return 'leave';
//       case 'Absent':
//         return 'absent';
//       case 'NoStatus':
//         return '';
//       case 'HalfDay':
//         return 'halfday';
//       case 'Present':
//       return 'present';
//       default:
//         return ''; // Default for regular working days
//     }
//   }
 
//    fetchAttendanceData(): void {
//         const payload ={
//             "employeeCode": 'K-101',
//             "month": 0,
//             "year": 0
//           }
//         this.attendanceService.getAttendanceData(payload).subscribe(data => {
//           this.attendanceData = data;
//           console.log('this attendece',this.attendanceData)
//         });
//       }
//      onEmployeeNameInputChange(event: any) {debugger;
//       const value = event.target.value;
//       // console.log("employee search trigger!!!!")
//         const inputValue = event.target.value.toLowerCase();
      
//       // Assuming employees are fetched from a service or static list
//       // if (inputValue) {
//       //   this.filteredEmployees = this.leaveRequests.filter((employee:any) =>
//       //     (employee.FirstName + ' ' + employee.LastName + ' ' + employee.EmployeeCode)
//       //     .toLowerCase()
//       //     .includes(inputValue)
//       //   );
//       //   // this.filter.employeeName =
//       // } else {
//       //   this.filteredEmployees = [];
//       // }
//        this.employeeNameChange$.next(value);
//     }
//     onEmployeeNameChange(employeeName: string) {
//       if (employeeName.trim()) {
//         const payload = { EmpSearch: employeeName };
//         this.attendanceService.searchEmployee(payload).subscribe({
//           next: (employees: any) => {
//             this.filteredEmployees = employees.employeeList; 
//           },
//           error: (error) => {
//             console.error('Error searching for employees', error);
//           }
//         });
//       }
//       else{
//         this.filteredEmployees = [];
//       }
//     }
//     selectEmployee(employee: any) {
//       // this.filter.EmployeeCode = employee.EmployeeCode.trim();
//       // this.filter.employeeName = employee.FirstName;  // Set the input value to the selected employee
//       // this.filter.selectedEmployee = employee.FirstName;  // Set selected employee for filter application
//       // this.filteredEmployees = [];  // Clear the dropdown after selection
//       // this.leaveRequests = this.leaveRequests.filter(
//       //   (request:any) => request.FirstName.toLowerCase() === this.filter.selectedEmployee.toLowerCase()
//       // );
//       // this.filter.employeeName = employee.FirstName + ' ' + employee.LastName + ' (' + employee.EmployeeCode + ')';
      
//       // // Clear the dropdown after selecting an employee
//       // this.filteredEmployees = [];  
//     }
//   }

import {  Component,  ChangeDetectionStrategy,  ViewChild,  TemplateRef,} from '@angular/core';
import {  startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours,} from 'date-fns';
import { debounceTime, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView,} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { LeaveService } from 'src/app/service/LeaveService/leave.service';
import { startOfMonth, addMonths, subMonths } from 'date-fns';

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
    `,
  ],
  templateUrl: './attendence-calender.component.html',
})
export class AttendenceCalenderComponent {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  employeeNameChange$ = new Subject<string>();
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  
  employeeName: any;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  calendarDetails: any[] = [];
  activeDayIsOpen: boolean = true;
  filteredEmployees:any;
  attendanceData: any;
  employeeCode: any;

  constructor(private modal: NgbModal, private attendanceService:LeaveService) {}

  ngOnInit(){
    const payload ={
      "employeeCode": this.employeeCode!=null?this.employeeCode:this.attendanceService.getEmployeeCode(),
      "month": (new Date().getMonth()+1).toString(),
      "year": new Date().getFullYear().toString()
    }
    this.fetchAttendanceData(payload);
    
    this.employeeNameChange$.pipe(
      debounceTime(300) // Adjust the debounce time as necessary
    ).subscribe((searchTerm:any) => {
      this.onEmployeeNameChange(searchTerm);
    }); 
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

     fetchAttendanceData(payload:any): void {
        
        // this.attendanceService.getAttendanceData(payload).subscribe((data:any) => {
        //   this.attendanceData = data;
        //   // this.events = data.attendanceRecords.map((event: any) => ({
        //   //   start: new Date(event.startDate),
        //   //   end: new Date(event.endDate),
        //   //   title: event.finalStatusName,
        //   // }));
        //   if (data.code === 1 && data.status === 'Successful') {
        //     this.calendarDetails = data.attendanceRecords;
        //     this.events = this.calendarDetails.map(record => ({
        //       start: new Date(record.attendanceDate),
        //       title: record.finalStatusName,
        //       meta: {
        //         remarks: record.systemRemark
        //       }
        //     }));
        //   }
        //   console.log('this attendece',this.attendanceData)
        // });
      // const month = new Date().getMonth() + 1; // JavaScript months are zero-based, so +1 for human-readable format
      // const year = new Date().getFullYear();

      this.attendanceService.getAttendanceData(payload).subscribe(response => {
        if (response.code === 1 && response.status === 'Successful') {
          this.events = response.attendanceRecords.map((record:any) => ({
            start: new Date(record.attendanceDate),
            title: `${record.finalStatusName} - ${record.actualPunchInTime !== '0001-01-01T00:00:00' ? `In: ${new Date(record.actualPunchInTime).toLocaleTimeString()}` : ''} ${record.actualPunchOutTime !== '0001-01-01T00:00:00' ? `Out: ${new Date(record.actualPunchOutTime).toLocaleTimeString()}` : ''} ${record.systemRemark}`,
            color: this.getStatusColor(record.finalStatusName),
            meta: {
              remarks: record.systemRemark
            }
          }));
      }
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    // this.viewDate = addMonths(this.viewDate, 0); // Move to the next month
    // let payload = {
    //   "employeeCode": this.attendanceService.getEmployeeCode(),
    //   "month": (this.viewDate.getMonth()-1).toString(),
    //   "year": this.viewDate.getFullYear().toString() 
    // }
    // this.fetchAttendanceData(payload);
  }

  onEmployeeNameInputChange(event: any) {
    const value = event.target.value;
    // console.log("employee search trigger!!!!")
      const inputValue = event.target.value.toLowerCase();
    
    // Assuming employees are fetched from a service or static list
    // if (inputValue) {
    //   this.filteredEmployees = this.leaveRequests.filter((employee:any) =>
    //     (employee.FirstName + ' ' + employee.LastName + ' ' + employee.EmployeeCode)
    //     .toLowerCase()
    //     .includes(inputValue)
    //   );
    //   // this.filter.employeeName =
    // } else {
    //   this.filteredEmployees = [];
    // }
     this.employeeNameChange$.next(value);
  }
  onEmployeeNameChange(employeeName: string) {
    if (employeeName.trim()) {
      const payload = { EmpSearch: employeeName };
      this.attendanceService.searchEmployee(payload).subscribe({
        next: (employees: any) => {
          this.filteredEmployees = employees.employeeList; 
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
          // this.filter.EmployeeCode = employee.EmployeeCode.trim();
          // this.filter.employeeName = employee.FirstName;  // Set the input value to the selected employee
          // this.filter.selectedEmployee = employee.FirstName;  // Set selected employee for filter application
          // this.filteredEmployees = [];  // Clear the dropdown after selection
          // this.leaveRequests = this.leaveRequests.filter(
          //   (request:any) => request.FirstName.toLowerCase() === this.filter.selectedEmployee.toLowerCase()
          // );
          // this.filter.employeeName = employee.FirstName + ' ' + employee.LastName + ' (' + employee.EmployeeCode + ')';
          
          // // Clear the dropdown after selecting an employee
          // this.filteredEmployees = [];  
        }
        getStatusColor(status: string) {
          switch (status) {
            case 'Half Day':
              return { primary: '#ffa726', secondary: '#ffcc80' };
            case 'WeekOff':
              return { primary: '#66bb6a', secondary: '#a5d6a7' };
            case 'NoStatus':
              return { primary: '#ef5350', secondary: '#e57373' };
            default:
              return { primary: '#29b6f6', secondary: '#81d4fa' };
          }
        }
        // previousMonth(): void {
        //   this.viewDate = subMonths(this.viewDate, 1); // Move to the previous month
        //   let payload = {
        //     "employeeCode": this.attendanceService.getEmployeeCode(),
        //     "month": (this.viewDate.getMonth()).toString(),
        //     "year": this.viewDate.getFullYear().toString() 
        //   }
        //   this.fetchAttendanceData(payload);
        // }
        nextMonth(): void {
          // this.viewDate = addMonths(this.viewDate, 0); // Move to the next month
          let payload = {
            "employeeCode": this.employeeCode!=null?this.employeeCode:this.attendanceService.getEmployeeCode(),
            "month": (addMonths(this.viewDate, 0).getMonth()).toString(),
            "year": this.viewDate.getFullYear().toString() 
          }
          this.fetchAttendanceData(payload);
        }
}
