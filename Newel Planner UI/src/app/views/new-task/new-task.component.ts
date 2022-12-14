import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

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
  taskStatusName:any[];
  projectnames1: any;
  Tasknames: any;
  projectId: any;
  projectName: string;
  NewTaskDialog:boolean;
  showSaveBtn:boolean;
  flag: any;
  getAssigneName: any;
  colunqId: any;
  dateflag: boolean;

  constructor(
    private rest: RestService,
    private Global: Global,
    private messageService: MessageService,
    private fb : FormBuilder,
  
  ) { }
  userLoggedIn: any;
  userid:any
  ProjectForm !: FormGroup
  // displayedColumns: string[] = ['Id','name', 'taskname','tasktype_name', 'assigneename','efforts','startdate',
  // 'enddate','attachment','comments','Actions'];


SelectedProjectNames: any[];
  ngOnInit(): void {

    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userId = this.userLoggedIn.id;
    this.showallData();
    this.ShowDetails();
    this.getProjectName();
    this.GetProjectbyTask();
    // this.getUserByProjectId();
    // console.log("hiii",this.selectedTaskProject);
    this.flag = 0;
    
    // this.selectedTaskProject ;
   
  }

  tasksubmit(isvalid: boolean) {
    if (isvalid) {
      // console.log('task isvalid', isvalid)
      // this.SubmitNewTask()
    }

  }
  Assignprojectid:any
  getUserByProjectId(prjID:any) {
  //  this.Assignprojectid =this.selectedProject;
  //   console.log("selectedProject",this.selectedProject);
    
    if (prjID) {
      var model = {
        projectid: prjID
      }
      // console.log('project id', model)
      this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetAllUsersByProjectID', model).subscribe((data: any) => {
      //  console.log("...........",data);
       
        if (data.Success) {
          this.UserData = data.Data;
          // console.log("UserData",this.UserData);
          
        }
      })
    }
  }

  changeAssigneeId(value: any) {
    // console.log(value.id)
    this.AssigneeId = value.id
  }

  showCreateNewTaskDialog(){
    this.flag=0
    this.NewTaskDialog = true;
    this.showSaveBtn = true;
  }

  SubmitNewTask(valid:boolean) {
    console.log('validform',valid)
    if(valid){
      this.flag = 0;
      var model = {
        projectid: this.selectedProject,
        taskname: this.selectedTaskName,
        tasktypeid: this.selectedTaskTypeName,
        status: this.selectedtaskstatus,
        created_by: this.userId,
        efforts: this.selectedEfforts,
        startdate: moment(this.selectedStartDate).format('YYYY-MM-DD'),
        enddate: moment(this.selectedEndate).format('YYYY-MM-DD'),
        // attachment: this.ProjectForm.controls['attachment'].value,
        comments: this.selectedComment,
        userid: this.getAssigneName
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
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Record not saved' });
          }
        });
    }
   
  }

  Cancel_form() {

    this.ShowDetails()
    this.getProjectActivity()
    this.getProjectName()
    this.GetProjectbyTask()
    this.showallData()
    this.NewTaskDialog=false;
    this.flag=0
    
  }
  colId:any;
  EditTaskid:any;
  editTaskStatus:any;
  EditTaskDetails(row: any) {
    this.flag = 1

    console.log('project rows :', row)
    this.getUserByProjectId(row.projectid)


    this.NewTaskDialog = true;
    this.showSaveBtn = false;
   
    this.selectedProject = row.projectid;
    this.selectedTaskName = row.taskname;
    this.selectedTaskTypeName = row.tasktypeid;
    this.selectedtaskstatus = row.status;
    this.editTaskStatus =this.selectedtaskstatus;
    this.selectedTaskAssignee = row.assignee_name_id;
    this.selectedEfforts = Math.round(row.efforts);
    this.selectedStartDate =new Date(row.startdate);
    this.selectedEndate = new Date(row.enddate);
    this.selectedComment = row.comments;
    this.colId = row.id;
    this.colunqId = row.unqid;
    this.EditTaskid = row.taskid;


  }
  getTaskStatusid:any
GetTaskStatus(value:any){
this.getTaskStatusid=value;
console.log("getTaskStatusid",this.getTaskStatusid);

  }

UpdateTask(isvalid: boolean){
    // console.log('form valid',isvalid)
    // // console.log("taskStatusName",this.taskStatusName);
    // console.log("stateall",this.getTaskStatusid);
    // console.log("this.selectedtaskstatus",this.editTaskStatus);
  if(isvalid){
        if (this.editTaskStatus != this.getTaskStatusid) {
        
          var modeltask ={
            taskId:this.EditTaskid,
            statusId: this.getTaskStatusid ,
            created_by:this.userId,
            unqid:  this.colunqId
            }
        
          console.log("UpdateTask model",modeltask)
          this.rest.postParams(this.Global.getapiendpoint() +'/NewTask/UpdateStatusTaskDetails',modeltask).subscribe((data: any) => {
            console.log('data',data.Data)
           
          
          })
          this.selectedtaskstatus=this.getTaskStatusid ;
        }

        // console.log('this.selectedtaskstatus',this.selectedtaskstatus)
        var model ={
          id :  this.colId,
          unqid: this.colunqId,
          projectid:this.selectedProject,
          taskname:  this.selectedTaskName,
          tasktypeid:this.selectedTaskTypeName,
          created_by:this.userId,
          efforts: this.selectedEfforts,
          startdate: this.selectedStartDate,
          enddate: this.selectedEndate,
          comments: this.selectedComment,
          status:this.selectedtaskstatus,
          userid:this.selectedTaskAssignee,
        
        }
        console.log("After if codition UpdateTask model",model)
      
          this.rest.postParams(this.Global.getapiendpoint() +'/NewTask/UpdateTask',model).subscribe((data: any) => {
            if (data.Success) {
              this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Task details updated successfully' });
              this.Cancel_form()
            }
            else{
              this.messageService.add({ severity: 'warn', summary: 'warning', detail: 'Record not updated..!!' });
            }
        
          }) 
 
    }   
  }


  projectid:any;
  GetAllProjectName(value: any) {
    this.projectid = value
  }
  createdbyId:any;
  ShowDetails() {
    this.createdbyId=this.userId
    var model = {
      Createdby: this.createdbyId
    }
    console.log(model);
    
    this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetAllNewTask', model).subscribe((data: any) => {
      console.log("GetAllNewTask",data.Data);
     
      if (data.Success) {
        this.SelectedProjectNames = data.Data
      }
      // console.log('project data', this.SelectedProjectNames)

    })
  }
  CheckDate(){
    this.dateflag = true
    // console.log('start date ,end date ',this.selectedStartDate,this.selectedEndate)
        if(this.selectedStartDate || this.selectedEndate){
          if (this.selectedStartDate > this.selectedEndate){
            this.dateflag = false
            this.messageService.add({ severity: 'warn', summary: 'Alert', detail: 'Please Select Correct Date Range' });
            
          //  return
          }
        }
         
      }

  getProjectActivity() {
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + 60).subscribe((data: any) => {
      if(data.Success){
        this.ProjectActivities = data.Data;
      }
    })
  }

  getProjectName() {
    var model = {
      userid: this.userId

    }
    // console.log(`model`, model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetProject', model).subscribe((data: any) => {
      if(data.Success){
      this.ProjectTypes = data.Data;
      }
    })
  }

  GetTaskNameByProject(Project: any) {
  // console.log("Project",Project);

    this.projectName = Project.projectname;
    // console.log(this.projectName)
    this.selectedTaskProject = this.projectName
    this.projectId = Project.projectid
    // console.log(this.projectId)

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
    // console.log("model",model);
    this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTaskname', model).subscribe((data: any) => {

      if (data.Success) {
        this.ProjectNames = data.Data;
        // console.log(this.ProjectNames)
      }
      else {
      }
    })
  }

  showallData() {
    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTaskTypes').subscribe((data: any) => {
      if(data.Success){
        this.tasktypes = data.Data;
      }

    })
    this.rest.getAll(this.Global.getapiendpoint() + '/Project/GetAllProjectName').subscribe((data: any) => {
      if(data.Success){
        this.projectnames1 = data.Data;
      }
    })

    // this.rest.getAll(this.Global.getapiendpoint() + '/UserDetails/GetAllAssign').subscribe((data: any) => {
    // this.UserData = data.Data;
    // })


    this.rest.getAll(this.Global.getapiendpoint() + '/General/getAllTasks').subscribe((data: any) => {
      if(data.Success){
        
        this.tasks = data.Data;
        console.log("Dropdown value",this.tasks);
        
        this.taskStatusName= this.tasks;
      }
    })
  }

  GetAssigneeName(value: any) {
    this.getAssigneName = value;
    // console.log(`this.getAssigneName`, this.getAssigneName);

  }
}

