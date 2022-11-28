import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiserviceService } from 'src/app/Service/apiservice.service';


interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeIndex1: number = 0;
  countries: any[];
  member: any[];
  selectedCountry: string;
  selectedMem: string;


  constructor(
    private fb: FormBuilder, private router: Router,
    private rest: RestService, private Global: Global,
    private ApiService: ApiserviceService) {
  }


  ngOnInit(): void {

    this.member = [
      {name: 'Only Me', code: 'AU'},
      {name: 'Team', code: 'BR'}
    ]
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
  ];
  
  }





}
