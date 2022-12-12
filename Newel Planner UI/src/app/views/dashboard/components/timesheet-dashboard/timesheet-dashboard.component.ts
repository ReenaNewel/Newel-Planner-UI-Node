import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';

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
  selectedCountry: string;
  currentEvents: EventApi[];

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

    this.member = ['Only Me', 'Team'];
  }

 arr = [
    { title: '5 hrs', date: '2022-12-01' },
    { title: '9 hrs', date: '2022-12-02' },
    { title: '9 hrs', date: '2022-12-22' },
    { title: '9 hrs', date: '2023-02-15' },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.arr,
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
    console.log("this.currentEvents", this.currentEvents);
  }

  handleDateClick(arg) {
    console.log("arg", arg);

    // alert('date click! ' + arg + arg.dateStr)
  }

  GetProjectbyTask() {
    var model = {
      userid: this.userId

    }

    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTaskname', model).subscribe((data: any) => {

      if (data.Success) {
        this.ProjectNames = data.Data;
      }
      else {
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

}
