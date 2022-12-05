import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { FullCalendarModule } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import interactionPlugin from '@fullcalendar/interaction';

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   timeGridPlugin,
//   listPlugin,
//   interactionPlugin
// ])

import {
  AvatarModule,
  ButtonGroupModule,
  // ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '../widgets/widgets.module';
import { ReuseComponentsModule } from '../reuse-components/reuse-components.module';

import { AccordionModule, SharedModule } from '@coreui/angular';

//prime-ng
import {TabViewModule} from 'primeng/tabview';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { TimesheetDashboardComponent } from './components/timesheet-dashboard/timesheet-dashboard.component';
import { TableModule } from 'primeng/table';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    DashboardRoutingModule,
    FormsModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    FormModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    WidgetsModule,
    ReuseComponentsModule,
    AccordionModule,
    SharedModule,
    DropdownModule,
    TabViewModule,
    ScrollPanelModule,
    TableModule
    // FullCalendarModule,
    // BrowserModule

  ],
  declarations: [DashboardComponent, TimesheetDashboardComponent]
})
export class DashboardModule {
}
