import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import { AnyRecord } from 'dns';

@Component({
  selector: 'app-timesheet-dashboard',
  templateUrl: './timesheet-dashboard.component.html',
  styleUrls: ['./timesheet-dashboard.component.scss']
})
export class TimesheetDashboardComponent implements OnInit {

  selectedMem: any;
  ProjectNames: any[];
  userRole: any;
  userId: any;
  userEmail: any;
  userLoggedIn: any;
  selectedProject: any;

  member: any[];
  selectedValue: string;
  currentEvents: EventApi[];
  Montharray = [];
  datedata = [];
  hoursArray = [];
  taskDate: any;
  totalhours: any;
  totalMinutes: any;
  totaltimehr: any;
  totalCalculatedMinutes: number;
  totalCalculatedhrs: number;
  TaskDt: any;
  constructor(
    private rest: RestService,
    private Global: Global,
  ) { }

  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userRole = this.userLoggedIn.defaultroleid;
    this.userId = this.userLoggedIn.id;
    this.userEmail = this.userLoggedIn.emailid;

    this.GetProjectbyTask()

    // this.member = ['Only Me', 'Team'];
    this.member = ['Only Me']
  }

  // arr = [
  //   { title: '5 hrs', date: '2022-12-01' },
  //   { title: '5 hrs', date: '2022-12-01' },
  //   { title: '9 hrs', date: '2022-12-02' },
  //   { title: '9 hrs', date: '2022-12-22' },
  //   { title: '9 hrs', date: '2023-02-15' },
  // ];
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.Montharray,
    //   headerToolbar: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,timeGridDay'
    // },
    // editable: true,
    selectable: true,
    eventsSet: this.handleEvents.bind(this)
    // selectMirror: true,
    // dayMaxEvents: true,
    //  weekends: false


  };
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    // alert('2 eventsSet' + this.currentEvents)
    // console.log("this.currentEvents", this.currentEvents);
  }

  handleDateClick(arg:any) {
    // console.log("arg", arg);
    // console.log("dateStr", arg.dateStr);
    this.TaskDt = arg.dateStr
    // console.log("dateStr",  this.TaskDt );
    // this.handleEvents.bind(this);
    var model = {
      userid: this.userId,
      date: arg.dateStr
    }
    // console.log('date model',model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetMonthlyhoursData', model).subscribe((data: any) => {
      if (data.Success) {
        this.taskDate = data.Data;
        console.log('date model', this.taskDate );
      }
    })
  }

  dat: any;
  onDateClick(date: { dateStr: string; }) {
    // this.modalRef = this.modalService.show(this.viewModal);
    this.dat = date.dateStr;
    this.handleDateClick(this.dat)
    // console.log("onDateClick Function", date);
  }
  GetProjectbyTask() {
    var model = {
      userid: this.userId

    }

    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTaskname', model).subscribe((data: any) => {
      if (data.Success) {
        this.ProjectNames = data.Data;
      }
     
    })
  }

  GetTaskNameByProject(Project: any) {
    // this.projectName = Project.projectname;
    // // console.log(this.projectName)
    // this.selectedTaskProject = this.projectName
    // this.projectId = Project.projectid
    // console.log(this.projectId)

  }

  hours =0
  minutes=0
  GetTimesheetData(event: any) {
    this.hoursArray = []
    this.datedata=[]
    // this.Montharray=[]
    var model = {
      userid: this.userId
    }
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetProject', model).subscribe((data: any) => {
      console.log("Timesheet hours minute data", data);
      if(data.Success){
          this.datedata = data.Data;
          for (let i = 0; i < this.datedata.length; i++) {
            // console.log("MonthArray..", this.datedata[i]);
            this.totalhours = 0;
            this.totalMinutes = 0;
            this.totalhours = this.datedata[i].timeinhours;
            this.totalMinutes = this.datedata[i].timeinminutes;
            // console.log("TotalHours", this.totalhours);
            // if (this.totalMinutes >= 60) {
            //   //this.totalCalculatedhrs = this.totalMinutes / 60
            // }
            // else {
            //   this.totalCalculatedhrs = this.totalMinutes;
            // }
            this.hours=0
            this.minutes=0
            if (this.totalMinutes >= 60) {
              //this.totalCalculatedhrs = this.totalMinutes / 60
              this.hours = Math.trunc(this.totalMinutes/60);
              this.minutes = this.totalMinutes % 60;
              this.totaltimehr = parseInt(this.totalhours)+ this.hours+ '.' + this.minutes
              // console.log("Hours", this.hours);
              // console.log("Minutes", this.minutes);
              // console.log("totalhours", this.totaltimehr);
            }
          else{
            this.totaltimehr = parseInt(this.totalhours) + this.hours + '.' + this.totalMinutes;
          }
          // this.totaltimehr = this.totalhours + this.totalCalculatedhrs;
            this.Montharray.push({ title: this.totaltimehr, date: this.datedata[i].date.substring(0, 10) })

          }
          this.hoursArray = this.Montharray;
          // console.log("MonthArrayData..", this.Montharray);

          // console.log("totaltimehr", this.totaltimehr);
      }
    })
  }



  dateClick(event) {
    // console.log("Date Data", event);
  }

  eventClick(event) {
    // console.log("Event Data", event);
  }
}
