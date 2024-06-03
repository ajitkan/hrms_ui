
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Modal } from 'bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent {


  @ViewChild('modalForm') modalForm !: ElementRef<any>;

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
  output: any = [];
  attendanceList: any = [];

  header:string ='';

  constructor(private apiService: ApiService,
              private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.getAttendanceByUser('K-210')
  }

  show(data : any ,flag : string) {

    if(flag == '1'){
      debugger
      let formatDate = this.datePipe.transform(data.Shift_Date,'d MMMM y' )
      this.header = 'Correct Attendance' + ' ( ' + formatDate  + ' ) '
    }
    else{
      let formatDate = this.datePipe.transform(data.Shift_Date,'d MMMM y' )
      this.header = 'Attendance Details' + ' ( ' + formatDate  + ' ) '
    }
    const modal = new Modal(this.modalForm.nativeElement);
    modal.show();
  }


  getAttendanceByUser(data: any) {


    var input =
    {
      // "id": 0,
      UserId: data,
      // CheckIn: new Date(),
      //  CheckOut: "2024-05-27T11:01:42.097Z",
      // WorkedHrs: "string",
      // ShiftId: 0,
      //ShiftDate: "2024-05-27T11:01:42.097Z"
    }
    this.apiService.getAttendanceByUserId(input).subscribe(resp => {
      if (resp != null && resp != undefined) {
        this.attendanceList = resp.obj
        this.attendanceList.forEach((element: any) => {
          if (this.isEmptyObject(element.Check_In)) {
            element.Check_In = null
          }
          else {
            element.Late = this.calTimeDiff(element.Check_In, '9:30');
          }

          if (this.isEmptyObject(element.Check_Out)) {
            element.Check_Out = null
          }
          else {       
            element.Early = this.calTimeDiff(element.Check_Out, '18:30');
          }

        });
      }
    })
  }


  updateAttendance() {
    this.apiService.getInfo().subscribe(resp => {
      if (resp != null && resp != undefined) {
        console.log(resp.datetime);
        var data = {
          UserId: 'k-210',
          CheckIn: resp.datetime,
        }
        this.apiService.updateAttendance(data).subscribe(resp => {
          if (resp != null && resp != undefined) {
            console.log(resp);
            this.getAttendanceByUser('K-210')

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
    console.log(timeString);
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

}
