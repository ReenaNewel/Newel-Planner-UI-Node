import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import * as moment from 'moment';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-ra-mapping-master',
  templateUrl: './ra-mapping-master.component.html',
  styleUrls: ['./ra-mapping-master.component.scss'],
  providers: [MessageService]
})
export class RaMappingMasterComponent implements OnInit {

  RAMappingForm !: FormGroup
  IsCreate: boolean = false;
  isViewList: boolean = true;
  IsEditable: boolean = false;

  UserData: any;
  RAData: any
  dataSource: any;
  RADetails: any;
  displayedColumns: string[] = ['Sr.No', 'username', 'useremailid', 'raname', 'raemailid', 'Action'];
  emailid: any;
  grpId: any;
  selectedItemGroupName: any;
  userid: any;
  RAemailid: any;
  RAMappingDialog: boolean;
  showSaveBtn: boolean;
  userLoggedIn: any;
  EmployeeID: any;

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
    this.ShowDetails();
    this.ShowAllfromDetails();
    this.GetuserRaropdown();
    this.GetRadropdown();
    this.showform();
  }


  ShowAllfromDetails() {
    this.RAMappingForm = this.fb.group({
      EmpName: [''],
      RAName: [''],
      EmpId: [''],
      RaId: ['']
    })
  }

 
  ShowDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/RAMapping/GetRADetails').subscribe((data: any) => {
      if (data.Success) {
        this.RADetails = data.Data;       
      }
    })
  }

  GetuserRaropdown() {
    this.rest.getAll(this.Global.getapiendpoint() + '/RAMapping/GetAllRAUser').subscribe((data: any) => {
      if (data.Success) {
        this.UserData = data.Data;
      }
      // console.log('All User and RA names', this.UserData);
    })
  }

  GetRadropdown() {
    this.rest.getAll(this.Global.getapiendpoint() + '/RAMapping/GetAllRa').subscribe((data: any) => {
      // console.log('All User and RA names',data.Data);
      if (data.Success) {
        this.RAData = data.Data;
      }
    })
  }

  ShowUserDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/UserDetails/Getuserdeatils/:id').subscribe((data: any) => {
      // console.log('All User Deatils', data.Data);
      if (data.Success) {
        this.UserData = data.Data;
      }
    })
  }
  getEmailId(event: any) {
    // console.log("event calling", event);
    this.rest.getAll(this.Global.getapiendpoint() + "/UserDetails/Getuserdeatils/" + event).subscribe((data: any) => {
      // console.log("data.Data", data.Data[0].emailid);
      if (data.Success) {
        this.emailid = data.Data[0].emailid
      }

    });

  }
  getRAEmailId(event: any) {
    // console.log("event calling", event);
    this.rest.getAll(this.Global.getapiendpoint() + "/UserDetails/Getuserdeatils/" + event).subscribe((data: any) => {
      // console.log("data.Data", data.Data[0].emailid);
      if (data.Success) {
        this.RAemailid = data.Data[0].emailid
      }

    });

  }
  SubmitNewRAMapping() {
    var model = {
      userid: this.RAMappingForm.controls['EmpName'].value,
      ra_id: this.RAMappingForm.controls['RAName'].value,
      created_date: moment().format('YYYY-MM-DD'),
      created_by: this.userid,
      isactive: true
    }
    var apiUrl = '';
    apiUrl = '/RAMapping/CreateRAandUserdetails';

    this.rest.postParams(this.Global.getapiendpoint() + apiUrl, model).subscribe((data: any) => {
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'New Data Saved successfully' });
        this.Cancel_form();
        this.ShowDetails();

      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not saved' });
      }
    });
  }

  UpdateRAMapping() {
    var model = {
      userid: this.EmployeeID,
      ra_id: this.RAMappingForm.controls['RAName'].value,
      modified_date: moment().format('yyyy-MM-DD'),
      modified_by: this.userid,
    }
    this.rest.postParams(this.Global.getapiendpoint() + '/RAMapping/UpdateRAUser', model).subscribe((data: any) => {
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Record updated successfully' });
        this.Cancel_form();
        this.ShowDetails();
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not saved' });
      }
    })
  }

  editRAMapping(row: any) {
    this.RAMappingDialog = true;
    this.showSaveBtn = false;
    this.IsCreate = false;
    this.isViewList = false;
    this.IsEditable = true
    this.EmployeeID = row.userid
    this.RAMappingForm = this.fb.group({
      EmpName: [row.username],
      RAName: [row.ra_id],
      EmpId: [row.useremailid],
      RaId: [row.raemailid]
    })
  }

  Cancel_form() {
    this.IsCreate = false
    this.isViewList = true
    this.IsEditable = false
    this.RAMappingForm.reset();
   // this.ShowDetails();
}

  showform() {
    this.IsCreate = true
    this.isViewList = false
    this.IsEditable = false
    this.RAMappingForm.reset();
  }


  submit() {
    if (!this.RAMappingForm.valid) {
      return
    }
  }
  showCreateNewRAMappingDialog() {
    this.IsCreate=true
    this.RAMappingDialog = true;
    this.showSaveBtn = true;
  }
}
