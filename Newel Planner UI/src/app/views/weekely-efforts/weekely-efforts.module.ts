import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule, GridModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';

import { WeekelyEffortsComponent } from './weekely-efforts.component';
import { WeekelyEffortsRoutingModule } from './weekely-efforts.routing.module';
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
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [WeekelyEffortsComponent],
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
    WeekelyEffortsRoutingModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ConfirmDialogModule
  ]
})
export class WeekelyEffortsModule { }
