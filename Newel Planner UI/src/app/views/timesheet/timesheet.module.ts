import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet.routing.modules';
import { ReuseComponentsModule } from '../reuse-components/reuse-components.module';
import { TimesheetComponent } from './timesheet.component';
import { CardModule, GridModule } from '@coreui/angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';


//prime-ng
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [TimesheetComponent],
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    TimesheetRoutingModule,
    ReuseComponentsModule,
    GridModule,
    WidgetsModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    InputNumberModule,
    FileUploadModule,
    HttpClientModule,
  ]
})
export class TimesheetModule { }
