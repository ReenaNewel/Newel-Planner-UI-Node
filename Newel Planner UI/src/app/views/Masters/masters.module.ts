import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MastersRoutingModule } from './masters-routing.module';
import { ActivityMasterComponent } from './activity-master/activity-master.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { GeneralMasterComponent } from './general-master/general-master.component';
import { HolidayMasterComponent } from './holiday-master/holiday-master.component';
import { LeaveMasterComponent } from './leave-master/leave-master.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { UsermasterComponent } from './usermaster/usermaster.component';

import { CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

// prime-ng
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    ActivityMasterComponent,
    ClientMasterComponent,
    GeneralMasterComponent,
    HolidayMasterComponent,
    LeaveMasterComponent,
    ProjectMasterComponent,
    UsermasterComponent,
  ],
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    MastersRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
    TableModule,
  ]
})
export class MastersModule {
}
