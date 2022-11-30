import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import * as moment from 'moment';


@Component({
  selector: 'app-holiday-master',
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.css']
})
export class HolidayMasterComponent implements OnInit {

  ProjectForm !: FormGroup
  dataSource:any
  
  IsCreate: boolean = true;

  isViewList: boolean = false;
  IsEditable: boolean = true ;
  Holidays : any
  holiday_id : any
  HolidayName : any
  Days :any
  
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['Sr.No','HolidayId','HolidayName','HolidayDate','HolidayDesc','Status','Action'];

  constructor(private fb : FormBuilder ,private router: Router,  
    private rest :RestService , private Global : Global ,
    // private _snackBar: MatSnackBar  ,
    private ApiService:ApiserviceService) { }

  ngOnInit(): void {
 
  this.IsCreate = false
  this.isViewList = true
  this.IsEditable = false
  this.showformdetails()
  this.ShowDetails()
  }
 
  showformdetails(){
    this.ProjectForm = this.fb.group({
      HolidayName : ['',[Validators.required]],
      PrjActive:['',[Validators.required]],
      startDate :['',[Validators.required]],
      HolidayDesc:['',[Validators.required]],

    })

  }

  submit(){
    if(!this.ProjectForm.valid){
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

  Cancel_form(){
    this.IsCreate = false
    this.isViewList = true
    this.IsEditable = false  
    this.ShowDetails()
   }

   Cancel(){
    this.router.navigate(['Planner/PlannerDashboard'])
   }
   changeholidayId(value:any){
    this.holiday_id = value
    console.log('holiday_id',this.holiday_id)
   }
   ShowDetails(){
    console.log(this.isViewList)
    console.log(this.IsCreate)
    
    this.rest.getAll(this.Global.getapiendpoint() + '/holiday').subscribe((data: any) => {
        // this.dataSource = new MatTableDataSource(data.Data);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;  
      })
  }
  saveHolidays(){
    var model = {
      holiday_id : this.holiday_id,
      holiday_date : moment(this.ProjectForm.controls['startDate'].value).format('YYYY-MM-DD'),
      isactive : this.ProjectForm.controls['PrjActive'].value ,
      description : this.ProjectForm.controls['HolidayDesc'].value
      // description :  this.HolidayName 
    }
    console.log('model',model)
    this.rest.postParams(this.Global.getapiendpoint() + '/newholiday',model).subscribe((data: any) => {
        
     if(data.Success){
      this.openSnackBarSuccess("Record Added Successfully")
     }
    //  this.isViewList=true

    })
  }
  showform(){
    // debugger;
    console.log('hi')
    this.IsCreate = true

    this.isViewList = false
    this.IsEditable = false
    this.ProjectForm.reset();

    this.rest.getAll(this.Global.getapiendpoint() + '/allholiday').subscribe((data: any) => {
         this.Holidays = data.Data
        })
  }
  editholidays(row:any){
    // console.log(row.holiday_date,row.typeid,row.isactive)
     this.IsCreate = false;
     this.isViewList = false;
     this.IsEditable = true
     

     this.ProjectForm = this.fb.group({
      HolidayName : [row.name],
      PrjActive: [row.isactive],
      startDate :[row.holiday_date],
      holidayId:[row.typeid],
      HolidayDesc:[row.description],
      
      // endDate:['',[Validators.required]]
    })
  }
  
  UpdateHolidays(){
    console.log('date : ' ,moment(this.ProjectForm.controls['startDate'].value).format('YYYY-MM-DD'))

    let model = {
      description: this.ProjectForm.controls['HolidayDesc'].value,
      holiday_date: moment(this.ProjectForm.controls['startDate'].value).format('YYYY-MM-DD'),
      isactive: this.ProjectForm.controls['PrjActive'].value,
      holiday_id: this.ProjectForm.controls['holidayId'].value,
   
    }
    console.log('model data : ',model)

    this.ApiService.UpdateHolidayData(model).subscribe((data)=>{
      console.log(data.Message)
      this.openSnackBarSuccess(JSON.stringify(data.Message))
     
    })
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
