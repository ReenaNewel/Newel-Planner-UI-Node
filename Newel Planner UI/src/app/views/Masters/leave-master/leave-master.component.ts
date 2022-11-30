import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrls: ['./leave-master.component.css']
})
export class LeaveMasterComponent implements OnInit {
  ProjectForm !: FormGroup
  StatusNames = [{ClientId:1 , ClientName : 'Pending'},
  {ClientId: 2, ClientName : 'Approval'}]

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.ProjectForm = this.fb.group({
      LeaveType : [''],
      Status :[''],
      PrjType:[''],
      PrjStatus:[''],
      PrjActive:['',[Validators.required]]


    })

  }

  submit(){
    if(!this.ProjectForm.valid){
      return
    }
  }

  GetAllStatus(){

  }

  GetAllProjectType(){

  }

}
