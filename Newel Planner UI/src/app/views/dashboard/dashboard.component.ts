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
  showSaveBtn:boolean
  ProjectForm !: FormGroup
  NewTaskDialog:boolean

   displayedColumns: string[] = [  'taskname','assignee_name','enddate' ];
   TaskName:any;
   AssigneeNmae:any;
   StartDtae:any;
   UserData: any;
   TaskData: any;
   item:any;
   taskstatus:any;
    projectnames: any;
    data: any;
    ProjectStates:any
    projectNmaes:any;
    completedTask: any;
    progressTask: any;
    notstartedTask: any;
    dataSource4: any;
    dataSource: any;
    allTask: any;
    element:any
filterdata:any;
completed: any;
inprogress: any;
notstarted:any;
total:any;
totalcount:any;
totalcompleted:any;
totalProgess:any;
totalNotstarted:any;
totalTask:any;
TotalData:any;
  PrjStatus_id: any;
  colId: any;
  editTaskid: any;
    


  constructor(
    private fb: FormBuilder, private router: Router,
    private rest :RestService , private Global : Global ,
    private ApiService: ApiserviceService,
    private messageService: MessageService,
    ) 
    { }


  ngOnInit(): void {

    this.ShowProjectNmaes();
    this.ShowAllformDetails();

    this.member = [
      {name: 'Only Me', code: 'AU'},
      {name: 'Team', code: 'BR'}
    ]
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
  ];
  
  }

  ShowAllformDetails(){

    this.ProjectForm = this.fb.group({
      projectname :[''],
      pname :[''],
      taskname:[''],
      efforts:[''],
      startDate:[''],
      endDate:[''],
      Comments:[''],
      taskType:[''],
      taskStatus:[''],
      assigneeName:[''],
      PrjStatus:['']

  })

}
  
GetAllProjectStatus(value: any) {
  this.PrjStatus_id = value
  console.log("project",this.PrjStatus_id);

 

}

ShowDetails(projectid:any){
   
  var model={
    p_userid:3,
    p_projectid:projectid
  }
  console.log('showdetails',model)

          this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetTaskDetailsByuser',model).subscribe((data: any) => {
           
             this.filterdata = data.Data;
             console.log("total acount",data.Data);
             console.log("this.compelete",this.completed);
        
             
          // for Completed
            this.totalcompleted=0;
            this.completed = this.filterdata.filter(task => task.status === 1);
        
            this.completedTask=this.completed;
            //console.log('tasks',this.completedTask);
            //console.log("this.compelete",this.completed.length);
            this.totalcompleted= this.completed.length;
             
  
  //for Inprogess
              
               this.totalProgess=0;
                this.inprogress = this.filterdata.filter(task => task.status === 2);
                this.progressTask = this.inprogress;
              
  
  //for Not started
               this.totalNotstarted=0;
  
               this.notstarted = this.filterdata.filter(task => task.status === 3);
               this.notstartedTask = this.notstarted;
  
      //for total
    
       this.totalTask=0;
       this.allTask = this.data;
       this.TotalData = this.filterdata;
       this.allTask = this.TotalData;
       this. totalTask= this.allTask.length;
    })
    // ashlesha
    var id = 45
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + id).subscribe((data: any) => {
        if (data.Success) {
          this.ProjectStates = data.Data
          // console.log('projectNames',this.ProjectStates);
        }
      })

  }

ShowProjectNmaes()
{
  var model={
    p_userid:3
  }
  this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetProjectNameByuser',model).subscribe((data: any) => {
    // console.log('projectNames',data.Data);
    this.projectnames=data.Data;
   })
}

applyFilter(event: Event) {

  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

}
  

submit(){
if(!this.ProjectForm.valid){
    return
  }
}

leaveuser()
{
console.warn(this.ProjectForm.value)
}

UpdateTask(){
  var model ={
    userid:this.colId,
    statusid:this.PrjStatus_id,
    taskid:this.editTaskid,

}

  console.log("UpdateTask model",model)
  this.rest.postParams(this.Global.getapiendpoint() +'/NewTask/UpdateStatusTaskDetails',model).subscribe((data: any) => {
    console.log('data',data.Data)
    if (data.Success) {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Task details updated successfully' });
      this.Cancel_form()
    }
    else{
      this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
    }
  })
}
Cancel_form() {
  this.NewTaskDialog=false;
}

EditTaskDetails(row: any) {

  console.log('project rows :',row)

  this.NewTaskDialog = true;

  this.showSaveBtn = false;

  this.colId = row.id;

  this.editTaskid = row.taskid;

  this.ProjectForm = this.fb.group({

  pname :[row.projectid],

  taskType:[row.tasktypeid],

  taskname:[row.taskname],

  efforts:[row.efforts],

  endDate:[(new Date (row.enddate))],

  startDate:[(new Date(moment (row.startdate).format('YYYY-MM-DD')))],

  Comments:[row.comments],

  taskStatus:[row.taskstatus],

  //PrjStatus: [row.projectstatusid],

  assigneeName:[row.assignee_id]

})

}

}
