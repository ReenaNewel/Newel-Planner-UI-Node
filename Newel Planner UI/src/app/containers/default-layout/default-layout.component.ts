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


  // public navItems = navItems;
  navItems=[] ;
  NewMenu = []
  SubmenuItem = []
  userLoggedIn: any
  userid: any
  defaultRoleId: any
  menuItem = []

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
    var menuData = JSON.parse(localStorage.getItem('menuItems')!);
    
    var SubmenuData = JSON.parse(localStorage.getItem('SubmenuItems')!);

    this.SubmenuItem = SubmenuData
    this.menuItem = menuData

    console.log('menudata ::', this.menuItem )
    console.log('Submenudata ::',  this.SubmenuItem  )

    
    // console.log('menudata ::', this.menuItem )

    for(var i=0 ; i<this.menuItem.length; i++)
    {
      var NewSubMenu=[]
      // console.log('new sub menu ',NewSubMenu)
      
      if(this.menuItem[i].ischild==1){

       
            for(var j=0 ; j<this.SubmenuItem.length; j++){
              if(this.SubmenuItem[j].parentid==this.menuItem[i].id){
                  NewSubMenu.push({name:this.SubmenuItem[j].name,url:this.SubmenuItem[j].url})
              }
            }
      
        // console.log('new sub menu ',NewSubMenu)
        this.NewMenu.push({name:this.menuItem[i].name, url:this.menuItem[i].url,children:NewSubMenu} )
           
      }
      else
      {
        this.NewMenu.push({name:this.menuItem[i].name, url:this.menuItem[i].url})
      }
          //  console.log('new sub menu ',NewSubMenu)
          //  this.NewMenu.push({name:this.menuItem[i].name, url:this.menuItem[i].url,children:NewSubMenu} )
          //  this.navItems = this.menuItem[i]
          //  console.log('menus  to display nav',  this.NewMenu)

       
        // for(var j=0 ; j<this.menuItem.length; j++){
        //   console.log(this.menuItem[i].id,this.menuItem[j].parentid )
        //   if(this.menuItem[i].id==this.menuItem[j].parentid  && this.menuItem[j].ischild==0 && this.menuItem[j].isactive == 1){
        //     this.NewMenu.push(this.menuItem[j])
        //        console.log('SUbMenus  to display :',this.menuItem[j])
             
        //     }
        // }
      
      }
      // if(this.menuItem[i].ischild==0 && this.menuItem[i].add==1 && this.menuItem[i].edit == 1 && this.menuItem[i].view == 1){
      //   if(this.menuItem[i].parentid==0 && this.menuItem[i].isactive==1)
      //   {

      //      console.log('menus  to display child 0 and parentid 0:',this.menuItem[i])
         
      //   }

      // }
      // for(var j=0 ; j<this.menuItem.length; j++){
      //   console.log(this.menuItem[i].id,this.menuItem[j].parentid )
      //   if(this.menuItem[i].id==this.menuItem[j].parentid  && this.menuItem[j].ischild==0 && this.menuItem[j].isactive == 1){
      //     this.NewMenu.push(this.menuItem[j])
      //        console.log('SUbMenus  to display :',this.menuItem[j])
           
      //     }
      // }
            
    
    this.navItems=this.NewMenu
    console.log('navitems', this.navItems)
  }

  ShowMenuDetails() {
    var model = {
      Id: this.defaultRoleId
    }
    this.rest.getById(this.Global.getapiendpoint() + '/Menu/GetPrimeMenubyRoleId/', this.defaultRoleId).subscribe((data: any) => {
      if (data.Success) {
        this.navItems = data.Data
        console.log('this.navitems', this.navItems)
        // console.log('iconComponent', this.navItems[0])

        //  console.log(test.replace(/\"/g, ""));  

      }
    })

  }


}
