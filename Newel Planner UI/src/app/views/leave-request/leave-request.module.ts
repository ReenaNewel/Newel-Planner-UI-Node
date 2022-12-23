import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NewTaskComponent } from './new-task.component';

import { LeaveRequestComponent } from './leave-request.component';
import { LeaveRequestRoutingModule } from './leave-request.routing.module';
//import { NewTaskRoutingModule } from './new-task-routing.module';
import { CardModule, GridModule } from '@coreui/angular';
//import { WidgetsModule } from '../widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';

import {TooltipModule} from 'primeng/tooltip';
// prime-ng
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';



// prime-ng

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  declarations: [LeaveRequestComponent],
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
    LeaveRequestRoutingModule,
    ReactiveFormsModule,
    TooltipModule
  ]
})
export class LeaveRequestModule { }
