import {Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Global {

    private apiendpoint: string = 'http://localhost:8686';
    // private apiendpoint: string = 'http://43.204.223.103:1349';


    private apiendpoint_sit: string = '';

    private apiendpoint_uat: string = '';
    
    private apiendpoint_live: string = '';
    
    getapiendpoint (){return this.apiendpoint; }

    getUIObj(path:any){
        var menudata = JSON.parse(localStorage.getItem("menuItems")!);
        
        for(var item = 0; item < menudata.length; item++){
            if(menudata[item].Path === path){
                return menudata[item];
            }
        }
        return null;
    }

    
    
}