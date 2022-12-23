import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import * as moment from 'moment';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { RowComponent } from '@coreui/angular';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-weekely-efforts',
  templateUrl: './weekely-efforts.component.html',
  styleUrls: ['./weekely-efforts.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class WeekelyEffortsComponent implements OnInit {
  userLoggedIn: any;
  userid: any;
  RADetails: any;
  RAFilterData: any;
  projectDetails: any;
  WeekelyEffortForm!: FormGroup;
  WeekelyEffortsDialog: boolean;
  monthweekedata: any;
  StartDateFilterData: any;
  EndDateFilterData: any;
  Week: any;
  hours: any = [];
  effors: any;
  startdate: any;
  enddate: any;
  weekdates: any = [];
  projectActivityDetails: any;
  showSaveBtn: boolean;
  WeekelyEffortsData: any;
  HoursData: any;
  weekids: any;
  u_id: any;
  weekehours: any;
  weekhoursarray: any = [];
  balancedHours : any;
  AssignedHours: any;

  constructor(private fb: FormBuilder, private router: Router,
    private rest: RestService, private Global: Global,
    private ApiService: ApiserviceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.ShowDetails();
    
    this.showformdetails();
    this.MonthWeek();
    this.ShowProjectDetails();
    //this.ShouwHours();
    this.ShowProjectActivityDetails();
    this.WeekelyEffortsShowDetails();
  }

  showformdetails() {
    this.WeekelyEffortForm = this.fb.group({
      RAName: [''],
      ResourceName: [''],
      MonthWeeks: [''],
      ProjectName: [''],
      ActivityName: [''],
      Hours: ['']
    });
  }

  submit() {
    if (!this.WeekelyEffortForm.valid) {
      return;
    }
  }

  WeekelyEffortsShowDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/WeekelyEfforts/GetWeekelyEffortsTable').subscribe((data: any) => {

      this.WeekelyEffortsData = data.Data;
//      console.log("WeekelyEffortsData", this.WeekelyEffortsData);

      //this.monthwek = data.Data;

    })
  }
  updateid: any;

  RAFilterData1:any
  editWeekelyEfforts(row: any) {
  //this.RAUsers(row)
  console.log("Edit Row", row);
    this.u_id = row.userid
    // this.RAFilterData = this.RADetails.filter(task => task.userid === row.userid);
  
    this.RAFilterData = this.RADetails.filter(task => task.ra_id === row.raid);
   

  //  console.log("RA Filter Data",this.RAFilterData);   
  
 
    this.updateid = row.id;
    this.AssignedHours = row.hours;
    console.log("  this.updateid  ",  this.updateid );
    this.HoursDetails(row.idweek);
    //this.updateid = parseInt(row.id);
    setTimeout(() => {
      this.WeekelyEffortsDialog = true;
      this.showSaveBtn = false;
    
      this.WeekelyEffortForm = this.fb.group({
        RAName: [row.raid],
        ResourceName: [row.user_id],
        ProjectName: [row.id_project],
        Hours: [row.hours],
        MonthWeeks: [row.idweek],
        //      Hours: [row.hours],
        ActivityName: [row.id_activity]
      })
    }, 500)
   
  }

  UpdateWeekelyEfforts() {
    var model = {
      id: this.updateid,
      Raname: this.WeekelyEffortForm.value.RAName,
      resourcename: this.WeekelyEffortForm.value.ResourceName,
      projectname: this.WeekelyEffortForm.value.ProjectName,
      hours: this.WeekelyEffortForm.value.Hours,
      monthweekhours: this.WeekelyEffortForm.value.MonthWeeks,
      activityid: this.WeekelyEffortForm.value.ActivityName,
      userid: this.userLoggedIn.id
    };

   // console.log("Update Model", model);

    this.rest.postParams(this.Global.getapiendpoint() + '/WeekelyEfforts/UpdateWeekelyEfforts', model).subscribe((data: any) => {
      if (data.Success) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Record updated successfully' });
        this.Cancel_form();
        // this.WeekelyEffortForm.reset();
        // this.ShowDetails()
        this.WeekelyEffortsShowDetails();
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Success', detail: 'Record not saved' });
      }
    })
  }

  monthwek = [];
  MonthWeek() {
    this.rest.getAll(this.Global.getapiendpoint() + '/WeekelyEfforts/GetMonthWeek').subscribe((data: any) => {

      this.monthwek = data.Data;
     console.log(' this.monthwek', this.monthwek)


    })
  }
  // removeDuplicatesArrayById: Array<any> = [];
  RAName: Array<any>= [];
  ShowDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/RAMapping/GetRADetails').subscribe((data: any) => {
      if (data.Success) {
        this.RADetails = data.Data;
        this.RAName = this.removeDuplicates(this.RADetails, "raname")
       

        // this.ra_filter=data.Data
        // this.RAFilterData1= this.RADetails.filter(task => task.ra_id === this.ra_filter);

     //   console.log("RADetails", this.RADetails);

        // this.RAFilterData = this.RADetails.filter(task => task.ra_id === this.userid);

        // console.log("Filtered DAta", this.RAFilterData);
      }
    })
  }
  removeDuplicates(myArray:any, Prop:any) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }

  ra_filter: any;
  efforts_plannedby: any;
  plannedby: any;
  RAUsers(event:any) {
   console.log("Users Filter event", event);
  // debugger
    this.ra_filter = event.value;
    console.log( 'ra filter',  this.ra_filter)
    this.RAFilterData = this.RADetails.filter(task => task.ra_id === this.ra_filter);

   console.log("RA Filter Data",this.RAFilterData);

  //   this.efforts_plannedby = this.RADetails.filter(task => task.ra_id === this.ra_filter);

  // //  console.log("Efforts Data", this.efforts_plannedby[0].ra_id);
  //   this.plannedby = this.efforts_plannedby[0].ra_id;
  }
  ShowProjectDetails() {
    this.rest.getAll(this.Global.getapiendpoint() + '/Project/GetAllProjects').subscribe((data: any) => {

      this.projectDetails = data.Data;

  //    console.log("Projects NAme", this.projectDetails);

    });
  }


  ShowProjectActivityDetails() {

    this.rest.getAll(this.Global.getapiendpoint() + '/General/getProjectStatus/' + 60).subscribe((data: any) => {
      if (data.Success) {
        this.projectActivityDetails = data.Data;
  //      console.log("Projects Activity NAme", this.projectActivityDetails);
      }
    })
  }

  showCreateNewProjectDialog() {
    this.updateid = 0;
    this.AssignedHours = 0;
    this.WeekelyEffortsDialog = true;
    this.showSaveBtn = true;
  }

  useridDetails(event){
    this.u_id = event.value;
  }
  HoursDetails(weekeids:any) {

    var model = {
      userid: this.u_id,
      weekeid: weekeids ,
      effortid:this.updateid
    }

    console.log('user id hours',model)
    this.rest.postParams(this.Global.getapiendpoint() + '/WeekelyEfforts/GetHoursData', model).subscribe((data: any) => {
      //if(data.Success){
      this.HoursData = data.Data;

      this.weekehours = data.Data[0].hours;

      // console.log("Hours Data....",this.weekehours);

      if(this.weekehours === null){
        this.weekhoursarray = 40;
      }
      if(this.weekehours != null){
        this.weekhoursarray = this.weekehours;
      }
      this.ShouwHours(this.weekhoursarray)
      // }
  
    });
  }
  ShouwHours(weekhours) {
    console.log('weekhours',weekhours ,  this.AssignedHours )
    // weekhours = parseInt(weekhours) + parseInt(this.AssignedHours);
   
     
    this.hours.splice(0)
    for (let i = 1; i <= weekhours; i++) {

      this.hours.push(i);
    }
  }

ExporttoExcelReport(){
  if (this.WeekelyEffortsData) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.WeekelyEffortsData);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer: any = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });
        this.saveAsExcelFile(excelBuffer, "Weekly effort - ReportDetails");
    });
}
else {

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


showConfirm(Selectedrow:any){
//  alert('hi')
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        var model={
          id: Selectedrow.id
        }
          // console.log('deleted model',model)
          this.rest.postParams(this.Global.getapiendpoint() + "/WeekelyEfforts/UpdateEffortActiveStatus", model).subscribe((data: any) => {
            if (data.Success) {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted successfully' });
              // this.confirmationService.close({severity:'info', summary:'Confirmed', detail:'Record deleted successfully!!'});
            }
            this.WeekelyEffortsShowDetails();
          })
        
      },
      reject: () => {
     
      } 
  });
}
    
  
  SaveResource() {
    
    var model = {
      Raname: this.WeekelyEffortForm.value.RAName,
      resourcename: this.WeekelyEffortForm.value.ResourceName,
      projectname: this.WeekelyEffortForm.value.ProjectName,
      hours: this.WeekelyEffortForm.value.Hours,
      monthweekhours: this.WeekelyEffortForm.value.MonthWeeks,
      activityid: this.WeekelyEffortForm.value.ActivityName,
      userid: this.userLoggedIn.id
    };
    console.log('saved data',model)
    this.rest
      .postParams(
        this.Global.getapiendpoint() + '/WeekelyEfforts/SaveWeekelyEfforts', model).subscribe((data: any) => {
          if (data.Success) {
            this.messageService.add({
              severity: 'success', summary: 'Success', detail: 'Add New Weekely Efforts Successfully',
            });
            this.Cancel_form();
            // this.WeekelyEffortForm.reset();
            // this.ShowDetails()
            this.WeekelyEffortsShowDetails();

          } else {
            this.messageService.add({
              severity: 'success', summary: 'Success', detail: 'Record not saved',
            });
          }
        });
 }
  startdates: any;
  MonthstartendDate(event) {
    this.startdates = this.WeekelyEffortForm.value.MonthWeeks.startdate;

    this.enddate = this.WeekelyEffortForm.value.MonthWeeks.enddate;

    this.effors = this.startdates + "-to-" + this.enddate;
  }


  Cancel_form() {
    this.WeekelyEffortForm.reset();
    this.ShowDetails();
    this.WeekelyEffortsDialog = false;
    // this.showformdetails();
  }
}


