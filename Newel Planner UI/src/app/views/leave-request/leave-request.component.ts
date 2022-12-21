// import { Component, OnInit } from '@angular/core';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

export interface PeriodicElement {
  UserName: string;
  Fromdate: number;
  Todate: number;
  leave: number;
  reason: string;
  Approvedon: number;
  Approvby: string;
  status: string;
  remark: string;
}

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  providers: [MessageService]
})
export class LeaveRequestComponent implements OnInit {

  Days: any
  numleaves: any;
  // leaveform!:FormGroup

  ProjectForm !: FormGroup
  RejectForm !: FormGroup
  dataSource: any;
  userLoggedIn: any;
  userid: any;
  projectDialog: boolean;
  showSaveBtn: boolean;
  RejectDialog: boolean;
  displayedColumns: string[] = ['UserName', 'Fromdate', 'Todate', 'leave', 'LeaveType', 'reason', 'Approvedon',
    'Approvby', 'status', 'remark'];
  updateid: any;
  leavestatus: any;
  today: Date;

  constructor(private fb: FormBuilder, private router: Router,
    private rest: RestService, private Global: Global,
    // private _snackBar: MatSnackBar  ,
    private ApiService: ApiserviceService,
    private messageService: MessageService,
    // private messageService: MessageService
  ) { }


  ngOnInit(): void {

    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.today = new Date();
    this.ProjectForm = this.fb.group({
      startdate: [''],
      enddate: [''],
      LeaveNO: [''],
      Reason: [''],
      LeaveDropdwon: [''],
    })

    this.RejectForm = this.fb.group({
      Reason: ['']
    })


    this.LeaveDetails();
    this.LeaveDetailsForApproval();
    this.leavetypedetaiils();
    this.RAIdDetails();

  }


  leaveData: any;
  LeaveDetails() {

    var model = {
      userid: this.userid
    }
    this.rest.postParams(this.Global.getapiendpoint() + '/Leave/GetLeaveRequestData', model).subscribe((data: any) => {
      if (data.Success) {
        console.log(`Get All data`, data.Data);
        this.leaveData = data.Data;

      }

    });
  }

  showCreateNewProjectDialog() {
    this.today = new Date()
    this.projectDialog = true;
    this.showSaveBtn = true;
    this.Balanceleave();
  }


  leavetypeDropdown: any;
  leavetypedetaiils() {
    this.rest
      .getAll(this.Global.getapiendpoint() + '/Leave/getLeaveTypeDetails')
      .subscribe((data: any) => {
        if (data.Success) {
          this.leavetypeDropdown = data.Data;
        }
      });
  }

  leave_name: any;
  GetLeaveTypeName(value: any) {
    this.leave_name = value;
  }

  Raid: any;
  RAIdDetails() {
    var model = {
      userid: this.userid//this.userid
    }
    this.rest.postParams(this.Global.getapiendpoint() + '/Leave/getRAIId', model).subscribe((data: any) => {
      if (data.Success) {
        this.Raid = data.Data.ra_id;
      }
      else {

      }

    });
  }

  leaveuser() {
    console.warn(this.ProjectForm.value)
  }

  GetDays() {

    var date1 = new Date(this.ProjectForm.value.startdate);

    var date2 = new Date(this.ProjectForm.value.enddate);
    console.log('dates are', date1, date2);
    var Time = date2.getTime() - date1.getTime();
    this.Days = Time / (1000 * 3600 * 24) + 1
    this.ProjectForm.value.leaveno = this.Days

    this.numleaves = this.ProjectForm.value.leaveno
    console.log('days', this.ProjectForm.value.leaveno)
  }

  leaveRequestSaveData() {

    var model = {
      //projectid: this.projectid,
      userid: this.userLoggedIn.id,
      //roleid: this.roleid,
      reason: this.ProjectForm.value.Reason,
      leaveno: this.datecount,
      fromdate: moment(this.ProjectForm.value.startdate).format('YYYY-MM-DD'),
      todate: moment(this.ProjectForm.value.enddate).format('YYYY-MM-DD'),
      created_by: this.userLoggedIn.id,
      leave_name: this.ProjectForm.value.LeaveDropdwon,
      ra_id: this.Raid,

      created_date: moment().format('YYYY-MM-DD'),
    };
    console.log(`model`, model);

    this.rest
      .postParams(
        this.Global.getapiendpoint() + '/Leave/SaveLeaveRequest',
        model
      )
      .subscribe((data: any) => {
        if (data.Success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Leave Request Created Successfully' });
          this.Cancel_form();
          this.LeaveDetails();
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Leave Request not created' });
        }

      });

  }

  Cancel_form() {
    this.projectDialog = false;
    this.ProjectForm.reset();
    this.RejectDialog = false;
    this.RejectForm.reset();
  }

  submit() {
    if (!this.ProjectForm.valid) {
      return
    }
  }

  GetAllClient() {

  }

  GetAllProjectType() {

  }

  date2: any;
  date1: any;
  datecount: any;

  leavecount() {

    this.date1 = new Date(this.ProjectForm.value.startdate);

    this.date2 = new Date(this.ProjectForm.value.enddate);

    var iWeeks, iDateDiff, iAdjust = 0;
    // if (this.date2 < this.date1 ) return -1; // error code if dates transposed
    if (this.date2 < this.date1) {
      this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Please Select Valid Date' });
    }
    var iWeekday1 = this.date1.getDay(); // day of week
    var iWeekday2 = this.date2.getDay();
    iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
    iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((this.date2.getTime() - this.date1.getTime()) / 604800000)

    if (iWeekday1 <= iWeekday2) { //Equal to makes it reduce 5 days
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
    }

    iDateDiff -= iAdjust // take into account both days on weekend
    this.datecount = iDateDiff + 1;

    this.ProjectForm.controls['LeaveNO'].setValue(this.datecount);
    // console.log("Date Count", iDateDiff + 1);
  }


  weekendsDatesFilter = (d: Date | null): boolean => {
    const day = d?.getDay();

    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6;
  }


  //new changes
  editLeaveRequest(row) {
    console.log("Edit Row", row);

    this.projectDialog = true;
    this.showSaveBtn = false;

    this.updateid = row.id;
    this.leavestatus = row.status
    this.ProjectForm = this.fb.group({
      startdate: [new Date(row.fromdate)],
      enddate: [new Date(row.todate)],
      LeaveNO: [row.no_of_leaves],
      Reason: [row.description],
      LeaveDropdwon: [row.leaveid],
    })
  }
  

  UpdateLeaveRequest() {
  var model = {
      userid: this.userLoggedIn.id,
      id: this.updateid,
      reason: this.ProjectForm.value.Reason,
      leaveno: this.ProjectForm.value.LeaveNO,
      fromdate: moment(this.ProjectForm.value.startdate).format('YYYY-MM-DD'),
      todate: moment(this.ProjectForm.value.enddate).format('YYYY-MM-DD'),
      created_by: this.userLoggedIn.id,
      leave_name: this.ProjectForm.value.LeaveDropdwon,
      ra_id: this.Raid,
      leavestatus: this.leavestatus,
      created_date: moment().format('YYYY-MM-DD'),
    };

    console.log("UpdateTask model", model)
    this.rest.postParams(this.Global.getapiendpoint() + '/Leave/UpdateLeaveRequestDetails', model).subscribe((data: any) => {
      console.log('data', data.Data)
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Task details updated successfully' });
        this.Cancel_form();
        this.LeaveDetails();
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
      }
    })
  }

  CancelLeaveRequest(rows) {
    console.log("Cancel Row", rows);
    this.updateid = rows.id;
    var model = {
      userid: this.userLoggedIn.id,
      id: this.updateid,
      ra_id: this.Raid,
      cancel_status: 1,
      leavestatus: rows.status,
      created_date: moment().format('YYYY-MM-DD'),

      reason: rows.description,
      leaveno: rows.no_of_leaves,
      fromdate: moment(rows.fromdate).format('YYYY-MM-DD'),
      todate: moment(rows.todate).format('YYYY-MM-DD'),
      created_by: this.userLoggedIn.id,
      leave_name: rows.leave_type,
      };

    console.log("Cancel model", model)
    this.rest.postParams(this.Global.getapiendpoint() + '/Leave/CancelLeaveRequestDetails', model).subscribe((data: any) => {
      console.log('data', data.Data)
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Leave Request Cancel successfully' });
        this.Cancel_form();
        this.LeaveDetails();
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
      }
    })
  }


  ApprovalLeaveData: any;
   LeaveDetailsForApproval() {

    var model = {
      userid: this.userid
    }
    this.rest.postParams(this.Global.getapiendpoint() + '/Leave/GetLeaveDetailsforApproval', model).subscribe((data: any) => {
      if (data.Success) {
           this.ApprovalLeaveData = data.Data;
        console.log(`ApprovalLeaveData`, this.ApprovalLeaveData);
     
      }

    });
  }



  RejectLeaveRequest(rows) {
    console.log("Cancel Row", rows);
    this.updateid = rows.id;
    this.RejectDialog = true;
    var model = {
      //projectid: this.projectid,
      userid: this.userLoggedIn.id,
      id: this.updateid,
       reason: this.RejectForm.value.Reason,
      // leaveno: this.ProjectForm.value.LeaveNO,
      // fromdate: moment(this.ProjectForm.value.startdate).format('YYYY-MM-DD'),
      // todate: moment(this.ProjectForm.value.enddate).format('YYYY-MM-DD'),
      // created_by: this.userLoggedIn.id,
      // leave_name: this.ProjectForm.value.LeaveDropdwon,
      ra_id: this.Raid,
      cancel_status: 1,
      created_date: moment().format('YYYY-MM-DD'),
    };

    console.log("Cancel model", model)
  
  }

  UpdateRejectLeaveRequest() {

    var model = {
      //projectid: this.projectid,
      userid: this.userLoggedIn.id,
      id: this.updateid,
      reason: this.RejectForm.value.Reason,
      ra_id: this.Raid,
      cancel_status: 1,
      created_date: moment().format('YYYY-MM-DD'),
    };

    console.log("Reject model", model)
    this.rest.postParams(this.Global.getapiendpoint() + '/Leave/RejectLeaveRequestDetails', model).subscribe((data: any) => {
      console.log('data', data.Data)
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Task details updated successfully' });
        this.Cancel_form();
        this.LeaveDetails();
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
      }
    })
  }


  ApproveLeaveRequest(rows) {
    console.log("Approve Row", rows);
    this.updateid = rows.id;
    var model = {
      userid: this.userLoggedIn.id,
      id: this.updateid,
      ra_id: this.Raid,
      leavestatus: rows.status,
      user_id: rows.user_id


      //cancel_status: 4,
      //created_date: moment().format('YYYY-MM-DD'),
    };

    // console.log("Cancel model", model)
    this.rest.postParams(this.Global.getapiendpoint() + '/Leave/ApproveLeaveRequestDetails', model).subscribe((data: any) => {
      console.log('data', data.Data)
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Leave Request Approved successfully' });
        this.Cancel_form();
        this.LeaveDetails();
        this.LeaveDetailsForApproval()
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not updated..!!' });
      }
    })
  }

  
// balanceleavedata: any;
// Balanceleave() {
//   this.rest
//     .getAll(this.Global.getapiendpoint() + '/Leave/getBalancedLeave')
//     .subscribe((data: any) => {
//       //if (data.Success) {
//         this.balanceleavedata = data.Data;

//         console.log("Balance Leave", this.balanceleavedata);
//       //}
//     });
// }

balanceleavedata: any;
Balanceleave() {
  var model = {
    userid: this.userid//this.userid
  }
  this.rest.postParams(this.Global.getapiendpoint() + '/Leave/getBalancedLeave', model).subscribe((data: any) => {
    if (data.Success) {
      this.balanceleavedata = data.Data;
      console.log("Balance leave", this.balanceleavedata);
    }
    else {

    }

  });
}
}


