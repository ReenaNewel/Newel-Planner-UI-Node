import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global'
import * as moment from 'moment';

@Component({
  selector: 'app-task-accordion',
  templateUrl: './task-accordion.component.html',
  styleUrls: ['./task-accordion.component.scss']
})
export class TaskAccordionComponent implements OnInit {

  products: any[]
  dataSource: any;
  dataSource2: any;
  dataSource4: any;
  dataSource5: any;
  dataSource3: any;
  TimesheetDate1 : any;
  TimesheetDate2 : any;
  TimesheetDate3 : any;
  TimesheetDate4 : any;
  TimesheetDate5 : any;
  Totalhrs = 0;
  Totalmin = 0 ;
  totaltime :any;
  totaltimehr = 0;
  Totalhrs1 = 0;
  Totalmin1= 0 ;
  totaltime1 :any;
  totaltimehr1=0;
  Totalhrs2 = 0;
  Totalmin2= 0 ;
  totaltime2 :any;
  totaltimehr2=0;
  Totalhrs3 = 0;
  Totalmin3= 0 ;
  totaltime3:any;
  totaltimehr3=0;
  Totalhrs4 = 0;
  Totalmin4= 0 ;
  totaltime4 :any;
  totaltimehr4=0;
  userLoggedIn: any;
  userRole: any;
  userId: any;
  userEmail:any;

  constructor(private router: Router,  
    private rest :RestService , 
    private Global : Global   ,private ApiService:ApiserviceService) { }

  ngOnInit(): void {

    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userRole = this.userLoggedIn.defaultroleid;
    this.userId = this.userLoggedIn.id;   

    this.ShowDetails()
  }

  ShowDetails(){
  this.Totalhrs = 0;
  this.Totalmin = 0 ;
  this.totaltimehr = 0;
  this.Totalhrs1 = 0;
  this.Totalmin1 = 0 ;
  this.totaltimehr1 = 0;
  this.Totalhrs2 = 0;
  this.Totalmin2 = 0 ;
  this.totaltimehr2 = 0;
  this.Totalhrs3 = 0;
  this.Totalmin3 = 0 ;
  this.totaltimehr3 = 0;
  this.Totalhrs4 = 0;
  this.Totalmin4 = 0 ;
  this.totaltimehr4 = 0;
  
          var model ={
            userid : this.userId ,
            day : 1
            }
            // console.log(`model`, model);
            this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard',model).subscribe((data: any) => {
            if(data.Success){
              this.dataSource =data.Data
              if(this.dataSource.length>0){
                  this.TimesheetDate1= moment(data.Data[0].date).format("DD-MM-YYYY")
                  for(var i=0 ; i < this.dataSource.length ; i++ ){
                    this.Totalmin = (this.Totalmin + data.Data[i].timeinminutes)
                    this.Totalhrs =  this.Totalhrs + data.Data[i].timeinhours 
                  }
                  if(this.Totalmin >= 60){
                    this.Totalmin = this.Totalmin/60
                  }
                  else{
                    this.Totalmin = this.Totalmin/100
                  }
              }
              this.totaltimehr  =  this.Totalhrs +  this.Totalmin
          } 
          })

          var model ={
            userid : this.userId ,
            day : 2
            }
            // console.log(`model`, model);
            this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard',model).subscribe((data: any) => {
             this.dataSource2 =data.Data
             if(this.dataSource2.length>0){
                this.TimesheetDate2= moment(data.Data[0].date).format("DD-MM-YYYY")
                for(var i=0 ; i < this.dataSource2.length ; i++ ){
                  this.Totalmin1 = (this.Totalmin1 + data.Data[i].timeinminutes)
                  this.Totalhrs1 =  this.Totalhrs1 + data.Data[i].timeinhours 
                }
                if(this.Totalmin1 >= 60){
                  this.Totalmin1 = this.Totalmin1/60
                }
                else{
                  this.Totalmin1= this.Totalmin1/100
                }
             }
            this.totaltimehr1  =  this.Totalhrs1 + this.Totalmin1
          })
          

          var model ={
            userid : this.userId ,
            day : 3            }
            // console.log(`model`, model);
            this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard',model).subscribe((data: any) => {
             this.dataSource3 =data.Data
             if(this.dataSource3.length>0){

                this.TimesheetDate3= moment(data.Data[0].date).format("DD-MM-YYYY")
                for(var i=0 ; i < this.dataSource3.length ; i++ ){
                  this.Totalmin2 = (this.Totalmin2 + data.Data[i].timeinminutes)
                  this.Totalhrs2 =  this.Totalhrs2 + data.Data[i].timeinhours 
                }
                if(this.Totalmin2 >= 60){
                  this.Totalmin2= this.Totalmin2/60
                }
                else{
                  this.Totalmin2= this.Totalmin2/100
                }
                this.totaltimehr2 =  this.Totalhrs2 + this.Totalmin2
             }
          
          })

          var model ={
            userid : this.userId ,
            day : 4
            }
            // console.log(`model`, model);
            this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard',model).subscribe((data: any) => {
            if(data.Success){
              this.dataSource4 = data.Data
              // console.log('datasource4', this.dataSource4)
                if(this.dataSource4.length>0){
                    this.TimesheetDate4= moment(data.Data[0].date).format("DD-MM-YYYY")
                    for(var i=0 ; i < this.dataSource4.length ; i++ ){
                      this.Totalmin3 = (this.Totalmin3 + data.Data[i].timeinminutes)
                      this.Totalhrs3 =  this.Totalhrs3 + data.Data[i].timeinhours 
                    }
                    if(this.Totalmin3 >= 60){
                      this.Totalmin3 = this.Totalmin3/60
                    }
                    else{
                      this.Totalmin3= this.Totalmin3/100
                    }
                    this.totaltimehr3  =  this.Totalhrs3 + this.Totalmin3
                }
          }
          })

          var model ={
            userid : this.userId ,
            day : 5
            }
            // console.log(`model`, model);
            this.rest.postParams(this.Global.getapiendpoint() + '/timesheet/GetTimesheetDashboard',model).subscribe((data: any) => {
            if(data.Success){
              this.dataSource5 = data.Data
                if(this.dataSource5.length > 0){
                    this.TimesheetDate5= moment(data.Data[0].date).format("DD-MM-YYYY")
                    for(var i=0 ; i < this.dataSource5.length ; i++ ){
                      this.Totalmin4 = (this.Totalmin4 + data.Data[i].timeinminutes)
                      this.Totalhrs4 =  this.Totalhrs4+ data.Data[i].timeinhours 
                    }
                    if(this.Totalmin4>= 60){
                      this.Totalmin4 = this.Totalmin4/60
                    }
                    else{
                      this.Totalmin4= this.Totalmin4/100
                    }
                    this.totaltimehr4  =  this.Totalhrs4 + this.Totalmin4
                }
            }
          })
  }

}
