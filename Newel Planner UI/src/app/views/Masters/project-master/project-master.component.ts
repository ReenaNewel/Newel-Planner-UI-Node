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


@Component({
  selector: 'app-project-master',
  templateUrl: './project-master.component.html',
  styleUrls: ['./project-master.component.css'],
  providers: [MessageService]
})
export class ProjectMasterComponent implements OnInit {
  ProjectForm !: FormGroup

  // ClientNames = [{ClientId:1 , ClientName : 'Edelweiss'},
  // {ClientId: 2, ClientName : 'Newel Tech'},
  // {ClientId:3 , ClientName : 'Motilal Oswal'}]

  // ProjectTypes = ['Support','Developement']

  dataSource: any
  SelectedClientNames: any
  ClientPrjId: any
  IsCreate: boolean = true;
  isViewList: boolean = false;
  IsEditable: boolean = true;
  ProjectStates: any
  ProjectStages: any
  ProjectTypes: any
  Days: any
  ClientNames: any
  clientid: any
  projecttypeid: any
  projectstageid: any
  projectstatusid: any
  projectid: any
  plannedEffort: any
  loginid: any
  userLoggedIn: any
  userid: any

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['Sr.No', 'ProjectId', 'ProjectName', 'ClientName', 'ClientId', 'Owner', 'PlannedEfforts', 'Activity', 'ProjectType', 'ProjectTypeid', 'StartDate', 'EndDate',
    'ProjectStatus', 'ProjectStatusid', 'ProjectStage', 'ProjectStageid', 'Action'];

  products2: any[];
  SelectedProjectNames: any;


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
    this.IsCreate = false
    this.isViewList = true
    this.IsEditable = false

    this.showclient()
    this.showformdetails()
    this.ShowDetails()

    this.products2 = [
      {
        category: "Accessories",
        code: "f230fh0g3",
        description: "Product Description",
        id: "1000",
        image: "bamboo-watch.jpg",
        inventoryStatus: "INSTOCK",
        name: "Bamboo Watch",
        price: 65,
        quantity: 24,
        rating: 5,
      },
      {
        category: "Accessories",
        code: "nvklal433",
        description: "Product Description",
        id: "1001",
        image: "black-watch.jpg",
        inventoryStatus: "INSTOCK",
        name: "Black Watch",
        price: 72,
        quantity: 61,
        rating: 4,
      }

    ];

    console.log("products7", this.products2);

  }

  onRowEditSave() {
      // delete this.clonedProducts[product.id];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product is updated',
      });

  }

  showformdetails() {
    // this.ProjectForm.reset()
    this.ProjectForm = this.fb.group({
      PrjName: [''],
      ClientName: [''],
      PrjType: [''],
      PrjStatus: [''],
      // PrjOwner: [''],
      PrjStage: [''],
      Activity: [''],
      PrjActive: ['', [Validators.required]],
      // PrjInActive: ['', [Validators.required]],
      fromdate: [''],
      todate: [''],
      PlannedEfforts: [''],

    })
  }

  ShowDetails() {
    // console.log(this.Global.getapiendpoint() + '/api/Project/GetAllProjects')
    this.rest.getAll(this.Global.getapiendpoint() + '/Project/GetAllProjects').subscribe((data: any) => {
      
      if(data.Success){
        this.SelectedProjectNames = data.Data
      }
      console.log('data', this.SelectedProjectNames)
    })


    if (this.ProjectForm.controls['PrjStatus']) {
      var id = 45
      this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + id).subscribe((data: any) => {
        // console.log('prj status',data.Data)
        if (data.Success) {
          this.ProjectStates = data.Data
        }

      })
    }
    if (this.ProjectForm.controls['PrjStage']) {
      var id = 89
      this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + id).subscribe((data: any) => {
        // console.log('prj stage',data.Data)
        if (data.Success) {
          this.ProjectStages = data.Data
        }

      })
    }
    if (this.ProjectForm.controls['PrjType']) {
      var id = 77
      this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + id).subscribe((data: any) => {
        // console.log('prj type',data.Data)
        if (data.Success) {
          this.ProjectTypes = data.Data
        }

      })
    }
  }

  showclient() {
    this.rest.getAll(this.Global.getapiendpoint() + '/Client/GetAllClients').subscribe((data: any) => {

      if (data.Success) {
       
        this.ClientNames = data.Data
        // console.log('client',data.Data)

      }

    })
  }
  showselectedclient(clientid: any) {
    var model = {
      id: clientid
    }
    this.rest.postParams(this.Global.getapiendpoint() + '/Client/GetSelectedClients', model).subscribe((data: any) => {

      if (data.Success) {
        console.log('slected client', data.Data)
        this.SelectedClientNames = data.Data


      }

    })
  }

  Cancel_form() {
    // this.IsCreate = false
    // this.isViewList = true
    // this.IsEditable = false
    this.ProjectForm.reset();
    this.ShowDetails()
  }
  submit() {
    if (!this.ProjectForm.valid) {
      return
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showform() {
    // // debugger;
    // // console.log('hi')
    // this.IsCreate = true

    // this.isViewList = false
    // this.IsEditable = false
    this.ProjectForm.reset();

   
  }
  SavePrjDetails() {
   
    var model = {
      name: this.ProjectForm.controls['PrjName'].value,
      activity: this.ProjectForm.controls['Activity'].value,
      clientid: this.ProjectForm.controls['ClientName'].value,
      fromdate: moment(this.ProjectForm.controls['fromdate'].value).format('YYYY-MM-DD'),
      todate: moment(this.ProjectForm.controls['todate'].value).format('YYYY-MM-DD'),
      owner:null,
      isactive: this.ProjectForm.controls['PrjActive'].value,
      created_date: moment(new Date()).format('YYYY-MM-DD'),
      created_by: this.userid,
      projecttype: this.PrjType_id,
      plannedeffort: this.ProjectForm.controls['PlannedEfforts'].value,
      projectstage: this.ProjectForm.controls['PrjStage'].value,
      projectstatus: this.ProjectForm.controls['PrjStatus'].value

    }
    console.log('project model',model)
    this.rest.postParams(this.Global.getapiendpoint() + '/Project/InsertProjects', model).subscribe((data: any) => {

      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'New Project added successfully' });
        this.Cancel_form()
      }
      else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record not saved' });
      }
      
      //  this.isViewList=true

    })
  }
  editprojects(row: any) {

    console.log('project rows :', row)
    this.IsCreate = false;
    this.isViewList = false;
    this.IsEditable = true

    this.projectid = row.projectid
    this.plannedEffort = row.plannedeffort

    console.log('client', row.clientid)

    //  this.showselectedclient(this.ClientPrjId)
    debugger;
    this.ProjectForm = this.fb.group({
      PrjName: [row.projectname],
      ClientName: [row.clientid],
      PrjType: [row.projecttypeid],
      PrjStatus: [row.projectstatusid],
      PrjOwner: [row.owner],
      PrjStage: [row.projectstageid],
      Activity: [row.projectdesc],
      PrjActive: [row.isactive],
      fromdate: [row.prjtodate],
      todate: [row.prjstartdate],
      PlannedEfforts: [Math.round(this.plannedEffort)]

    })
  }

  Client_id: any
  PrjType_id: any
  PrjStatus_id: any
  PrjStage_id: any
  GetAllClient(value: any) {
    this.Client_id = value
  }

  GetAllProjectType(value: any) {
    this.PrjType_id = value
  }
  GetAllProjectStatus(value: any) {
    this.PrjStatus_id = value
  }
  GetAllProjectStage(value: any) {
    this.PrjStage_id = value
  }

  UpdateProject() {
    // this.loginid =1
    var model = {
      projectid: this.projectid,
      name: this.ProjectForm.controls['PrjName'].value,
      activity: this.ProjectForm.controls['Activity'].value,
      clientid: this.ProjectForm.controls['ClientName'].value,
      fromdate: moment(this.ProjectForm.controls['fromdate'].value).format('YYYY-MM-DD'),
      todate: moment(this.ProjectForm.controls['todate'].value).format('YYYY-MM-DD'),
      owner: this.ProjectForm.controls['PrjOwner'].value,
      isactive: this.ProjectForm.controls['PrjActive'].value,
      modified_date: moment(new Date()).format('YYYY-MM-DD'),
      modified_by: this.userid,
      projecttype: this.ProjectForm.controls['PrjType'].value,
      plannedeffort: this.ProjectForm.controls['PlannedEfforts'].value,
      projectstage: this.ProjectForm.controls['PrjStage'].value,
      projectstatus: this.ProjectForm.controls['PrjStatus'].value,

    }
    console.log('update data :', model)
    this.rest.postParams(this.Global.getapiendpoint() + '/Project/UpdateProjects', model).subscribe((data: any) => {
      // console.log(data.Data)
      if (data.Success) {
        this.openSnackBarSuccess(data.Message)
        this.Cancel_form()
      }
      //  this.isViewList=true

    })

  }

  Cancel() {
    // this.ProjectForm.reset()
    this.router.navigate(['timesheet'])
  }

  openSnackBarSuccess(message: any) {
    // this._snackBar.open(message, 'Close', {
    //   duration: 3000,
    //   verticalPosition: 'bottom',
    //   horizontalPosition: 'right',
    //   panelClass: ["success"]
    // });

  }



}
