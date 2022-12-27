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
  checked: boolean = false;


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
  projectId: any;
  projectFlag :any;
  RADetails: any;
  RAName: any;
  ra_filter: any;
  RAFilterData: any;
  selectedUser:any;
  UserData: any;
  userValue: any;
  paramsUserId: any;
  member1: string;

  constructor(
    private rest: RestService,
    private Global: Global,
  ) { }

  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userRole = this.userLoggedIn.defaultroleid;
    this.userId = this.userLoggedIn.id;
    this.userEmail = this.userLoggedIn.emailid;
    this.userValue = this.userId
    // this.member1="Only Me"
    this.GetProjectbyTask()
    this.ShowDetails()
    // console.log('this.projectFlag',this.projectFlag)
    // if(this.projectFlag == 0){
    //   this.GetTimesheetData()
    // }
if(this.projectFlag==0){
  this.member = ['Only Me'];
}
else{
    this.member = ['Only Me', 'Team'];
}
    // this.member = ['Only Me']
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
   
  }
  ShowDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/RAMapping/GetRADetails').subscribe((data: any) => {
      if (data.Success) {
        this.RADetails = data.Data;
        // this.RAName = this.removeDuplicates(this.RADetails, "raname")
       
      }
    })
  }
  RAUsers() {
    // if(this.checked){
    //   this.selectedMem.value='Only Me'
    // }
     this.ra_filter = this.userId
    //  console.log( 'ra filter',  this.ra_filter)
     this.RAFilterData = this.RADetails.filter(task => task.ra_id === this.ra_filter);
    
   }

  ChangeMember(member:any){
    
    // console.log('member' ,member)
    if(member=='Only Me'){
      this.checked=false
      this.paramsUserId = this.userId
      this.GetTimesheetData(this.paramsUserId)
    }
    if(member=='Team'){
      this.checked=false
      this.paramsUserId =  this.userValue
      // this.GetTimesheetData()
    }
  }
  handleDateClick(arg:any) {

   
    this.TaskDt = arg.dateStr
    
    var model = {
      userid:  this.userValue,
      // this.userId,
      date: arg.dateStr
    }
    // console.log('date model',model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetMonthlyhoursData', model).subscribe((data: any) => {
      if (data.Success) {
        this.taskDate = data.Data;
        // console.log('date model', this.taskDate );
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
  // console.log('time sheet date model' , model)
    // this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTaskname', model).subscribe((data: any) => {
    //   if (data.Success) {
    //     this.ProjectNames = data.Data;
    //   }
     
    // })

    var model1 = {
      userid: this.userId,
      // roleid: this.userRole

    }
    // this.projectFlag=0
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimeSheetProjectNamesByRole', model1).subscribe((data: any) => {
      
      if (data.Success) {
        // console.log('data.length' ,data.Data.length )
        if(data.Data.length > 0) {
          this.projectFlag = 1
          this.ProjectNames = data.Data;
          this.member = ['Only Me', 'Team'];
        
          this.GetTimesheetData(this.userValue)
          // console.log(this.ProjectNames)
        }
        else{
          this.projectFlag = 0
          // console.log('projectflag',this.projectFlag)
          this.member = ['Only Me'];
          this.GetTimesheetData(this.userValue)
        }
      }
     
     
    })

  }

  GetTaskNameByProject(Project: any) {
    // this.projectName = Project.projectname;
    // // console.log(this.projectName)
    // this.selectedTaskProject = this.projectName
    this.projectId = Project.projectid
    // console.log('selected project', this.projectId)
    this.getUserByProjectId()

  }

  hours =0
  minutes=0
  params:any
  GetTimesheetData(user:any) {
    // console.log(user)
    this.hoursArray = []
    this.datedata=[]

       this.Montharray.splice(0);

        this.params = {
          userid: user
        }
  
    // console.log('GetTimesheetData of user' ,  this.params)
    // console.log('calendarOptions',this.calendarOptions)
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetProject',this.params).subscribe((data: any) => {
      // console.log("Timesheet hours minute data", data);
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
            
            console.log('this.Montharray',this.Montharray)

          }
          this.hoursArray = this.Montharray;
          // this.Montharray=[]
          // console.log("MonthArrayData..", this.Montharray);

          // console.log("totaltimehr", this.totaltimehr);
      }
    })
  }

  GetUserid(user:any){
    // console.log('user',user)
    // this.calendarOptions.get('date').setValue(null);
    if(user){
      this.userValue = user.userid
      console.log('user', this.userValue)
      this.GetTimesheetData(this.userValue)
    }
    else{
      this.userValue = this.userId
    }
  }

  getUserByProjectId() {
    if (this.selectedProject) {
      var model = {
        projectid: this.selectedProject.projectid
      }
      // console.log('project id', model)
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetAllUsersByProjectID', model).subscribe((data: any) => {
        if (data.Success) {
          this.UserData = data.Data;
          // console.log('user data',this.UserData)
        }
      })
    }
  }

  dateClick(event) {
    // console.log("Date Data", event);
  }

  eventClick(event) {
    // console.log("Event Data", event);
  }
}
