import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global'
import * as moment from 'moment';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {


  public navItems = navItems;
  // navItems: any;
  userLoggedIn: any
  userid: any
  defaultRoleId: any
  // displayName:any


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private router: Router,
    private rest: RestService,
    private Global: Global, private ApiService: ApiserviceService) { }

  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.defaultRoleId = this.userLoggedIn.defaultroleid;
    // this.ShowMenuDetails()


  }

  ShowMenuDetails() {
    var model = {
      Id: this.defaultRoleId
    }
    this.rest.getById(this.Global.getapiendpoint() + '/Menu/GetPrimeMenubyRoleId/', this.defaultRoleId).subscribe((data: any) => {
      if (data.Success) {
        this.navItems = data.Data
        // console.log('navitems', this.navItems)
        // console.log('iconComponent', this.navItems[0])

        //  console.log(test.replace(/\"/g, ""));  

      }
    })

  }


}
