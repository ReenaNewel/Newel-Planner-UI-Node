import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, Validators, NgForm } from '@angular/forms';
import { animationFrameScheduler } from 'rxjs';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css']
})
export class UsermasterComponent implements OnInit {

  ProjectForm !: FormGroup

  dataSource: any;
  readData: any;
  us: any;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // @ViewChild(MatSort) sort!: MatSort;

  serchKey: string | undefined;

  displayedColumns1 = ['name', 'id', 'emailid', 'defaultroleid', 'isactive', 'Action'];
  private datasource: any;

  constructor(private service: ApiserviceService, private route: ActivatedRoute, private router: Router,
     private fb: FormBuilder,
    // private _snackBar: MatSnackBar
    ) { }

  errormes: any;
  getparamid: any;
  successmes: any;
  UserData: any


  isCreate: boolean = true;

  isViewable: boolean = false;

  isEditable: boolean = true;

  ngOnInit(): void {

    // this.isCreate = false;
    // console.log(this.isCreate);

    // this.isViewable = true;

    // this.isEditable = false;
    // this.DropDownRole()
    // this.showDetails()
    // this.showFormDetails()




  }

  // showDetails() {
  //   this.service.getAllData().subscribe((res) => {
  //     console.log(res, "res==>");
  //     this.readData = res;
  //     this.dataSource = new MatTableDataSource(this.readData);
  //     console.log('alluers', res);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;

  //   });
  // }
  // showFormDetails() {
  //   this.ProjectForm = this.fb.group({

  //     name: [''],
  //     emailid: [''],
  //     password: [''],
  //     defaultroleid: [],
  //     isactive: [false],
  //   })
  // }
  // getGroupId = [];
  // DropDownRole() {
  //   this.service.getDropdownlist().subscribe((res) => {
  //     console.log(res, "dropdown");
  //     this.UserData = res;

  //   });
  // }

  // EditEmployee(row: any) {
  //   console.log('row values', row);
  //   this.isEditable = true;
  //   this.isCreate = false;
  //   this.isViewable = false;
  //   this.getparamid = row.id;

  //   // if (row.isactive.value)
  //   // {

  //   // }
  //   // console.log('defaultroleid',row.defaultroleid)
  //   this.ProjectForm = this.fb.group({

  //     name: [row.uname],
  //     emailid: [row.emailid],
  //     password: [row.password],
  //     defaultroleid: [row.defaultroleid],
  //     isactive: [row.isactive = 'true']

  //   })
  // }


  // changeemployeeid(value: any) {
  //   console.log('empid =', value);
  // }



  // OnBack() {
  //   this.isCreate = false;

  //   this.isViewable = true;
  //   this.isEditable = false;
  //   this.showDetails()

  // }

  // AddForm() {

  //   console.log('AddFrom');
  //   this.isViewable = false;
  //   this.isCreate = true;
  //   console.log(this.isCreate);
  //   this.ProjectForm.reset();
  // }



  // submit() {
  //   if (this.ProjectForm.valid) {
  //     console.log(this.ProjectForm.value)
  //     this.service.createData(this.ProjectForm.value).subscribe((res) => {

  //       this.openSnackBarSuccess("Record Added Successfully")
  //     })
  //   }
  //   else {
  //     console.log('all fields all requires');
  //   }
  // }
  // Cancel() {
  //   this.router.navigate(['Planner/PlannerDashboard'])
  // }
  // model: any;

  // UpdateUser() {
  //   var model = {

  //     id: this.getparamid,

  //     name: this.ProjectForm.controls['name'].value,

  //     emailid: this.ProjectForm.controls['emailid'].value,

  //     password: this.ProjectForm.controls['password'].value,

  //     defaultroleid: this.ProjectForm.controls['defaultroleid'].value,

  //     isactive: this.ProjectForm.controls['isactive'].value,
  //   }

  //   console.log(this.ProjectForm.value, 'updatedform');
  //   if (this.ProjectForm.valid) {
  //     this.service.UpdateData(model).subscribe((res) => {

  //       this.openSnackBarSuccess("Record updated Successfully")
  //       console.log("updated successfully");
  //     });
  //   } else {
  //     this.errormes = 'all fields are required';
  //   }
  // }

  // GetAllRoles() {

  // }

  // GetAllProjectType() {

  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // openSnackBarSuccess(message: any) {

  //   this._snackBar.open(message, 'Close', {

  //     duration: 3000,

  //     verticalPosition: 'bottom',

  //     horizontalPosition: 'right',

  //     panelClass: ["success"]

  //   });
  // }
}

