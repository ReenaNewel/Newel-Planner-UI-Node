import { Component, OnInit, ViewChild } from '@angular/core';
//import { PlannerDashboardComponent } from '../DashBoard/planner-dashboard/planner-dashboard.component';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';

//import { MatPaginator } from '@angular/material/paginator';
//import { MatSort } from '@angular/material/sort';
//import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import * as moment from 'moment';
import { count } from 'rxjs';

import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollPanelModule } from 'primeng/scrollpanel';


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
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  activeIndex1: number = 0;
  countries: any[];
  member: any[];
  selectedCountry: string;
  selectedMem: string;

 // @ViewChild(MatPaginator) paginator!: MatPaginator;

   //@ViewChild(MatSort) sort!: MatSort;

   ProjectForm !: FormGroup

   displayedColumns: string[] = [  'taskname','assignee_name','startdate' ];
  
        TaskName:any;
        AssigneeNmae:any;
        StartDtae:any;
        UserData: any;
        TaskData: any;
      
        item:any;
        taskstatus:any;
        projectnames: any;
        data: any;
        projectNmaes:any;
        completedTask: any;
        progressTask: any;
        notstartedTask: any;
        dataSource4: any;
        dataSource: any;
        allTask: any;
        

  constructor(private fb : FormBuilder ,private router: Router,  
    private rest :RestService , private Global : Global ,
    private ApiService: ApiserviceService
    
    ) { }

  ngOnInit(): void {
    this.ShowProjectNmaes();
    this.ShowAllfromDetails();
  }

  ShowAllfromDetails(){
    this.ProjectForm = this.fb.group({
      projectname :[''],
  })
}
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

ShowDetails(projectid:any){
   
  var model={
    p_userid:40,
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
            console.log('tasks',this.completedTask);
            console.log("this.compelete",this.completed.length);
            this.totalcompleted= this.completed.length;
             
  
  //for Inprogess
              
               this.totalProgess=0;
                this.inprogress = this.filterdata.filter(task => task.status === 2);
                this.progressTask = this.inprogress;
              //   this.dataSource2 = new MatTableDataSource(this.inprogress);
  
              //  //console.log("this.progess",this.inprogress.length);
              //    this. totalProgess= this.inprogress.length;
              //    this.dataSource2.paginator = this.paginator;
              //      this.dataSource2.sort = this.sort;
  
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
  }

ShowProjectNmaes()
{
  var model={
    p_userid:40
  }
  this.rest.postParams(this.Global.getapiendpoint() + '/NewTask/GetProjectNameByuser',model).subscribe((data: any) => {
    console.log('projectNames',data.Data);
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




}
