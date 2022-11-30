import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './new-task.component';

import { NewTaskRoutingModule } from './new-task-routing.module';
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

@NgModule({
  declarations: [NewTaskComponent],
  imports: [
    CommonModule,
    NewTaskRoutingModule,
    CommonModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
    GridModule,
    WidgetsModule,
    CardModule,
    HttpClientModule,
    InputNumberModule
  ]
})
export class NewTaskModule { }
