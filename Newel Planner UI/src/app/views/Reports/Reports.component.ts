import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/Service/apiservice.service';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';

import * as moment from 'moment';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

import * as FileSaver from 'file-saver';





@Component({
    selector: 'app-Reports',
    templateUrl: './Reports.component.html',
    styleUrls: ['./Reports.component.scss'],
    providers: [MessageService]
})

export class ReportsComponent implements OnInit {
    userLoggedIn: any;
    userid: any;
    RADetails: any;
    ReportTypeMasterDetails: any;
    ReportForm!: FormGroup;
    ReportValue: any;
    ReportTypeTimeSheetDetails: any
    getallprojectdatareport: any
    cols: any[];
    gridLists: any;
    LeaveData: boolean = false;
    TimeSheetData: boolean = false;
    ProjectData: boolean = false;
    today: Date;
    todate: Date;



    constructor
        (private formBuilder: FormBuilder, private router: Router,
            private rest: RestService, private Global: Global,
            private ApiService: ApiserviceService,
            private messageService: MessageService,
        ) {

        this.createForm();

    }
    private createForm() {
        this.ReportForm = this.formBuilder.group({

            ReportType: [''],
            fromdate: [''],
            todate: ['']
        });
    }

    ngOnInit(): void {
        this.getAllReportType()
        // this.getTimesheetreportdata()
        this.today = new Date()
        this.todate = new Date()
    }
   
    date2: any;
    date1: any;
    datecount: any;
    leavecount() {



        console.log("Datets1",);
        this.date1 = moment(this.ReportForm.value.fromdate).format('YYYY-MM-DD'),
            this.date2 = moment(this.ReportForm.value.todate).format('YYYY-MM-DD'),
            console.log("Datets", this.date1);
        console.log("Datets1", this.date2);

    }

    getAllReportType() {
        this.rest.getAll(this.Global.getapiendpoint() + '/Reports/GetAllReportsType').subscribe((data: any) => {
            this.ReportTypeMasterDetails = data.Data;
            console.log('ReportType', this.ReportTypeMasterDetails)
        })
    }


    ShowReportsDetails(event: any) {
        this.ReportValue = event;
        console.log("Reports", this.ReportValue);


    }
    ExporttoExcelReport() {
        if (this.ReportTypeTimeSheetDetails != null) {
            import("xlsx").then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(this.ReportTypeTimeSheetDetails);
                const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
                const excelBuffer: any = xlsx.write(workbook, {
                    bookType: "xlsx",
                    type: "array"
                });
                this.saveAsExcelFile(excelBuffer, "ReportDetails");
            });
        }
        else {

        }


    }
    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }




    GenerateReport() {

        
        if (this.ReportValue == 1) {

            this.cols = [
               // { field: 'balanceleave', header: 'Balance leave' },
                { field: 'username', header: 'Employee Name' },
                { field: 'fromdate', header: 'From Date' },
                { field: 'todate', header: 'To Date' },
                { field: 'leave_type', header: 'Leave Type' },
                // { field: 'created_dt', header: 'Created Date' },
                { field: 'approvedby', header: 'Approved By' },
                // { field: 'leave_name', header: 'Leave Name' },
                // { field: 'id', header: 'Id' },
                // { field: 'created_by', header: 'Created By' },
                { field: 'created_date', header: 'Created Date' },
                { field: 'status', header: 'Status' },
                { field: 'description', header: 'Description' },
               
            ]

            this.getAllLeavedetails();
        }
        else if (this.ReportValue == 2) {
            this.cols = [
                { field: 'timesheetdate', header: 'Timesheet Date' },
                { field: 'username', header: 'Employee Name' },
                { field: 'projectname', header: 'Project name' },
                { field: 'taskname', header: 'Task name' },
                { field: 'activity', header: 'Activity' },
                { field: 'description', header: 'Description' },
                { field: 'timespend', header: 'Time spend' },
                { field: 'timesheetcreateddate', header: 'Timesheet Submitted Date' },
               
            ]

            this.getTimesheetreportdata();

        }
        else if (this.ReportValue == 3) {

            this.cols = [
               
                { field: 'projectname', header: 'Project name' },
                { field: 'user_name', header: 'Employee name' },
                { field: 'clientname', header: 'Client name' },
                { field: 'projectstartdate', header: 'Project start date' },
                { field: 'projectenddate', header: 'Project end date' },
                { field: 'efforts', header: 'Efforts' },
                { field: 'activity', header: 'Activity' },
                { field: 'projectowner', header: 'Project owner' },
                { field: 'projectlead', header: 'Project lead' },
                { field: 'projectplatform', header: 'Project platform' },
                { field: 'projectstatus', header: 'Project status' },
                { field: 'remarks', header: 'Remarks' },


            ]
            this.getAllProjectDetails();
        }
        else {

        }
    }
    getTimesheetreportdata() {
        var model = {
            Reporttype: this.ReportValue,
            fromdate: moment(this.ReportForm.value.fromdate).format('YYYY-MM-DD'),
            todate: moment(this.ReportForm.value.todate).format('YYYY-MM-DD')
        }

        this.rest.postParams(this.Global.getapiendpoint() + '/Reports/GetTimesheetReportTypeData', model).subscribe((data: any) => {
            this.ReportTypeTimeSheetDetails = data.Data;
            console.log('ReportTimesheetType', this.ReportTypeTimeSheetDetails)
        })
    }
    getAllProjectDetails() {
        var model = {
            Reporttype: this.ReportValue,
            fromdate: moment(this.ReportForm.value.fromdate).format('YYYY-MM-DD'),
            todate: moment(this.ReportForm.value.todate).format('YYYY-MM-DD')
        }

        this.rest.postParams(this.Global.getapiendpoint() + '/Reports/getAllProjectData', model).subscribe((data: any) => {
            this.ReportTypeTimeSheetDetails = data.Data;
            console.log('ReportprojectdetilasType', this.ReportTypeTimeSheetDetails)
        })
    }

    getAllLeavedetails() {
        var model = {
            Reporttype: this.ReportValue,
            fromdate: moment(this.ReportForm.value.fromdate).format('YYYY-MM-DD'),
            todate: moment(this.ReportForm.value.todate).format('YYYY-MM-DD')
        }

        this.rest.postParams(this.Global.getapiendpoint() + '/Reports/getAllLeaveData', model).subscribe((data: any) => {
            this.ReportTypeTimeSheetDetails = data.Data;
            console.log('ReportLeavedetilasType', this.ReportTypeTimeSheetDetails)
        })
    }


}