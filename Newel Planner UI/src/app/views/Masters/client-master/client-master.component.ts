import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.css']
})
export class ClientMasterComponent implements OnInit {

  ProjectForm !: FormGroup

  ClientNames = [{ClientId:1 , ClientName : 'Edelweiss'},
  {ClientId: 2, ClientName : 'ARC Edelweiss'}]

  ProjectTypes = ['Support','Developement']
  
  
 
  constructor(private fb : FormBuilder , private router: Router) { }

  ngOnInit(): void {
    this.ProjectForm = this.fb.group({
      PrjName : [''],
      ClientName :[''],
      PrjActive:['',[Validators.required]]


    })

  }
  submit(){
    if(!this.ProjectForm.valid){
      return
    }
  }

  GetAllClient(){

  }

  GetAllProjectType(){

  }

  Cancel(){
   // this.ProjectForm.reset()
   this.router.navigate(['PlannerDashboard'])
  }
}



