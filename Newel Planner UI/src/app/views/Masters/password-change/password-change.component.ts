import { Component, OnInit,ComponentFactoryResolver,ViewChild } from '@angular/core';
import { FormControl, FormGroup,Validators,FormBuilder } from '@angular/forms';

// import { MatPaginator } from '@angular/material/paginator';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
// import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  providers: [MessageService]
})
export class PasswordChangeComponent implements OnInit {
  passwordDialog: boolean;
  PasswordForm!: FormGroup;
  userLoggedIn: any;
  userid: any;
  userEmail: any;
  ProjectTaskStatusSummary: any;
  EditTaskid: any;
  userId: any;
  EditUnqID: any;
  editcreated_by: any;
  userRole: any;
  flag:any;
  constructor(private fb: FormBuilder, private router: Router,
    private rest: RestService, private Global: Global,
    // private _snackBar: MatSnackBar  ,
    private ApiService: ApiserviceService,
    private messageService: MessageService) { }

  
  ngOnInit(): void {

    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.userRole = this.userLoggedIn.defaultroleid;
    this.userId = this.userLoggedIn.id;
    this.userEmail = this.userLoggedIn.emailid;
    this.showformdetails()

  }
  Cancel_form(){
this.PasswordForm.reset();
  }
  
  showformdetails() {
    // this.Active =true
    // this.ProjectForm.reset()
    this.PasswordForm = this.fb.group({
      // userid: [''],
      oldPassword:['', [Validators.required, Validators.maxLength(10)]],
      newPassword:['', [Validators.required, Validators.maxLength(10)]]
    })
  }
  get oldPassword() { return this.PasswordForm.get('oldPassword'); }
  get newPassword() { return this.PasswordForm.get('newPassword'); }

  eventClick() {
    if(this.PasswordForm.controls['oldPassword'].value){
     
      var model = {
        userid: this.userid,
        password: this.PasswordForm.controls['oldPassword'].value,
        
      }
      console.log('getdetails:', model)
      this.rest.postParams(this.Global.getapiendpoint() + '/changePassword/changePassword', model).subscribe((data: any) => {
        console.log(data)
        if (data.Success) {
          // this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'User is Exiting...!!' });
          // this.Cancel_form()
          this.flag =1;
        }
        else{
          this.flag =0;
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'You have entered wrong password..!!' });
        }
        //  this.isViewList=true
  
      })
    }
   

  }


  changePassword(){

    var model = {
      userid: this.userid,
      password: this.PasswordForm.controls['newPassword'].value,
      
    }
    console.log('getdetails:', model)
    this.rest.postParams(this.Global.getapiendpoint() + '/changePassword/UpdatePassword', model).subscribe((data: any) => {
      console.log(data)
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Password updated successfully' });
        this.Cancel_form()
      }
      else{
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
      }
      //  this.isViewList=true

    })

  }
}
