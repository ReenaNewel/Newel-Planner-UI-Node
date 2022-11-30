import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-master',
  templateUrl: './activity-master.component.html',
  styleUrls: ['./activity-master.component.css']
})
export class ActivityMasterComponent implements OnInit {

  ProjectForm !: FormGroup

  // ClientNames = [{ClientId:1 , ClientName : 'Edelweiss'},
  // {ClientId: 2, ClientName : 'ARC Edelweiss'}]

  // ProjectTypes = ['Support','Developement']

  constructor(private fb : FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.ProjectForm = this.fb.group({
      ActName : [''],
      
      PrjActive:['',[Validators.required]]


    })
  }

  submit(){
    if(!this.ProjectForm.valid){
      return
    }
  }

 
  Cancel(){
    // this.ProjectForm.reset()
    this.router.navigate(['PlannerDashboard'])
   }
}


