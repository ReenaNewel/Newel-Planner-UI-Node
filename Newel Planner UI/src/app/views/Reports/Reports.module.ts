import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule, GridModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
// import { ReportsComponent } from './Reports.component';
// prime-ng
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReportsRoutingModule } from './Reports.routing.module';
import{ReportsComponent} from './Reports.component';
// D:\Reena Newel\NEWEL PLANNER\NEWEL PLANNER PRIMENG_UI\src\app\views\Reports\Reports.module.ts

// 
// prime-ng

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import { MultiSelectModule } from 'primeng/multiselect';
//import { WeekelyEffortsModule } from '../weekely-efforts/weekely-efforts.module';
@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    TableModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ToolbarModule,
    RadioButtonModule,
    GridModule,
  //  WidgetsModule,
    CardModule,
    HttpClientModule,
    InputNumberModule,
 //   WeekelyEffortsModule,
   ReportsRoutingModule,
    ReactiveFormsModule,
    MultiSelectModule
  ]
})
export class ReportsModule { }
