import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Global } from 'src/app/common/global';
import { RestService } from 'src/app/services/rest.service';
import { IpServiceService } from './IP-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  Login_ExistingUser!: FormGroup;
  ExistingUser: boolean = false;
  NewUser: boolean = false;
  UserOrEmail: any;
  login_type_id: any
  ipAddress: any;

  constructor(
    private formBuilder: FormBuilder,
    private global: Global,
    private rest: RestService,
    private router: Router,
    private ip: IpServiceService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log("ngoninit");

    this.Login_ExistingUser = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.maxLength(10)]]
    });
    this.ExistingUser = true;
  }

  get UserName() { return this.Login_ExistingUser.get('UserName'); }
  get Password() { return this.Login_ExistingUser.get('Password'); }

  IsExistingUser() {
    this.ExistingUser = true;
    this.NewUser = false;
  }

  UserinputHandle() {
    if (this.UserOrEmail.indexOf('@') != -1) {
      this.login_type_id = 2; //EMAIL

    } else {
      this.login_type_id = 1;//username
    }
  }

  openSnackBarError() {
    // console.log("openSnackBarError");

    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter valid username and password' });

    // this._snackBar.open('Please Enter valid username and password', 'Close', {
    //   duration: 3000,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'right',
    //   panelClass: ["error"]
    // });
  }

  IsNewUser() {
    this.NewUser = true;
    this.ExistingUser = false;
    // this.ExistingPartner = false;
  }

  loginUser() {
    var model = {
      UserName: this.UserName?.value,
      Password: this.Password?.value,

    };

    // console.log(this.global.getapiendpoint() + '/AuthenticateUser')
    this.rest.create(this.global.getapiendpoint() + '/AuthenticateUser', model).subscribe((data: any) => {

      // console.log("data:", data);
      // GetPrimeSubMenubyRoleId

      if (data.Success) {
        this.rest.getById(this.global.getapiendpoint() + '/Menu/GetPrimeMenubyRoleId/', data.Data.rows[0].defaultroleid
        ).subscribe((menudata: any) => {
          if (menudata.Success) {
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('userLoggedIn', JSON.stringify(data.Data.rows[0]));
            localStorage.setItem('menuItems', JSON.stringify(menudata.Data));
            
           
            var model1 = {
              defaultroleid:  data.Data.rows[0].defaultroleid,
              parentid:1
            }
    
            this.rest.postParams(this.global.getapiendpoint() + '/Menu/GetPrimeSubMenubyRoleId/', model1).subscribe((Submenudata: any) => {
              if (Submenudata.Success) {
                localStorage.setItem('SubmenuItems', JSON.stringify(Submenudata.Data));
                
              }
    
            })
            setTimeout(() => {
              console.log('sleep'); 
              this.router.navigate(['timesheet']);
            }, 2000)
          }
          // this.router.navigate(['timesheet']);
        });
       
      }
      else {
        this.openSnackBarError();
      }
    });
  }

  CheckAPIFromNode() {

    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;

    });
  }

}
