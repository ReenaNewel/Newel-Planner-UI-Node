import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAccordionComponent } from './task-accordion/task-accordion.component';
import { AccordionModule, SharedModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

// prime-ng
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [TaskAccordionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    SharedModule,
    TableModule,
    IconModule,
    ButtonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    TableModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
  ],
  exports: [
    TaskAccordionComponent
  ]
})
export class ReuseComponentsModule { }
