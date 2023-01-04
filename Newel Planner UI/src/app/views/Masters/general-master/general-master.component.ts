import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatPaginator } from '@angular/material/paginator';
import { Global } from 'src/app/common/global';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
import { RestService } from 'src/app/services/rest.service';
import { CommonModule } from '@angular/common';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-general-master',
  templateUrl: './general-master.component.html',
  styleUrls: ['./general-master.component.css'],
  providers: [MessageService]
})
export class GeneralMasterComponent implements OnInit {
  GeneralMasterForm!: FormGroup;

  @ViewChild('GeneralmasterForm', { static: true }) GeneralmasterForm!: any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['Id', 'Group Name', 'Name', 'Type Id', 'Seq Order', 'Parent Id', 'Action'];


  isCreate: boolean = false;

  isViewable: boolean = false;
  dataSource: any;
  selectedGrpName:any;
  getGroupName=[];
  tableData:any = [];
  result:any = [];
  EditIDForUpdate:any;
  Edit_Group_Name:any;
  Edit_Parent_id:any;
  Edit_Type_id:any;
  Edit_Name:any;
  ViewData: any;
  wareid = [];
  id=[];
grpId =[];

///komal
generalDialog : boolean;
showSaveBtn : boolean;
showReadOnly : boolean;
SelectedProjectNames: any[];
loginid: any
userLoggedIn: any
userid: any
isdisabled:any

selectedItemGroupName: any;
  // result = result;
  generalUpdate ={
    GrpName: "",
    Name:"",
    typeId:""
    // SeqOrder: "",
    // ParantId: "",
  };
  ParantId: any;
  editflag: boolean;


  constructor(
    // private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private formBuilder: FormBuilder, 
    private rest :RestService,private global:Global ,
    private router : Router,
    private messageService: MessageService) {}

  ngOnInit(): void {
    
    
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
   
    this.showformdetails()
    this.ShowDetails()
    this.getGrpNameDetails()
   
    
  }

 

  // get GrpName() { return this.GeneralmasterForm.get('GrpName'); }
  // get Name() { return this.GeneralmasterForm.get('Name'); }
  // get typeId() { return this.GeneralmasterForm.get('typeId'); }

getGroupId=[];
getGrpNameDetails(){
  this.rest.getAll(this.global.getapiendpoint() + "/getGroupName").subscribe((data: any) => {
    console.log("Group name:",data);
    this.getGroupId = data.Data;
    console.log("batch name", this.getGroupId);
  });
}

OnChangeGroupNameDetails(event: any){
  console.log("this.ParantId?.setValue",  this.ParantId?.setValue(event));
  this.ParantId?.setValue(event);
  this.GetwarehouseDetails(event);
  this.GeneralmasterForm.controls['ParantId']?.setValue(null);
}

GetwarehouseDetails(event: any) {
    let GrpName = event.GrpName;
    console.log("event GrpName",GrpName);

    this.rest.getAll(this.global.getapiendpoint() + "/getGroupName").subscribe((data: any) => { 
    this.wareid = data.Data;
    console.log("wareid",this.wareid);  
  });

}
grpnameDetails:any;
idflag:any;
grpprentId:any;
getParentId(event:any)
{
  console.log("event group name",event);
  
  console.log("event calling",event.value);
  this.grpnameDetails = event.value;
  this.rest.getAll(this.global.getapiendpoint() + "/GeneralTableGetGroupName/"+event.value ).subscribe((data: any) => { 
    console.log("data.Data.rows[0]",data.Data.rows[0]);    
    this.grpId =data.Data.rows[0].parentid ;
    
    });
}





UpdateGeneralMstDetails(){
  // console.log(this.GeneralmasterForm,"this.GeneralmasterForm");
  
  let model = {
    // groupname: this.GeneralmasterForm.controls['GrpName'].value,    
    name:  this.GeneralMasterForm.controls['Name'].value,
    typeid: this.Edit_Type_id,      
    // id:this.GeneralmasterForm.controls['id'].value,    
    parentid :this.Edit_parentID,
  }
    console.log("model",model);

  this.rest.postParams(this.global.getapiendpoint() + '/Updategeneraltable',model).subscribe((data: any) => {
    if (data.Success) {
      this.messageService.add({severity: 'success',summary: 'Success',detail: 'Add New Resource Successfully',
      });
      this.Cancel_form();
      // this.idflag = 0
      this.GeneralMasterForm.reset();
    } else {
      this.messageService.add({severity:'warn',summary: 'warn',detail: 'Record not saved',
      });
    }
   
  });
}
Cancel(){
  this.router.navigate(['Planner/PlannerDashboard'])
 }

 showCreateNewProjectDialog() {
  this.GeneralMasterForm.reset()
  this.isdisabled = false
  this.generalDialog = true;
  this.showSaveBtn = true;
}
Edit_name:any;
Edit_parentID:any;

editGeneral(row:any){
// console.log("row", row);
this.isdisabled = true
this.generalDialog = true;
this.showSaveBtn = false;

this.Edit_Group_Name=row.groupname;
this.Edit_name =row.name;
this.Edit_parentID =row.parentid;
this.Edit_Type_id =row.typeid;
this.GeneralMasterForm = this.fb.group({
  GrpName: [this.Edit_Group_Name],
  Name:[this.Edit_name],
  ParantId: [this.Edit_parentID],
 
})
}
showformdetails() {
  // this.ProjectForm.reset()
  this.GeneralMasterForm = this.fb.group({
     GrpName: ['', Validators.required],
     Name:['', Validators.required],
     typeId:[''],
     id:[''],
     SeqOrder: [''],
     ParantId: [''],
     PrjActive:[''],
     PrjInActive:['']
   

  })
}
Cancel_form(){
  this.ShowDetails();
  this.generalDialog= false;

}
submit(){

}
ShowDetails() {
  // console.log(this.Global.getapiendpoint() + '/api/Project/GetAllProjects')
  this.rest.getAll(this.global.getapiendpoint() + "/general").subscribe((data: any) => {
    console.log("GeneralTable Details",data.Data );
    if (data.Success) {
      this.SelectedProjectNames = data.Data
    }
    // console.log('project data', this.SelectedProjectNames)
  })
}

SaveGeneralMstDetails(){

   console.log("this.GeneralMasterForm",this.GeneralMasterForm);
  

  let model = {
    groupname:  this.grpnameDetails,
    name: this.GeneralMasterForm.controls['Name'].value,
    // typeid: this.GeneralMasterForm.controls['typeId'].value,
    // SeqOrder:this.GeneralMasterForm.controls['SeqOrder'].value,
    parentid : this.grpId,
    isactive:true,
    // flag:this.idflag
  } 

  console.log("model",model);
  

  this.rest.postParams(this.global.getapiendpoint() + '/General/CreateGeneralMst',model).subscribe((data: any) => {
    // console.log("data",data);
   
    if (data.Success) {
      this.messageService.add({severity: 'success',summary: 'Success',detail: 'Add New Resource Successfully',
      });
      this.Cancel_form();
      // this.idflag = 0
      this.GeneralMasterForm.reset();
    } else {
      this.messageService.add({severity: 'warn',summary: 'warning',detail: 'Record not saved',
      });
    }
  
  });

}


}
