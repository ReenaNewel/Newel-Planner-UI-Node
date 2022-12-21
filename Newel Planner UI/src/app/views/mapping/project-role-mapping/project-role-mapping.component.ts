import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-role-mapping',
  templateUrl: './project-role-mapping.component.html',
  styleUrls: ['./project-role-mapping.component.scss'],
  providers: [MessageService],
})
export class ProjectRoleMappingComponent implements OnInit {
  ProjectRoleMappingForm!: FormGroup;
  ProjectRoleDialog: boolean;
  showSaveBtn: boolean;
  userLoggedIn: any;
  userRole: any;
  userid: any;
  userId: any;
  selectedRoleName: any;
  selectedUserName: any;
  roledata: any;
  selected3: any;
  roleid: any;
  roleidname: any;
  projectDetails: any;
  SelectedProjectNames: any;
  SelectedProject: any;
  username: any;
  oldroleid: any;
  userDetails: any;
  getuserid: any;
  selectedUserid: any;
  RoleDetails: any;
  projectid: any;

  usernameDropdown:boolean
  editflag: any;
  selectedusername: any;

  constructor(
    private rest: RestService,
    private Global: Global,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
   
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.ShowDetails();
    // this.getUserDetails();
    this.GetAllRoleDetails();
    this.showformdetails();
    this.editflag=0;
    this.flag = 0;
   
  }

  ShowProjectRoleDialogBox() {
    this.editflag=0
    this.ProjectRoleDialog = true;
    this.showSaveBtn = true;
    this.ProjectRoleMappingForm.reset();
    this.usernameDropdown =false
  }

 
  GetAllProjectName(value: any) {
    // debugger;
    this.projectid = value;
    console.log(`this.projectId`, this.projectid);
    this.GetTableDetails();
    
  }
  //table details bind
  projectTableDetails: any;
  GetTableDetails() {
    var model = {
      projectid: this.projectid,
    };  

    this.rest.postParams(this.Global.getapiendpoint() + '/RoleMaster/GetUserRoleProjectDetails', model) .subscribe((data: any) => {
      if(data.Success){  
        this.projectTableDetails = data.Data;
      }
      });
      this.getUserDetails();
  }

 
  ShowDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/Project/GetAllProjects').subscribe((data: any) => {
      if(data.Success){
        // console.log(`projectDetails`, data.Data);
        this.projectDetails = data.Data;
      }
      });
  }

  showformdetails() {
    this.ProjectRoleMappingForm = this.fb.group({
      ProjectName: [''],
      userName: [''],
      role: [''],
    });
  }

  submit() {
    if (!this.ProjectRoleMappingForm.valid) {
      return;
    }
  }

 
  EditProjectRoleDetails(row: any) {

    this.editflag=1;
   
    this.usernameDropdown =true
    this.flag = 1;
    this.ProjectRoleDialog = true;
    this.showSaveBtn = false;
    // this.username = row.userid;
    this.selectedUserid = row.userid;
    // console.log(' this.selectedUserid ', this.selectedUserid )
    this.roledata = row.rolename;   
    var arrayrolename = this.roledata.split(',');
    this.selectedusername = row.username;
    this.selected3 = arrayrolename;   
    this.ProjectRoleMappingForm = this.fb.group({
      userName: [this.selectedusername],
      role: [this.selected3],
    });
    this.oldroleid = this.selected3;
  }

  tasksubmit(isvalid: boolean) {
    if (isvalid) {
    
    }
  }
 
  getUserDetails() {
   var model={
      projectid:this.projectid
    }
    console.log('project',model)
    this.rest.postParams(this.Global.getapiendpoint() + '/UserDetails/GetAllAssign',model).subscribe((data: any) => {
        if(data.Success){
          console.log(`GetAllAssign Data`, data.Data);
          this.userDetails = data.Data;
        }
      });
  }
  
  GetAllRoleDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/RoleMaster/GetAllRole').subscribe((data: any) => {
        if(data.Success){
            // console.log(`RoleDetails data`, data.Data);
            this.RoleDetails = data.Data;
            let roleData: any = [];
            data.Data.forEach((element: any) => {
            roleData.push({
            id: element.typeid,
            name: element.name,
            });
            });
            // console.log('roleData', roleData);
        }
      });
  }

 
  GetRoleId(value: any) {
    this.roleid = value;
    // console.log(`this.roleid`, this.roleid);
  }


  GetSelectedUserName(value: any) {
    this.selectedUserid = value;
    this.getuserid = this.RoleDetails;
  }

  SaveResource() {
    this.editflag=0;
    this.flag = 0;
    var model = {
      projectid: this.projectid,
      userid: this.selectedUserid,
      roleid: this.roleid,
      created_by: this.userLoggedIn.id,
      created_date: moment().format('YYYY-MM-DD'),
    };
    // console.log(`Save Resource model`, model);
    this.rest
      .postParams(
        this.Global.getapiendpoint() + '/RoleMaster/SaveProjectUserRoleMapping',model).subscribe((data: any) => {
        if (data.Success) {
          this.messageService.add({severity: 'success',summary: 'Success',detail: 'Add New Resource Successfully',
          });
          this.Cancel_form();
          this.ProjectRoleMappingForm.reset();
        } else {
          this.messageService.add({severity: 'success',summary: 'Success',detail: 'Record not saved',
          });
        }
      });
  }
  flag: any;
  UpdateRoleMapping() {
    var insert: any = ([] = this.selected3.filter(
      (d: any) => !this.oldroleid.includes(d)
    ));
    var deleterecord: any = ([] = this.oldroleid.filter(
      (d: any) => !this.selected3.includes(d)
    ));

    var model = {
      insert: insert,
      delete: deleterecord,
      projectid: this.projectid,
      userid: this.selectedUserid,
    };

    this.rest.postParams(this.Global.getapiendpoint() + '/RoleMaster/UpdateRoleMaster', model).subscribe((data: any) => {
        if (data.Success) {
          this.messageService.add({severity: 'success',summary: 'Service Message',detail: 'Project Role updated successfully',
          });
          this.Cancel_form();
          this.flag = 0
          this.editflag=0
        } else {
          this.messageService.add({severity: 'warn',summary: 'Success',detail: 'Record not updated..!!',
          });
        }
      });
  }

  Cancel_form() {
    this.ProjectRoleMappingForm.reset();
    this.ShowDetails();
    this.GetTableDetails();

    this.ProjectRoleDialog = false;
    this.showformdetails();
  }
}
