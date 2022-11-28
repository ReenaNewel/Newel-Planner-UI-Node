
import {Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, tap } from 'rxjs/operators';
import { Global } from 'src/app/common/global'

const httpOptions = {
    headers: new HttpHeaders({
        //'Content-Type' : 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient , private Global:Global) { }

  apiUrl = this.Global.getapiendpoint()

  // 'http://localhost:8686/';
  getAllLeaveData(model : any):Observable<any>
  {
      return this._http.post(this.apiUrl+'/getleaveDate',model).pipe(catchError(this.handleError()));;
  }
  getAllProjectData():Observable<any>
  {
      return this._http.get(this.apiUrl+'/getAllProjectData').pipe(catchError(this.handleError()));;
  }
  getAllUSerTimesheetData(model : any):Observable<any>
  {
      return this._http.post(this.apiUrl+'/getAllUserTimesheetData',model).pipe(catchError(this.handleError()));;
  }

  UpdateHolidayData(model : any):Observable<any>
  {
      return this._http.post(this.apiUrl+'/holiday',model).pipe(catchError(this.handleError()));;
  }


  

//get all data
getAllData():Observable<any>
{
    return this._http.get(this.apiUrl+'/users');
}

//for show  dropdown of roles
getDropdownlist():Observable<any>
{
  return this._http.get(this.apiUrl+'/usersByRole');
}
//save data
createData(data:any):Observable<any>
{
  return this._http.post(this.apiUrl+'/users',data);
}
//update data
UpdateData(data:any):Observable<any>
{
  return this._http.post(this.apiUrl+'/updateusers',data);
   
}


  private handleError<T>(operation = 'operation', result?: T){
        return (error: any) : Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
