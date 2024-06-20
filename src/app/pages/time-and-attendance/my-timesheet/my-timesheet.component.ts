import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-my-timesheet',
  templateUrl: './my-timesheet.component.html',
  styleUrls: ['./my-timesheet.component.css']
})
export class MyTimesheetComponent {

  @ViewChild('modalForm') modalForm !: ElementRef<any>;
  @ViewChild('viewRequest') viewRequest !: ElementRef<any>;
  @ViewChild('closebutton') closebutton: any;
  attendanceForm !: FormGroup
  accountForm !: FormGroup
  now: Date | undefined;
  currentDate: string | undefined;
  currentTime: string | undefined;
  currentDay: string | undefined;

  checkInTime: number | null = null;
  checkOutTime: number | null = null;
  duration: number = 0;

  shiftTimeIn = '9:30:00'
  shiftTimeOut = '18:30:00'
  isoDateString!: string
  accurateTime: any;
  appliedDate: any;
  output: any = [];
  attendanceList: any = [];

  header: string = '';
  modalData: any = [];
  flag: number = 0;
  formattedDate: any;
  accountYear: any = [];
  dates: any = [];
  requestData :any =[];

  joiningDate: any = new Date("2024-03-12T11:01:42.097Z");

  // joiningDate : any = "2024-03-12T11:01:42.097Z";
  todayDate = new Date();

  constructor(private apiService: ApiService,
    private datePipe: DatePipe,
    private f: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.attendanceForm = this.f.group({

      TimeIn: ['', Validators.required],
      TimeOut: ['', Validators.required],
      Remark: ['', Validators.required]

    })

    this.accountForm = this.f.group({

      _year: [''],
      _month: [''],

    })

    // const send_date=new Date();
    // console.log(send_date); 
    // send_date.setMonth(send_date.getMonth() + 2);
    // this.formattedDate = send_date.toISOString().slice(0,10);
    // console.log(this.formattedDate); 


    //Account Year
    // const previousDate = new Date (this.formatDate.setFullYear(this.formatDate.getFullYear() - 1));
    const previousDate = this.subtarctYear(this.joiningDate, 1);
    const nextDate = new Date(this.todayDate.setFullYear(this.todayDate.getFullYear() + 1))
    let id = 1
    while (previousDate.getFullYear() < nextDate.getFullYear()) {

      const account = 'April ' + previousDate.getFullYear() + ' - ' + 'March ' + (previousDate.getFullYear() + 1)
      var data = {
        id: id,
        account: account,
        fromDate: new Date(previousDate.getFullYear() + '-' + '04' + '-' + '01'),
        toDate: new Date((previousDate.getFullYear() + 1) + '-' + '03' + '-' + '31')

      }
      this.accountYear.push(data);
      // this.accountForm.get('_year')?.setValue(2);
      previousDate.setFullYear(previousDate.getFullYear() + 1);
      id = id + 1
    }
    // console.log('Account Year', this.accountYear)
    //

    if (sessionStorage.getItem('accountYear') != null) {
      this.onLoad();
    }
    else{
      this.getAttendanceByUser('K-210', new Date())
    }

    // this.getAttendanceByUser('K-210', new Date())
    // this.onLoad();
  }

  subtarctYear(date: Date, years: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - years);
    return newDate;
  }


  onYearChange() {

    let data = null;
    // if(sessionStorage.getItem('accountYear') != null){
    //   data = JSON.parse(sessionStorage.getItem('accountYear') || '[]')
    //   this.accountForm.patchValue({
    //     _year : data[0].id
    //   })
    // }
    // else{
    data = this.accountYear.filter((element: any) => element.id == this.accountForm.get('_year')?.value)
    sessionStorage.setItem('accountYear', JSON.stringify(data));
    // }
    console.log(sessionStorage.getItem('accountYear'));


    this.dates = [];
    const fromDate = new Date(data[0].fromDate); // Create a copy of fromDate
    const toDate = new Date(data[0].toDate); // Create a copy of toDate

    let isVisible = true;
    while (fromDate <= toDate) {


      // const year1 = this.joiningDate.getFullYear();
      // const month1 = this.joiningDate.getMonth();
      // const year2 = fromDate.getFullYear();
      // const month2 = fromDate.getMonth();

      // // if (this.joiningDate.getFullYear() > fromDate.getFullYear() || (year1 === year2 && month1 > month2) {

      // //   console.log('Hi')
      // // }
      // debugger
      // if (year1 > year2 || (year1 === year2 && month1 > month2)) {
      //   console.log('date1 is later')
      //   isVisible = false
      // } else if (year1 < year2 || (year1 === year2 && month1 < month2)) {

      //   console.log('date1 is earlier');
      // } else {
      //   console.log('dates are the same');
      // }

      var allMonths = {
        _date: fromDate.toLocaleString()
      }
      this.dates.push(allMonths);
      fromDate.setMonth(fromDate.getMonth() + 1);  // Move to the next month
      // console.log(this.accountYear);
    }
    // console.log('Dates', this.dates);


  }

  onLoad() {
    let data = null;
    // if (sessionStorage.getItem('accountYear') != null) {
      data = JSON.parse(sessionStorage.getItem('accountYear') || '[]')
      this.accountForm.patchValue({
        _year: data[0].id
      })
      console.log(sessionStorage.getItem('accountYear'));
      this.dates = [];
      const fromDate = new Date(data[0].fromDate); // Create a copy of fromDate
      const toDate = new Date(data[0].toDate); // Create a copy of toDate

      let isVisible = true;
      while (fromDate <= toDate) {


        // const year1 = this.joiningDate.getFullYear();
        // const month1 = this.joiningDate.getMonth();
        // const year2 = fromDate.getFullYear();
        // const month2 = fromDate.getMonth();

        // // if (this.joiningDate.getFullYear() > fromDate.getFullYear() || (year1 === year2 && month1 > month2) {

        // //   console.log('Hi')
        // // }
        // debugger
        // if (year1 > year2 || (year1 === year2 && month1 > month2)) {
        //   console.log('date1 is later')
        //   isVisible = false
        // } else if (year1 < year2 || (year1 === year2 && month1 < month2)) {

        //   console.log('date1 is earlier');
        // } else {
        //   console.log('dates are the same');
        // }

        var allMonths = {
          _date: fromDate.toLocaleString()
        }
        this.dates.push(allMonths);
        fromDate.setMonth(fromDate.getMonth() + 1);  // Move to the next month

      }
    // }
    if (sessionStorage.getItem('_monthData') != null) {
      let _month = sessionStorage.getItem('_monthData');
      this.accountForm.get('_month')?.setValue(_month);
      if (_month != null) { 
          this.getAttendanceByUser('k-210',  new Date(_month));
       }
    }
  }

  onMonthChange() {
    const _month = this.accountForm.get('_month')?.value
    sessionStorage.setItem('_monthData', _month);
    this.getAttendanceByUser('k-210', new Date(_month))

  }

  show(data: any, flag: string) {

    this.modalData = data;
    this.flag = Number(flag);
    if (flag == '1') {
      let formatDate = this.datePipe.transform(data.Shift_Date, 'd MMMM y')
      this.header = 'Correct Attendance' + ' ( ' + formatDate + ' ) '
      // if(data.Check_In != null && data.Check_Out != null){
      //   this.attendanceForm.get('TimeIn')?.setValue(data.Check_In);
      // }
    }
    // if(flag == '2') {
    //   let formatDate = this.datePipe.transform(data.Shift_Date, 'd MMMM y')
    //   this.header = 'Attendance Details' + ' ( ' + formatDate + ' ) '
    //   // if(data.Check_In != null && data.Check_Out != null){
    //   //   this.attendanceForm.get('TimeIn')?.setValue(data.Check_In);
    //   // }
    // }
    const modal = new Modal(this.modalForm.nativeElement);
    modal.show();
  }


  getAttendanceByUser(data: any, _date: any) {


    var input =
    {
      // "id": 0,
      UserId: data,
      // CheckIn: new Date(),
      //  CheckOut: "2024-05-27T11:01:42.097Z",
      // WorkedHrs: "string",
      // ShiftId: 0,
      ShiftDate: _date
    }
    this.apiService.getAttendanceByUserId(input).subscribe(resp => {
      if (resp != null && resp != undefined) {
        this.attendanceList = resp.obj
        console.log(this.attendanceList);
        this.attendanceList.forEach((element: any) => {

          if (element.Check_In != null) {
            element.Late = this.calTimeDiff(element.Check_In, '9:30');
          }
          if (element.Check_Out != null) {
            element.Early = this.calTimeDiff(element.Check_Out, '18:30');
          }
          // if (this.isEmptyObject(element.Check_In)) {
          //   element.Check_In = null
          // }
          // else {
          //   element.Late = this.calTimeDiff(element.Check_In, '9:30');
          // }

          // if (this.isEmptyObject(element.Check_Out)) {
          //   element.Check_Out = null
          // }
          // else {
          //   element.Early = this.calTimeDiff(element.Check_Out, '18:30');
          // }

        });
      }
    })
  }


  updateAttendance() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.apiService.getCurrentTime(timezone).subscribe((resp: any) => {
      // this.apiService.getInfo().subscribe(resp => {
      if (resp != null && resp != undefined) {
        console.log(resp.datetime);
        var data = {
          UserId: 'k-210',
          CheckIn: resp.datetime,
        }
        this.apiService.updateAttendance(data).subscribe(resp => {
          if (resp != null && resp != undefined) {
            console.log(resp);
            this.getAttendanceByUser('K-210', new Date())

          }
        })
      }
    }, error => {
      console.error('Error fetching time:', error);
    })

  }

  //User for Check object empty or not
  isEmptyObject(obj: any): boolean {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  accurateDateTime() {

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.apiService.getCurrentTime(timezone).subscribe((response: any) => {
      console.log(response)
      this.accurateTime = response.datetime;

      console.log(this.accurateTime)
    }, error => {
      console.error('Error fetching time:', error);
      this.accurateTime = 'Could not fetch time';
    });
  }



  calTimeDiff(timeString: string, shiftTime: string) {
    // console.log(timeString);
    let t = timeString.split('T')[1];
    let ms = Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000;

    let t1 = shiftTime;
    let ms1 = Number(t1.split(':')[0]) * 60 * 60 * 1000 + Number(t1.split(':')[1]) * 60 * 1000;
    // this.duration = ms1 - ms;
    this.duration = Math.abs(ms1 - ms)

    const totalMinutes = Math.floor(this.duration / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');

    return hoursString + ':' + minutesString;

  }

  punchAttendance() {
    // console.log(this.modalData);
    const data = this.attendanceForm.value;
    let TimeIn = this.modalData.Shift_Date.replace("00:00:00", "09:30");
    let TimeOut = this.modalData.Shift_Date.replace("00:00:00", data.TimeOut);

    if (this.attendanceForm.valid) {
      var input = {
        UserId: 'k-210',
        CheckIn: TimeIn,
        CheckOut: TimeOut,
        ShiftDate: this.modalData.Shift_Date,
        Remark: data.Remark,
        Application_Type: this.flag,
        AppliedDate: new Date()
      }
      this.apiService.punchTimeApplication(input).subscribe(resp => {
        if (resp != null && resp != undefined) {
          this.closebutton.nativeElement.click();
          this.toastr.success("Application Submited Successfully!");

        }
      })
    }
  }


  getAppliedDate() {
    // this.apiService.getInfo().subscribe(resp => {
    //   if (resp != null && resp != undefined) {

    //     this.appliedDate = resp.datetime;
    //   }
    // }, error => {
    //   console.error('Error fetching time:', error);
    // })

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.apiService.getCurrentTime(timezone).subscribe((response: any) => {
      if (response != null && response != undefined) {
        this.appliedDate = response.datetime;
        debugger
        console.log(this.appliedDate)
      }
    }, error => {
      console.error('Error fetching time:', error);
      this.accurateTime = 'Could not fetch time';
    });
  }

  onView(data:any){
    // this.requestData = data;

    var input ={
      Emp_Id : data.User_Id,
      Shift_Date : data.Shift_Date
    }
     this.apiService.getApplicationByUserId(input).subscribe(resp=>{
      if(resp != null && resp != undefined){
        console.log(resp)
        this.requestData = resp.obj[0];
        console.log(this.requestData);
        const modal = new Modal(this.viewRequest.nativeElement);
        modal.show()
      }
     })
  }


}
