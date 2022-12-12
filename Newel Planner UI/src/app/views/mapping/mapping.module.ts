import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingRoutingModule } from './mapping-routing.module';
import { ProjectRoleMappingComponent } from './project-role-mapping/project-role-mapping.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule, GridModule } from '@coreui/angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';


// prime-ng

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { RaMappingMasterComponent } from './ra-mapping-master/ra-mapping-master.component';

@NgModule({
  declarations: [
    ProjectRoleMappingComponent,
    RaMappingMasterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MappingRoutingModule,
    ToastModule,
    ReactiveFormsModule,
    ToolbarModule,
    CardModule,
    GridModule,
    WidgetsModule,
    HttpClientModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,
    TableModule,
    MultiSelectModule
  ]
})
export class MappingModule { }
