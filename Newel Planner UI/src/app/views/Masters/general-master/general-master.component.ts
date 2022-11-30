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
@Component({
  selector: 'app-general-master',
  templateUrl: './general-master.component.html',
  styleUrls: ['./general-master.component.css'],
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
selectedItemGroupName: any;
  // result = result;
  generalUpdate ={
    GrpName: "",
    Name:"",
    typeId:""
    // SeqOrder: "",
    // ParantId: "",
  };


  constructor(
    // private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder, 
    private rest :RestService,private global:Global ,private router : Router) {}

  ngOnInit(): void {
    
    this.GeneralmasterForm = this.formBuilder.group({
      GrpName: ['', Validators.required],
      Name:['', Validators.required],
      typeId:[''],
      id:[''],
      SeqOrder: [''],
      ParantId: [''],
    });
    // this.isViewList = true;
    this.getTableDetails();
    this.getGrpNameDetails();
    this.isCreate =true;
    this.isViewable = false
  }

  get GrpName() { return this.GeneralmasterForm.get('GrpName'); }
  get Name() { return this.GeneralmasterForm.get('Name'); }
  get typeId() { return this.GeneralmasterForm.get('typeId'); }
  get SeqOrder() { return this.GeneralmasterForm.get('SeqOrder'); }
  get ParantId() { return this.GeneralmasterForm.get('ParantId'); }

  openSnackBarSuccess(message: any) {
    // this._snackBar.open(message, 'Close', {
    //   duration: 3000,
    //   verticalPosition: 'bottom',
    //   horizontalPosition: 'right',
    //   panelClass: ["success"]
    // });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
/************GET TABLE DETAILS************/
  getTableDetails() {   
    this.rest.getAll(this.global.getapiendpoint() + "/general").subscribe((data: any) => {
    console.log("GeneralTable Details",data.Data );
      if (data.Success) {      
      // console.log("GeneralTable Details",data);
        // this.dataSource = new MatTableDataSource(data.Data);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      }

    });

  }

  submit(){

  }
 
  OnBack(){
    this.GeneralmasterForm.reset();
  }

  OnBackToCreate(){
    this.isCreate=true;
    this.isViewable=false;
    this.GeneralmasterForm.reset();
  }


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
getParentId(event:any)
{
  console.log("event calling",event);
  this.rest.getAll(this.global.getapiendpoint() + "/GeneralTableGetGroupName/"+  event.groupname  ).subscribe((data: any) => { 
    this.grpId =data.Data.rows[0].parentid ;
    // console.log("grpId",this.grpId ==0?null);
    // let getprentid = this.grpId ==0?null: this.grpId;
    // console.log("getprentid", getprentid);
    });
}

onSave(){
  let model = {
    groupname: this.GeneralmasterForm.controls['GrpName'].value.groupname,
    name: this.Name?.value,
    typeid: this.typeId?.value,
    SeqOrder:this.GeneralmasterForm.controls['SeqOrder'].value,
    parentid : this.grpId,
    isactive:'true'
  }

  this.rest.postParams(this.global.getapiendpoint()+ "/CreategeneralMaster", model).subscribe((data: any) => {
      console.log("data",data);
      this.getTableDetails();
      this.openSnackBarSuccess('Record Created successfully ')  
      this.isCreate=true;
  })
}

onEditById(id:any): void {
  console.log(id);
  
  this.isViewable = true;
  this.isCreate = false;

  this.rest.getAll(this.global.getapiendpoint() + '/GeneralTableGetId/' + id).subscribe((data: any) => {
   //console.log("getdataFromId",data.Data.rows);
    this.Edit_Group_Name =data.Data.rows[0].groupname;
    this.Edit_Name =data.Data.rows[0].name;
    this.Edit_Parent_id=data.Data.rows[0].parentid;
    this.Edit_Type_id = data.Data.rows[0].typeid;
})
}

onUpdate(){
  // console.log(this.GeneralmasterForm,"this.GeneralmasterForm");
  
  let model = {
    // groupname: this.GeneralmasterForm.controls['GrpName'].value,    
    name: this.GeneralmasterForm.controls['Name'].value,
    typeid: this.Edit_Type_id,      
    // id:this.GeneralmasterForm.controls['id'].value,    
    parentid : this.Edit_Parent_id,
  }

  this.rest.postParams(this.global.getapiendpoint() + '/Updategeneraltable',model).subscribe((data: any) => {
    // console.log("data",data);
    this.isCreate = true;
    this.isViewable=false;
    this.GeneralmasterForm.reset();
    this.openSnackBarSuccess('Record Updated Successfully');
    this.getTableDetails();
  });
}
Cancel(){
  this.router.navigate(['Planner/PlannerDashboard'])
 }
}
