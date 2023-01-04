import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import * as moment from 'moment';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';




@Component({
  selector: 'app-holiday-master',
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.css'],
  providers: [MessageService]
})
export class HolidayMasterComponent implements OnInit {

  ProjectForm !: FormGroup
  dataSource:any
  Holidays : any
  holiday_id : any
  HolidayName : any
  Days :any
  
  
  displayedColumns: string[] = ['Sr.No','HolidayId','HolidayName','HolidayDate','HolidayDesc','Status','Action'];
  AllHolidayData: any;
  userLoggedIn: any;
  userid: any;
  projectDialog: boolean;
  showSaveBtn: boolean;

  constructor(private fb : FormBuilder ,private router: Router,  
    private rest :RestService , private Global : Global ,
    // private _snackBar: MatSnackBar  ,
    private messageService: MessageService,
    private ApiService:ApiserviceService) { }
  
  
    IsCreate: boolean = true;
    isViewList: boolean = false;
    IsEditable: boolean = true;
    flag:any;

  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
 
  this.IsCreate = false
  this.isViewList = true
  this.IsEditable = false

  this.showformdetails()
  this.ShowDetails()
  this.showform()
  }
 
  showformdetails(){
    this.ProjectForm = this.fb.group({
      HolidayName : [''],
      PrjActive:['',[Validators.required]],
      startDate :['',[Validators.required]],
      HolidayDesc:['',[Validators.required]],
      //isactive :[false]

    })

  }
  showCreateNewProjectDialog() {
    this.projectDialog = true;
    this.showSaveBtn = true;
    this.flag=1;
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
    this.ProjectForm.reset(); 
    this.ShowDetails()
   }

   Cancel(){
    this.router.navigate(['Planner/PlannerDashboard'])
   }

   changeholidayId(value:any){
    // console.log('values',value.value);
    
    this.holiday_id = value.value;
    // console.log('holiday_id',this.holiday_id)
   }
   ShowDetails(){
    // console.log(this.isViewList)
    // console.log(this.IsCreate)
    
    this.rest.getAll(this.Global.getapiendpoint() + '/holiday').subscribe((data: any) => {
      // console.log('holidayData',this.Global.getapiendpoint() + '/holiday');
       
     
      if (data.Success) {
         this.AllHolidayData = data.Data
        // console.log('AllHolidays', this.AllHolidayData);
      }
    })

    // this.rest.getAll(this.Global.getapiendpoint() + '/Holiday/NewHoliday').subscribe((data: any) => {

    //   if (data.Success) {
    //     this.AllHolidayData = data.Data
    //   }
    //   console.log('Holiday data', this.AllHolidayData)
    // })
  }

  saveHolidays(){
    var model = {
      holiday_id : this.holiday_id,
      holiday_date : moment(this.ProjectForm.controls['startDate'].value).format('YYYY-MM-DD'),
      //name:this.ProjectForm.controls['HolidayName'].value,
      isactive : this.ProjectForm.controls['PrjActive'].value ,
      description : this.ProjectForm.controls['HolidayDesc'].value
      
    }
    // console.log('model',model)
    this.rest.postParams(this.Global.getapiendpoint() + '/newholiday',model).subscribe((data: any) => {
        
     if(data.Success){
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Holiday added successfully' });
      
     }
     else {
      this.messageService.add({ severity: 'warn', summary: 'info', detail: 'Record not saved' });
    }

    })
  }
  showform(){
    // debugger;
    // console.log('hi')
    this.IsCreate = true

    this.isViewList = false
    this.IsEditable = false
    this.ProjectForm.reset();

    this.rest.getAll(this.Global.getapiendpoint() + '/allholiday').subscribe((data: any) => {
         this.Holidays = data.Data
        //  console.log('HolidayNames',this.Holidays);
        })
  }
  editName : any;
  editholidays(row:any){
    // console.log('row values', row);

    this.projectDialog = true;
    this.showSaveBtn = false;

    this.IsCreate = false;
    this.isViewList = false;
    this.IsEditable = true;
     
    this.flag=0;
     

     this.ProjectForm = this.fb.group({
      HolidayName : [row.name],
      PrjActive: [row.isactive='true'],
      //isactive : [row.isactive='true']
      startDate :[new Date (row.holiday_date)],
      holidayId:[row.typeid],
      HolidayDesc:[row.description],
      
      // endDate:['',[Validators.required]]
    })
  }
  
  UpdateHolidays(){
    // console.log('date : ' ,moment(this.ProjectForm.controls['startDate'].value).format('YYYY-MM-DD'))

    let model = {
      description: this.ProjectForm.controls['HolidayDesc'].value,
     // name: this.ProjectForm.controls['HolidayName'].value,
      holiday_date: moment(this.ProjectForm.controls['startDate'].value).format('YYYY-MM-DD'),
      isactive: this.ProjectForm.controls['PrjActive'].value,
      holiday_id: this.ProjectForm.controls['holidayId'].value,
   
    }
    // console.log('model data : ',model)

    this.ApiService.UpdateHolidayData(model).subscribe((data)=>{
      // console.log(data.Message)
      //this.openSnackBarSuccess(JSON.stringify(data.Message))
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: ' Record updated successfully' });
      //this.Cancel_form()
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
