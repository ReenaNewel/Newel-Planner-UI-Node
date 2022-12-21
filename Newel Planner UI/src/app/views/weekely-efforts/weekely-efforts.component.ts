import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import * as moment from 'moment';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-weekely-efforts',
  templateUrl: './weekely-efforts.component.html',
  styleUrls: ['./weekely-efforts.component.scss'],
  providers: [MessageService]
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
  constructor(private fb: FormBuilder, private router: Router,
    private rest: RestService, private Global: Global,
    private ApiService: ApiserviceService,
    private messageService: MessageService,
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
  this.HoursDetails(row.idweek);
 
    this.updateid = row.id;
    // console.log("hours row", row.hours);
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
    this.WeekelyEffortsDialog = true;
    this.showSaveBtn = true;
  }

  useridDetails(event){
    this.u_id = event.value;
  }
  HoursDetails(weekeids:any) {

    var model = {
      userid: this.u_id,
      weekeid: weekeids
    }
    console.log('user id hours',model)
    this.rest.postParams(this.Global.getapiendpoint() + '/WeekelyEfforts/GetHoursData', model).subscribe((data: any) => {
      //if(data.Success){
      this.HoursData = data.Data;

      this.weekehours = data.Data[0].hours;

      console.log("Hours Data....",this.weekehours);

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

    for (let i = 1; i <= weekhours; i++) {

      this.hours.push(i);
    }
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


