import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  providers: [MessageService]
})

export class NewTaskComponent implements OnInit {



  selectedProject: any;
  selectedTaskProject: any
  selectedTaskName: any
  tasktypes: any;
  selectedTaskTypeName: any;
  tasks: any;
  selectedtaskstatus: any;
  UserData: any;
  selectedTaskAssignee: any
  selectedEfforts: any
  selectedStartDate: any
  selectedEndate: any
  AssigneeId: any;
  userId: any;
  selectedComment: any
  ProjectActivities: any[];
  ProjectNames: any[];
  ProjectTypes: any[];
  projectnames: any;
  Tasknames: any;
  projectId: any;
  projectName: string;


  constructor(
    private rest: RestService,
    private Global: Global,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  tasksubmit(isvalid: boolean) {
    if (isvalid) {
      console.log('task isvalid', isvalid)
      this.SubmitNewTask()
    }

  }

  getUserByProjectId() {
    if (this.selectedProject) {
      var model = {
        projectid: this.selectedProject.projectid
      }
      console.log('project id', model)
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetAllUsersByProjectID', model).subscribe((data: any) => {
        if (data.Success) {
          this.UserData = data.Data;
        }
      })
    }
  }

  changeAssigneeId(value: any) {
    console.log(value.id)
    this.AssigneeId = value.id
  }

  SubmitNewTask() {
    var model = {
      projectid: this.selectedProject.projectid,
      taskname: this.selectedTaskName,
      tasktypeid: this.selectedTaskTypeName.typeid,
      status: this.selectedtaskstatus.typeid,
      created_by: this.userId,
      efforts: this.selectedEfforts,
      startdate: moment(this.selectedStartDate).format('YYYY-MM-DD'),
      enddate: moment(this.selectedEndate).format('YYYY-MM-DD'),
      // attachment: this.ProjectForm.controls['attachment'].value,
      comments: this.selectedComment,
      userid: this.selectedTaskAssignee.id
    }

    console.log("save task model", model);
    var apiUrl = '';
    apiUrl = '/NewTask/CreateNewTask';

    this.rest.postParams(this.Global.getapiendpoint() + apiUrl, model).subscribe((data: any) => {
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New Task Created Successfully' });
        this.Cancel_form()
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record not saved' });
      }
    });

  }

  Cancel_form() {

    this.ShowDetails()
    this.getProjectActivity()
    this.getProjectName()
    this.GetProjectbyTask()
    this.showallData()

  }

  ShowDetails() {
    // get All data from newtask
    this.rest.getAll(this.Global.getapiendpoint() + '/NewTask/GetAllNewTask').subscribe((data: any) => {
      console.log(data.Data);
      // this.dataSource = new MatTableDataSource(data.Data);
      // //  console.log(this.dataSource);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

    })
  }


  getProjectActivity() {
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + 60).subscribe((data: any) => {
      this.ProjectActivities = data.Data;
    })
  }

  getProjectName() {
    var model = {
      userid: this.userId

    }
    console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetProject', model).subscribe((data: any) => {

      this.ProjectTypes = data.Data;
    })
  }

  GetTaskNameByProject(Project: any) {

    this.projectName = Project.projectname;
    console.log(this.projectName)
    this.selectedTaskProject = this.projectName
    this.projectId = Project.projectid
    console.log(this.projectId)

    var model = {
      projectid: this.projectId,
      userid: this.userId

    }
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTaskname', model).subscribe((data: any) => {

      if (data.Success) {
        this.Tasknames = data.Data;
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
      }
      else {
      }
    })
  }


  showallData() {
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTaskTypes').subscribe((data: any) => {
      this.tasktypes = data.Data;

    })
    this.rest.getAll(this.Global.getapiendpoint() + '/Project/GetAllProjectName').subscribe((data: any) => {
      this.projectnames = data.Data;
    })

    // this.rest.getAll(this.Global.getapiendpoint() + '/UserDetails/GetAllAssign').subscribe((data: any) => {
    // this.UserData = data.Data;
    // })


    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTasks').subscribe((data: any) => {
      this.tasks = data.Data;
    })
  }

}

