import { Component, OnInit, ViewChild } from '@angular/core';
//import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, Validators, NgForm } from '@angular/forms';
import { animationFrameScheduler } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import * as moment from 'moment';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css'],
  providers: [MessageService]
})
export class UsermasterComponent implements OnInit {

  ProjectForm !: FormGroup

  dataSource: any;
  readData: any;
  us: any;
  errormes: any;
  getparamid: any;
  successmes: any;
  UserData: any

  

  serchKey: string | undefined;

  displayedColumns1 = ['uname',  'emailid', 'defaultroleid', 'isactive', 'Action'];
  private datasource: any;
  userLoggedIn: any;
  userid: any;
  service: any;
  AllUserData: any;
  projectDialog: boolean;
  showSaveBtn: boolean;
  UserRole: any;

  constructor(private fb: FormBuilder, private router: Router,
    private rest: RestService, private Global: Global,
    //private ApiService: ApiserviceService,
    private messageService: MessageService,
    ) { }

  IsCreate: boolean = true;
  isViewList: boolean = false;
  IsEditable: boolean = true;

  ngOnInit(): void {

    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.IsCreate = false;
    this.isViewList = false;
    this.IsEditable = true

    
    this.showDetails()
    this.DropDownRole()
    this.showFormDetails()

}

  showDetails() {

     // console.log(this.Global.getapiendpoint() + '/api/Project/GetAllProjects')
     this.rest.getAll(this.Global.getapiendpoint() + '/users').subscribe((data: any) => {
      //  console.log('usersData',this.Global.getapiendpoint() + '/users');
       
      if (data.Success) {
        this.AllUserData = data.Data
        console.log('alluers', this.AllUserData);
      }
    })
  }

  
  showFormDetails() {
    this.ProjectForm = this.fb.group({

      first_name:[''],
      last_name:[''],
      emailid: [''],
      name: [''],
      password: [''],
      defaultroleid: [],
      isactive: [false],
    })
  }

  getGroupId=[];
  DropDownRole()
  {

    this.rest.getAll(this.Global.getapiendpoint() + '/usersByRole').subscribe((data: any) => {
      //  console.log('Roles',this.Global.getapiendpoint() + '/usersByRole')

      if (data.Success) {
        this.UserRole = data.Data
        console.log('UserRoles',this.UserRole);
      }

    })
    
  }

  EditEmployee(row: any) {
    console.log('row values', row);

    this.projectDialog = true;
    this.showSaveBtn = false;

    this.IsCreate = false;
    this.isViewList = false;
    this.IsEditable = true

    this.getparamid = row.id;
    
    this.ProjectForm = this.fb.group({
      first_name:[row.first_name],
      last_name:[row.last_name],
      emailid: [row.emailid],
      name: [row.username],
      password: [row.password],
      defaultroleid: [row.defaultroleid],
      isactive : [row.isactive='true']
     

    })
  }
  editing:boolean
  showCreateNewProjectDialog() {
    this.projectDialog = true;
    this.showSaveBtn = true;
  }

  changeemployeeid(value: any) {
    console.log('empid =', value);
  }

  

  OnBack() {
    this.IsCreate = false;

    this.isViewList = true;
    this.IsEditable = false;
    this.showDetails()

  }

  AddForm() {

    console.log('AddFrom');
    this.isViewList = false;
    this.IsCreate = true;
    console.log(this.IsCreate);
    this.ProjectForm.reset();
  }
  Cancel_form() {
    // this.IsCreate = false
    // this.isViewList = true
    // this.IsEditable = false
    this.ProjectForm.reset();
    this.showDetails()
  }
  submit() {

    this.projectDialog = false

    if (!this.ProjectForm.valid) {
      return
    }
  }
// for carete new data
  submitUserDetails() {
    var model = {
      first_name: this.ProjectForm.controls['first_name'].value,
      last_name: this.ProjectForm.controls['last_name'].value,
      emailid: this.ProjectForm.controls['emailid'].value,
      name: this.ProjectForm.controls['name'].value,
      password: this.ProjectForm.controls['password'].value,
      defaultroleid: this.ProjectForm.controls['defaultroleid'].value,
      isactive: this.ProjectForm.controls['isactive'].value,
      created_date: moment(new Date()).format('YYYY-MM-DD'),
      created_by: this.userid

    }
    this.projectDialog = false;

    this.rest.postParams(this.Global.getapiendpoint() + '/users',model).subscribe((data: any) => {
    
          console.log('create Data',this.Global.getapiendpoint() + '/users',model)
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'New User added successfully' });
        this.Cancel_form()
        //console.log('create',data);
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not saved' });
      }
    })
  }

  Cancel() {
    // this.router.navigate(['Planner/PlannerDashboard'])
  }

   model: any;

  UpdateUser() {
    var model = {
      id: this.getparamid,
      first_name: this.ProjectForm.value.first_name,
       last_name: this.ProjectForm.value.last_name,
       emailid: this.ProjectForm.value.emailid,
       name: this.ProjectForm.value.name,
       password: this.ProjectForm.value.password,
       defaultroleid: this.ProjectForm.value.defaultroleid,
       isactive: this.ProjectForm.value.isactive,
      modified_date: moment(new Date()).format('YYYY-MM-DD'),
       modified_by: this.userid,
     
    }
    console.log('update data :', model)

    // console.log(this.ProjectForm.value, 'updatedform');
    //if (this.ProjectForm.valid) {

      this.rest.postParams(this.Global.getapiendpoint() + '/updateusers', model).subscribe((data: any) => {
         console.log('update',this.Global.getapiendpoint() + '/updateusers')
        if (data.Success) {
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'User Record updated successfully' });
          this.Cancel_form()
        }
        else{
          this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
        }
       
  
      })
//}
}

  GetAllRoles() {

  }

  GetAllProjectType() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  
}

