import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  userLoggedIn: any;
  userRole: any;
  userid: any;
  userEmail:any
  names:any
  UserFullName: any;

  constructor(private classToggler: ClassToggleService ,private router:Router,private route: ActivatedRoute) {
    super();
    this.userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')!);
    this.userid = this.userLoggedIn.id;
    this.userEmail = this.userLoggedIn.emailid;
    this.names =this.userLoggedIn.name;
    this.UserFullName = this.userLoggedIn.userfullname
  }

  logout(){
    localStorage.clear()
    // debugger;
    this.router.navigateByUrl('login')
  }
}
