import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskAccordionComponent } from './task-accordion/task-accordion.component';
import { AccordionModule, SharedModule } from '@coreui/angular';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [TaskAccordionComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    SharedModule,
    TableModule
  ],
  exports: [
    TaskAccordionComponent
  ]
})
export class ReuseComponentsModule { }
