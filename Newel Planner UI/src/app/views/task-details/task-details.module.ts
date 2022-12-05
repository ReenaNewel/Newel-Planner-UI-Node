import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details.component';
import { TableModule } from 'primeng/table';
import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { CardModule, GridModule } from '@coreui/angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';


// prime-ng
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [
    CommonModule,
    TaskDetailsRoutingModule,
    CommonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
    GridModule,
    WidgetsModule,
    CardModule,
    HttpClientModule,
    InputNumberModule,
    TableModule,
    ScrollPanelModule
  ]
})
export class TaskDetailsModule { }
