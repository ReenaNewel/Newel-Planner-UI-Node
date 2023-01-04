import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';



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
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers: [MessageService],

})
export class DashboardComponent implements OnInit {

  activeIndex1: number = 0;
  countries: any[];
  member: any[];

  selectedCountry: string;
  selectedMem: string;
  showSaveBtn: boolean;
  ProjectForm !: FormGroup;
  SummaryForm !: FormGroup;
  NewTaskDialog: boolean;

  displayedColumns: string[] = ['taskname', 'assignee_name', 'enddate'];
  TaskName: any;
  AssigneeNmae: any;
  StartDtae: any;
  UserData: any;
  TaskData: any;
  item: any;
  taskstatus: any;
  projectnames: any;
  data: any;
  ProjectStates: any
  projectNmaes: any;
  completedTask: any;
  progressTask: any;
  notstartedTask: any;
  dataSource4: any;
  dataSource: any;
  allTask: any;
  element: any
  filterdata: any;
  completed: any;
  inprogress: any;
  notstarted: any;
  total: any;
  totalcount: any;
  totalcompleted: any;
  totalProgess: any;
  totalNotstarted: any;
  totalTask: any;
  TotalData: any;
  PrjStatus_id: any;
  colId: any;
  editTaskid: any;
  userLoggedIn: any;
  userid: any;
  ProjectNameslist: any;
  ProjectTaskStatusSummary: any;
  EditTaskid: any;
  userId: any;
  EditUnqID: any;
  editcreated_by: any;
  userRole: any;
  userEmail: any;
  projectid: any;
  timespanid: number;
  LastYear: any;
  CurrentYear: any;
  p_data: number;
  Last_Month: any;
  Current_Month: any;
  Last_Week: any;
  Current_Week: any;
  Yesterday: any;
  Today: any;
  OnlymeOrTeams: number;
  TimeSpanData: any;
  TimesheetForm:FormGroup;


  constructor(
    private fb: FormBuilder, private router: Router,
    private rest: RestService, private Global: Global,
    private ApiService: ApiserviceService,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.userRole = this.userLoggedIn.defaultroleid;
    this.userId = this.userLoggedIn.id;
    this.userEmail = this.userLoggedIn.emailid;
    

    this.ShowProjectNmaes();
    this.ShowAllformDetails();
    this.ShowProjectNamesList();
    this.member = [

      { name: 'Only Me', value: 1 },
      // { name: 'Team', value: 2 }

    ]

    this.GetAllTimeSpan();
    this.ShowTaskSummary_Month();
    console.log("Member", this.member);
    this.p_data = this.member[0].value;
    // this.countries = [
    //   { name: 'Australia', code: 'AU' },
    //   { name: 'Brazil', code: 'BR' },
    //   { name: 'China', code: 'CN' },
    //   { name: 'Egypt', code: 'EG' },
    //   { name: 'France', code: 'FR' },
    //   { name: 'Germany', code: 'DE' },
    //   { name: 'India', code: 'IN' },
    //   { name: 'Japan', code: 'JP' },
    //   { name: 'Spain', code: 'ES' },
    //   { name: 'United States', code: 'US' }
    // ];

  }

  ShowAllformDetails() {

    this.ProjectForm = this.fb.group({
      projectname: [''],
      pname: [''],
      taskname: [''],
      efforts: [''],
      startDate: [''],
      endDate: [''],
      Comments: [''],
      taskType: [''],
      taskStatus: [''],
      assigneeName: [''],
      PrjStatus: ['']

    })

    this.SummaryForm = this.fb.group({
      SummaryDropdown: [''],
      ProjectName: ['']
    })
    this.TimesheetForm = this.fb.group({

      Timespan: [''],

      teamselectiondropdown: ['', [Validators.required, Validators.min(1)]]

    })
  }

  GetAllProjectStatus(value: any) {
    this.PrjStatus_id = value
    // console.log("project", this.PrjStatus_id);



  }
OverdueTaskData: any;
UpcomingdeadlinesData: any;

  ShowSummary(events: any) {
    // console.log("Events....", events);


    var model = {
          userid: this.userid,
          member: events
        }
        // console.log("Model", model);
        this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetOverdueTaskData', model).subscribe((data: any) => {
          this.OverdueTaskData = data.Data;


          // console.log("OVerdue Details", this.OverdueTaskData);
        });

        this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetUpcomingdeadlines', model).subscribe((data: any) => {
          this.UpcomingdeadlinesData = data.Data;

          // console.log("UpcomingdeadlinesData Details", this.UpcomingdeadlinesData);
        });
        
  }


  

  ShowProjectNamesList() {
    var model = {
          userid: this.userid,
        }
        // console.log("Model", model);
        this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetProjectNames', model).subscribe((data: any) => {
          this.ProjectNameslist = data.Data;

          // console.log("Project Names Details List", this.ProjectNameslist);
        }); 
  }

  ShowProjectTaskSummary(event:any){
    var model = {
      projectid: event,
    }
    // console.log("Model", model);
        this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetProjectTaskStatusSummary', model).subscribe((data: any) => {
          this.ProjectTaskStatusSummary = data.Data;

          // console.log("Project Names Details List", this.ProjectTaskStatusSummary);
        }); 
  }
  // ShowDetails(projectid: any) {

  //   var model = {
  //     p_userid: this.userid,
  //     p_projectid: projectid
  //   }
  //   console.log('showdetails', model)

  //   this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTaskDetailsByuser', model).subscribe((data: any) => {

  //     this.filterdata = data.Data;
  //     // console.log("total acount", data.Data);
  //     // console.log("this.compelete", this.completed);


  //     // for Completed
  //     this.totalcompleted = 0;
  //     this.completed = this.filterdata.filter(task => task.status === 1);

  //     this.completedTask = this.completed;
  //     //console.log('tasks',this.completedTask);
  //     //console.log("this.compelete",this.completed.length);
  //     this.totalcompleted = this.completed.length;


  //     //for Inprogess

  //     this.totalProgess = 0;
  //     this.inprogress = this.filterdata.filter(task => task.status === 2);
  //     this.progressTask = this.inprogress;


  //     //for Not started
  //     this.totalNotstarted = 0;

  //     this.notstarted = this.filterdata.filter(task => task.status === 3);
  //     this.notstartedTask = this.notstarted;

  //     //for total

  //     this.totalTask = 0;
  //     this.allTask = this.data;
  //     this.TotalData = this.filterdata;
  //     this.allTask = this.TotalData;
  //     this.totalTask = this.allTask.length;
  //   })
  //   // ashlesha
  //   var id = 45
  //   this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + id).subscribe((data: any) => {
  //     if (data.Success) {
  //       this.ProjectStates = data.Data
  //       // console.log('projectNames',this.ProjectStates);
  //     }
  //   })

  // }
  ShowDetails(projectid:any){
    this.projectid = projectid
   
    var model={
      p_userid:this.userId,
      p_projectid:projectid
    }
    // console.log('showdetails',model)
  
            this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTaskDetailsByuser',model).subscribe((data: any) => {
             
               this.filterdata = data.Data;
            //  console.log("total acount",data.Data);
              //  console.log("this.compelete",this.completed);
          
               
            // for Completed
              this.totalcompleted=0;
              this.completed = this.filterdata.filter(task => task.status === 3);
          
              this.completedTask=this.completed;
              // console.log('tasks',this.completedTask);
              //console.log("this.compelete",this.completed.length);
              this.totalcompleted= this.completed.length;
               
    
    //for Inprogess
                
                 this.totalProgess=0;
                  this.inprogress = this.filterdata.filter(task => task.status === 2);
                  this.progressTask = this.inprogress;
                  this.totalProgess =  this.progressTask.length;
                  // console.log("this.progressTask",this.progressTask);
                  
                
    
    //for Not started
                 this.totalNotstarted=0;
    
                 this.notstarted = this.filterdata.filter(task => task.status === 1);
                 this.notstartedTask = this.notstarted;
                 this.totalNotstarted = this.notstarted.length;
                //  console.log("this.notstartedTask",this.notstartedTask);
        //for total
      
         this.totalTask=0;
         this.allTask = this.data;
         this.TotalData = this.filterdata;
         this.allTask = this.TotalData;
         this. totalTask= this.allTask.length;
      })
      // ashlesha
      var id = 102
      this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + id).subscribe((data: any) => {
          if (data.Success) {
            this.ProjectStates = data.Data
            //  console.log('projectNames',this.ProjectStates);
          }
        })
  
    }

  ShowProjectNmaes() {
    var model = {
      p_userid: this.userid
    }
    this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetProjectNameByuser', model).subscribe((data: any) => {
      // console.log('projectNames',data.Data);
      this.projectnames = data.Data;
    })
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  submit() {
    if (!this.ProjectForm.valid) {
      return
    }
  }

  leaveuser() {
    console.warn(this.ProjectForm.value)
  }
 
  UpdateTask() {
    var model ={
      taskId:this.EditTaskid,
      statusId:this.PrjStatus_id ,
      created_by:this.userid,
      unqid: this.EditUnqID
  }

    // console.log("UpdateTask model", model)
    this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/UpdateStatusTaskDetails', model).subscribe((data: any) => {
      // console.log('data', data.Data)
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Task details updated successfully' });
        this.Cancel_form()
        this.ShowDetails(this.projectid)
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
      }
    })
  }
  Cancel_form() {
    this.NewTaskDialog = false;
  }

  // EditTaskDetails(row: any) {

  //   // console.log('project rows :', row)
  //   this.NewTaskDialog = true;
  //   this.showSaveBtn = false;
  //   this.colId = row.id;
  //   this.editTaskid = row.taskid;
  //   this.ProjectForm = this.fb.group({
  //     pname: [row.projectid],
  //     taskType: [row.tasktypeid],
  //     taskname: [row.taskname],
  //     efforts: [row.efforts],
  //     endDate: [(new Date(row.enddate))],
  //     startDate: [(new Date(moment(row.startdate).format('YYYY-MM-DD')))],
  //     Comments: [row.comments],
  //     taskStatus: [row.taskstatus],
  //     PrjStatus: [row.projectstatusid],
  //     assigneeName: [row.assignee_id]
  //   })
  //   this.EditUnqID=  taskDetails.unqid;
  //   this.EditTaskid = taskDetails.taskid;
  // }
  editprojectName:any
EditTaskDetails(taskDetails) {
 
  // console.log('taskDetails  :',taskDetails)
  this.NewTaskDialog = true;
  this.showSaveBtn = false;
  this.colId = taskDetails.id;
  // console.log("this.colId",this.colId);
  
 
 this.editcreated_by =taskDetails.created_by;
// komal
this.editprojectName= taskDetails.projectid;
// console.log("taskDetails.enddate",taskDetails.enddate);

  this.ProjectForm = this.fb.group({
  pname :[this.editprojectName],
  taskType:[taskDetails.tasktypeid],
  taskname:[taskDetails.taskname],
  efforts:[Math.round(taskDetails.efforts)],
  // endDate:[taskDetails.enddate],
  endDate:[moment(taskDetails.enddate).format('MM/DD/YYYY')],
  // startDate:[taskDetails.startdate],
  startDate:[moment(taskDetails.startdate).format('MM/DD/YYYY')],
  Comments:[taskDetails.comments],
  taskStatus:[taskDetails.taskstatus],
  PrjStatus: [],
  assigneeName:[taskDetails.assignee_id]

})

this.EditUnqID=taskDetails.unqid;
this.EditTaskid = taskDetails.taskid;
}

  ExporttoExcelReport() {
    if(this.OverdueTaskData){
    
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.OverdueTaskData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });
            this.saveAsExcelFile(excelBuffer, "Overdue Task Report ");
        });
    }
    else{

    }
  }

ExportUpcommingdeadlineReport(){
 if(this.UpcomingdeadlinesData){
    
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet( this.UpcomingdeadlinesData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "Upcoming TAsk Deadline Report");
  });
 }
}

ExportTaskSummaryReport(){
  if(this.ProjectTaskStatusSummary) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.ProjectTaskStatusSummary);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer: any = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });
        this.saveAsExcelFile(excelBuffer, "ProjectWise Task Summary Report");
    });
}
}
saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

  
  // ShowTaskSummaryoverdue() {
  //   var model = {
  //     p_userid: 3
  //   }
  //   this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetProjectNameByuser', model).subscribe((data: any) => {
  //     // console.log('projectNames',data.Data);
  //     this.projectnames = data.Data;
  //   })
  // }

  //Bhushan  GetTasksheetTimeSpan

  GetAllTimeSpan() {
    this.rest.getAll(this.Global.getapiendpoint() + '/NewTask/GetTasksheetTimeSpan').subscribe((data: any) => {
      if (data.Success) {

        this.TimeSpanData = data.Data;
        console.log("TimeSpan Details", data);


      }
    })
  }

  ShowTimespan(events: any) {
    console.log("Events....", events);

    this.timespanid = events;
    console.log("Timespan ID", this.timespanid);

    this.ShowTaskSummary_Month();
  }

  OnlymeOrTeam(event) {
    this.p_data = event;

    console.log("Team or Me", this.OnlymeOrTeams)
  }

  month: any;
  December: any
  November: any;

  ShowTaskSummary_Month() {


    var model = {
      userid: this.userid,
      p_type: this.p_data
    }
    console.log("Model", model);

    if (this.p_data == 1 && this.timespanid == 1 || this.OnlymeOrTeams == 2 && this.timespanid == 1) {
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_Today', model).subscribe((data: any) => {

        this.Today = data.Data;
        console.log("Today", this.Today);
      })
    }

    if (this.p_data == 1 && this.timespanid == 2 || this.p_data == 2 && this.timespanid == 2) {
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_Yesterday', model).subscribe((data: any) => {

        this.Yesterday = data.Data;
        console.log("Yesterday", this.Yesterday);
      })
    }

    if (this.p_data == 1 && this.timespanid == 3 || this.p_data == 2 && this.timespanid == 3) {
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_CurrentWeek', model).subscribe((data: any) => {

        this.Current_Week = data.Data;
        console.log("Current_Week", this.Current_Week);
      })
    }

    if (this.p_data == 1 && this.timespanid == 4 || this.p_data == 2 && this.timespanid == 4) {
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_LastWeek', model).subscribe((data: any) => {

        this.Last_Week = data.Data;
        console.log("Last_Week", this.Last_Week);
      })
    }


    if (this.p_data == 1 && this.timespanid == 5 || this.p_data == 2 && this.timespanid == 5) {
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_CurrentMonth', model).subscribe((data: any) => {

        this.Current_Month = data.Data;
        console.log("Current_Month", this.Current_Month);
      })
    }

    if (this.p_data == 1 && this.timespanid == 6 || this.p_data == 2 && this.timespanid == 6) {

      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_LastMonth', model).subscribe((data: any) => {

        this.Last_Month = data.Data;
        console.log("Last Month", this.Last_Month);
      })
    }

    if (this.p_data == 1 && this.timespanid == 7 || this.p_data == 2 && this.timespanid == 7) {
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_CurrentYear', model).subscribe((data: any) => {


        this.CurrentYear = data.Data;
        console.log("Current Year ", this.CurrentYear);
      })


    }

    if (this.p_data == 1 && this.timespanid == 8 || this.p_data == 2 && this.timespanid == 8) {
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTimesheetSummary_LastYear', model).subscribe((data: any) => {


        this.LastYear = data.Data;
        console.log("LAst Year ", this.LastYear);
      })


    }

    
  }
}
