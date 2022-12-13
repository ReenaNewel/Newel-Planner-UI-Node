import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
// import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import { NgForm } from '@angular/forms';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import * as moment from 'moment';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { TaskAccordionComponent } from '../reuse-components/task-accordion/task-accordion.component';


interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  providers: [MessageService]
})
export class TimesheetComponent implements OnInit, AfterViewInit {

  taskDate: Date = new Date;
  selectedProject: any;
  selectedTask: any;
  selectedstatus: any
  selectedactivity: any
  selectedActivity: any;
  selectedhours: number = 0;
  selectedminutes: number;
  selectedDescription: any

  selectedTaskTypeName: any;
  selectedtaskstatus: any;
  selectedTaskAssignee: any
  selectedEfforts: any
  selectedEndate: any
  selectedStartDate: any
  selectedComment: any
  selectedTaskName: any
  selectedTaskProject: any




  hours: any[];
  minutes: any[];
  createTaskDialog: boolean;
  uploadedFiles: any[] = [];

  // TimeSheetForm !: FormGroup
  // ProjectForm !: FormGroup

  ProjectActivities: any[];
  Tasknames: any;
  userLoggedIn: any;
  ProjectNames: any[];
  ProjectTypes: any[];
  ProjectName: any
  TaskName: any
  msgs1: Message[];
  projectId: any;
  userRole: any;
  userId: any;
  userEmail: any;
  projectName: string;
  tasktypes: any;
  projectnames: any;
  UserData: any;
  tasks: any;
  AssigneeId: any;

  @ViewChild(TaskAccordionComponent) child: TaskAccordionComponent;
  getAssigneName: any;

  constructor(
    // private chartsData: DashboardChartsData,
    private router: Router,
    private rest: RestService,
    private Global: Global,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private ApiService: ApiserviceService,
    private fb: FormBuilder) {
  }



  //   {
  //     name: 'Yiorgos Avraamu',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'Us',
  //     usage: 50,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Mastercard',
  //     activity: '10 sec ago',
  //     avatar: './assets/img/avatars/1.jpg',
  //     status: 'success',
  //     color: 'success'
  //   },
  //   {
  //     name: 'Avram Tarasios',
  //     state: 'Recurring ',
  //     registered: 'Jan 1, 2021',
  //     country: 'Br',
  //     usage: 10,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Visa',
  //     activity: '5 minutes ago',
  //     avatar: './assets/img/avatars/2.jpg',
  //     status: 'danger',
  //     color: 'info'
  //   },
  //   {
  //     name: 'Quintin Ed',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'In',
  //     usage: 74,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Stripe',
  //     activity: '1 hour ago',
  //     avatar: './assets/img/avatars/3.jpg',
  //     status: 'warning',
  //     color: 'warning'
  //   },
  //   {
  //     name: 'Enéas Kwadwo',
  //     state: 'Sleep',
  //     registered: 'Jan 1, 2021',
  //     country: 'Fr',
  //     usage: 98,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Paypal',
  //     activity: 'Last month',
  //     avatar: './assets/img/avatars/4.jpg',
  //     status: 'secondary',
  //     color: 'danger'
  //   },
  //   {
  //     name: 'Agapetus Tadeáš',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'Es',
  //     usage: 22,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'ApplePay',
  //     activity: 'Last week',
  //     avatar: './assets/img/avatars/5.jpg',
  //     status: 'success',
  //     color: 'primary'
  //   },
  //   {
  //     name: 'Friderik Dávid',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'Pl',
  //     usage: 43,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Amex',
  //     activity: 'Yesterday',
  //     avatar: './assets/img/avatars/6.jpg',
  //     status: 'info',
  //     color: 'dark'
  //   }
  // ];
  // // public mainChart: IChartProps = {};
  // // public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngAfterViewInit() {
    // this.child.ShowDetails();
  }



  ngOnInit(): void {

    // this.ProjectNames = [{ projectname: 'Newel', projectid: 1 }]
    // this.Tasknames = [{ taskname: 'Assignment' }]
    // this.ProjectActivities = [{ name: 'coding' }]


    this.hours = ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    this.minutes = [15, 30, 45]
    // [...Array(60)].map((_, i) => i);
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userRole = this.userLoggedIn.defaultroleid;
    this.userId = this.userLoggedIn.id;
    this.userEmail = this.userLoggedIn.emailid;
    // this.showformdetails()
    // this.ShowAllformdetails();

    this.getProjectActivity()
    this.getProjectName()
    this.GetProjectbyTask()

    this.showallData()

  }

  getMinutesList() {
    // console.log("selectedhours", typeof (this.selectedhours));
    // console.log("selectedhours", this.selectedhours);

    if (this.selectedhours == 0) {
      this.minutes = [15, 30, 45]
    } else {      
      this.selectedminutes = 0;
      this.minutes = ['00', 15, 30, 45]
      // console.log("selectedminutes", this.selectedminutes );

    }
  }

  getHoursList() {

    // if (this.selectedminutes == 0) {
    //   this.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    // } else  {
    //   this.hours = ['00', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    // }
  }


  showCreateNewTaskDialog() {
    this.createTaskDialog = true;
  }

  createTaskClose() {
    this.taskDate = new Date;
    // console.log(" this.taskdate", this.taskDate);
    // this.selectedProject = '';
  }



  submit(isvalid: boolean) {
    // console.log('isvalid', isvalid)
    if (isvalid) {
      this.saveTimesheet()

    }

  }

  // ShowAllformdetails() {
  //   // console.log('form details')
  //   this.ProjectForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     taskname: [''],
  //     tasktype_name: [''],
  //     taskstatus: [''],
  //     assignee_name: [''],
  //     efforts: [''],
  //     startdate: [''],
  //     enddate: [''],
  //     // attachment: [''],
  //     comments: ['']

  //   })
  // }

  // initCharts(): void {
  //   this.mainChart = this.chartsData.mainChart;
  // }

  // setTrafficPeriod(value: string): void {
  //   this.trafficRadioGroup.setValue({ trafficRadio: value });
  //   this.chartsData.initMainChart(value);
  //   this.initCharts();
  // }
  showViaService() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }

  // showformdetails() {
  //   this.TimeSheetForm = this.fb.group({
  //     ProjectName: [''],
  //     TaskName: [''],
  //     TaskDesc: [''],
  //     Activity: [''],
  //     Active: [''],
  //     startDate: [''],
  //     TimeHr: [''],
  //     TimeMin: [''],
  //   })
  // }

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
    this.selectedTaskProject = this.projectName
    this.projectId = Project.projectid

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
  saveTimesheet() {

    this.createTaskDialog = false
    let model = {

      projectid: this.selectedProject.projectid,
      taskid: this.selectedTask.taskid,
      description: this.selectedDescription,
      timeinhours: this.selectedhours,
      timeinminutes: this.selectedminutes,
      date: moment(new Date(this.taskDate)).format('YYYY-MM-DD'),
      isactive: true,
      activityid: this.selectedactivity.typeid,
      created_date: moment().format('YYYY-MM-DD'),
      created_by: this.userId

    } 

    // console.log("save timesheet model", model);
    this.rest.create(this.Global.getapiendpoint() + "/timesheet/CreateTimesheet", model).subscribe((data: any) => {
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Timesheet Record added successfully' });
        this.child.ShowDetails();
        // this.selectedhours = 0;
        // this.selectedminutes = 0;
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not saved' });
      }
    });

  }

  tasksubmit(isvalid: boolean) {
    if (isvalid) {
      this.SubmitNewTask()
    }

  }
  showallData() {
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTaskTypes').subscribe((data: any) => {
      if (data.Success) {
        this.tasktypes = data.Data;
      }

    })
    this.rest.getAll(this.Global.getapiendpoint() + '/Project/GetAllProjectName').subscribe((data: any) => {
      if (data.Success) {
        this.projectnames = data.Data;
      }
    })

    // this.rest.getAll(this.Global.getapiendpoint() + '/UserDetails/GetAllAssign').subscribe((data: any) => {
    // this.UserData = data.Data;
    // })

    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTasks').subscribe((data: any) => {
      if (data.Success) {
        this.tasks = data.Data;
      }
    })
  }

  changeAssigneeId(value: any) {
    // console.log(value.id)
    this.AssigneeId = value.id
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
          // console.log('user',this.UserData)
        }
      })
    }
  }

  onUpload(event) {
    // console.log("event", event);
    // console.log("event.files", event.files);

    for (let file of event.files) {
      this.uploadedFiles.push(file);
      // console.log("uploadedFiles", this.uploadedFiles);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
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
      // console.log(data.Data);
      // this.dataSource = new MatTableDataSource(data.Data);
      // //  console.log(this.dataSource);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

    })
  }

  setdate(){
    this.taskDate = new Date
  }

  SubmitNewTask() {
    // console.log("selectedTaskAssignee",this.selectedTaskAssignee);
    var model = {
      projectid: this.selectedProject.projectid,
      taskname: this.selectedTaskName,
      tasktypeid: this.selectedTaskTypeName.typeid,
      status: this.selectedtaskstatus,
      created_by: this.userId,
      efforts: this.selectedEfforts,
      startdate: moment(this.selectedStartDate).format('YYYY-MM-DD'),
      enddate: moment(this.selectedEndate).format('YYYY-MM-DD'),
      // attachment: this.ProjectForm.controls['attachment'].value,
      comments: this.selectedComment,
      userid: this.getAssigneName
    }

    // console.log("save task model", model);
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

  GetAssigneeName(value: any) {
    this.getAssigneName = value;
    // console.log(`this.getAssigneName`, this.getAssigneName);

  }
}



