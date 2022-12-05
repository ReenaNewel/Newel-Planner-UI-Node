import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global'
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-accordion',
  templateUrl: './task-accordion.component.html',
  styleUrls: ['./task-accordion.component.scss'],
  providers: [MessageService],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class TaskAccordionComponent implements OnInit {

  products: any[]
  dataSource: any;
  dataSource2: any;
  dataSource4: any;
  dataSource5: any;
  dataSource3: any;
  TimesheetDate1: any;
  TimesheetDate2: any;
  TimesheetDate3: any;
  TimesheetDate4: any;
  TimesheetDate5: any;
  Totalhrs = 0;
  Totalmin = 0;
  totaltime: any;
  totaltimehr = 0;
  Totalhrs1 = 0;
  Totalmin1 = 0;
  totaltime1: any;
  totaltimehr1 = 0;
  Totalhrs2 = 0;
  Totalmin2 = 0;
  totaltime2: any;
  totaltimehr2 = 0;
  Totalhrs3 = 0;
  Totalmin3 = 0;
  totaltime3: any;
  totaltimehr3 = 0;
  Totalhrs4 = 0;
  Totalmin4 = 0;
  totaltime4: any;
  totaltimehr4 = 0;
  userLoggedIn: any;
  userRole: any;
  userId: any;
  userEmail: any;
  minutes: number[];
  hours: number[];
  ProjectNames: any;
  Tasknames: any;
  projectId: any;
  projectName: any;
  selectedTaskProject: any;
  ProjectTypes: any;
  ProjectActivities: any;
  projectnames: any;
  tasktypes: any;
  tasks: any;
  selectedProject: any
  SelectedTask:any;
  selectedAcitivity:any
  selectedHours:any
  selectedMinutes:any
  selectedDiscription :any
  disabledEdit: boolean = false;
  constructor(private router: Router, private messageService: MessageService,
    private rest: RestService,
    private Global: Global, private ApiService: ApiserviceService) { }

  ngOnInit(): void {

    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userRole = this.userLoggedIn.defaultroleid;
    this.userId = this.userLoggedIn.id;
    this.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    this.minutes = [15, 30, 45]


    this.getProjectActivity()
    this.getProjectName()
    this.GetProjectbyTask()

    this.showallData()

    this.ShowDetails()
  }

  showallData() {
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTaskTypes').subscribe((data: any) => {
      this.tasktypes = data.Data;

    })
    this.rest.getAll(this.Global.getapiendpoint() + '/Project/GetAllProjectName').subscribe((data: any) => {
      this.projectnames = data.Data;
    })



    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTasks').subscribe((data: any) => {
      this.tasks = data.Data;
    })
  }
  getProjectActivity() {
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + 60).subscribe((data: any) => {
      this.ProjectActivities = data.Data;
      console.log("ProjectActivities",this.ProjectActivities);
      
    })
  }

  getProjectName() {
    var model = {
      userid: this.userId

    }
    // console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetProject', model).subscribe((data: any) => {

      this.ProjectTypes = data.Data;
    })
  }

  GetTaskNameByProject(Project: any) {
    // console.log("selected task : ", Project);

    this.projectId = Project.projectid;

    var model = {
      projectid: this.projectId,
      userid: this.userId

    }
    // console.log('project id , ' , model)
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTaskname', model).subscribe((data: any) => {
    
      if (data.Success) {
        this.Tasknames=""
        this.Tasknames = data.Data;
        // console.log("Tasknames 1", this.Tasknames);

      }
      else {
      }
    })
  }

  GetProjectbyTask() {
    var model = {
      userid: this.userId

    }

    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTaskname', model).subscribe((data: any) => {

      if (data.Success) {
        this.ProjectNames = data.Data;
        // console.log('project names', this.ProjectNames)

      }
      else {
      }
    })
  }
  setEditFlag:boolean
  

  editRow(item: any) {
    this.disabledEdit = true
    // if(this.disabledEdit){
    //   alert('cant edit')
    // }
    // else{
    //   alert('edit')
    // }

    // console.log("editRow item:", item );
    this.GetTaskNameByProject(item)
    
  }

  saveRow(data: any) {
    // console.log("saveRow data:", data);
    this.disabledEdit = false

  }

  showError() {
    this.messageService.add({severity:'warn', summary: 'warn', detail: 'One Timesheet Is already Opened,Please Submit It First..'});
}

  CancelRow(){
    this.disabledEdit = false

  }

  ShowDetails() {
    this.Totalhrs = 0;
    this.Totalmin = 0;
    this.totaltimehr = 0;
    this.Totalhrs1 = 0;
    this.Totalmin1 = 0;
    this.totaltimehr1 = 0;
    this.Totalhrs2 = 0;
    this.Totalmin2 = 0;
    this.totaltimehr2 = 0;
    this.Totalhrs3 = 0;
    this.Totalmin3 = 0;
    this.totaltimehr3 = 0;
    this.Totalhrs4 = 0;
    this.Totalmin4 = 0;
    this.totaltimehr4 = 0;

    var model = {
      userid: this.userId,
      day: 1
    }
    // console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard', model).subscribe((data: any) => {
      if (data.Success) {
        this.dataSource = data.Data

        if (this.dataSource.length > 0) {
          this.TimesheetDate1 = moment(data.Data[0].date).format("DD-MM-YYYY")
          for (var i = 0; i < this.dataSource.length; i++) {
            this.Totalmin = (this.Totalmin + data.Data[i].timeinminutes)
            this.Totalhrs = this.Totalhrs + data.Data[i].timeinhours
          }
          if (this.Totalmin >= 60) {
            this.Totalmin = this.Totalmin / 60
          }
          else {
            this.Totalmin = this.Totalmin / 100
          }
        }
        this.totaltimehr = this.Totalhrs + this.Totalmin
      }
    })

    var model = {
      userid: this.userId,
      day: 2
    }
    // console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard', model).subscribe((data: any) => {
      // console.log('data.Data', data.Data)
      if (data.Success) {
        this.dataSource2 = data.Data
        // console.log('datasouce2 :::', this.dataSource2)
        this.projectId = this.dataSource2.projectid

        if (this.dataSource2.length > 0) {
          this.TimesheetDate2 = moment(data.Data[0].date).format("DD-MM-YYYY")
          for (var i = 0; i < this.dataSource2.length; i++) {
            this.Totalmin1 = (this.Totalmin1 + data.Data[i].timeinminutes)
            this.Totalhrs1 = this.Totalhrs1 + data.Data[i].timeinhours
          }
          if (this.Totalmin1 >= 60) {
            this.Totalmin1 = this.Totalmin1 / 60
          }
          else {
            this.Totalmin1 = this.Totalmin1 / 100
          }
        }
        this.totaltimehr1 = this.Totalhrs1 + this.Totalmin1
      }
    })


    var model = {
      userid: this.userId,
      day: 3
    }
    // console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard', model).subscribe((data: any) => {
      this.dataSource3 = data.Data
      if (this.dataSource3.length > 0) {

        this.TimesheetDate3 = moment(data.Data[0].date).format("DD-MM-YYYY")
        for (var i = 0; i < this.dataSource3.length; i++) {
          this.Totalmin2 = (this.Totalmin2 + data.Data[i].timeinminutes)
          this.Totalhrs2 = this.Totalhrs2 + data.Data[i].timeinhours
        }
        if (this.Totalmin2 >= 60) {
          this.Totalmin2 = this.Totalmin2 / 60
        }
        else {
          this.Totalmin2 = this.Totalmin2 / 100
        }
        this.totaltimehr2 = this.Totalhrs2 + this.Totalmin2
      }

    })

    var model = {
      userid: this.userId,
      day: 4
    }
    // console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard', model).subscribe((data: any) => {
      if (data.Success) {
        this.dataSource4 = data.Data
        // console.log('datasource4', this.dataSource4)
        if (this.dataSource4.length > 0) {
          this.TimesheetDate4 = moment(data.Data[0].date).format("DD-MM-YYYY")
          for (var i = 0; i < this.dataSource4.length; i++) {
            this.Totalmin3 = (this.Totalmin3 + data.Data[i].timeinminutes)
            this.Totalhrs3 = this.Totalhrs3 + data.Data[i].timeinhours
          }
          if (this.Totalmin3 >= 60) {
            this.Totalmin3 = this.Totalmin3 / 60
          }
          else {
            this.Totalmin3 = this.Totalmin3 / 100
          }
          this.totaltimehr3 = this.Totalhrs3 + this.Totalmin3
        }
      }
    })

    var model = {
      userid: this.userId,
      day: 5
    }
    // console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard', model).subscribe((data: any) => {
      if (data.Success) {
        this.dataSource5 = data.Data
        if (this.dataSource5.length > 0) {
          this.TimesheetDate5 = moment(data.Data[0].date).format("DD-MM-YYYY")
          for (var i = 0; i < this.dataSource5.length; i++) { 
            this.Totalmin4 = (this.Totalmin4 + data.Data[i].timeinminutes)
            this.Totalhrs4 = this.Totalhrs4 + data.Data[i].timeinhours
          }
          if (this.Totalmin4 >= 60) {
            this.Totalmin4 = this.Totalmin4 / 60
          }
          else {
            this.Totalmin4 = this.Totalmin4 / 100
          }
          this.totaltimehr4 = this.Totalhrs4 + this.Totalmin4
        }
      }
    })
  }

  // saveTimesheet(TimeSheetSavedData:any,TimeSheetSavedDate:any) {
  //   let model = {
  //     projectid: TimeSheetSavedData.projectid,
  //     taskid: TimeSheetSavedData.taskid,
  //     description:TimeSheetSavedData.description,
  //     timeinhours: TimeSheetSavedData.timeinhours,
  //     timeinminutes: TimeSheetSavedData.timeinminutes,
  //     date: moment(TimeSheetSavedDate).format('YYYY-MM_DD'),
  //     isactive: true,
  //     activityid:TimeSheetSavedData.typeid,
  //     modified_date: moment().format('YYYY-MM-DD'),
  //     modified_by: this.userId

  //   }

  //   // console.log("save timesheet model",model);
  //   this.rest.create(this.Global.getapiendpoint() + "/timesheet/CreateTimesheet", model).subscribe((data: any) => {
  //     if (data.Success) {
  //       this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Timesheet Record Updated successfully' });
  //       // this.child.ShowDetails();
  //     }
  //     else {
  //       this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not Updated' });
  //     }
  //   });

  // }

  UpdateTimesheet(TimeSheetSavedData:any,TimeSheetSavedDate:any){
    console.log('data to  be updates' , TimeSheetSavedData)
   
    this.disabledEdit = false
    
    let model= {
      
      id : TimeSheetSavedData.id,
      projectid :TimeSheetSavedData.projectid,
      taskid :TimeSheetSavedData.taskid,
      description:TimeSheetSavedData.description,
      timeinhours: TimeSheetSavedData.timeinhours,
      timeinminutes : TimeSheetSavedData.timeinminutes,
      date: moment(new Date(TimeSheetSavedDate)).format('YYYY-MM_DD'),
      isactive:true ,
      activityid: TimeSheetSavedData.typeid,
      modified_date:moment().format('YYYY-MM-DD'),
      modified_by: this.userId
    
    
    }
    console.log("Update model",model);
  
    // this.rest.create(this.Global.getapiendpoint() + "/timesheet/UpdateTimesheet", model).subscribe((data: any) => {
    //         console.log("data", data);
    //         if (data.Success) {
    //           this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Timesheet Record Updated successfully' });
            
    //         }
    //         else {
    //           this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not Updated' });
    //         }
    //         this.ShowDetails()
    //       });
     
       }

}
