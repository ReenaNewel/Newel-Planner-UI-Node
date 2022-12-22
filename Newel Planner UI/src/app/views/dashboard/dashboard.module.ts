import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToolbarModule} from 'primeng/toolbar';

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
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { TimesheetDashboardComponent } from './components/timesheet-dashboard/timesheet-dashboard.component';
import { TableModule } from 'primeng/table';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastModule } from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {PrimeIcons,MenuItem} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {TooltipModule} from 'primeng/tooltip';

// import { BrowserModule } from '@angular/platform-browser';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  imports: [
    ToolbarModule,
    DashboardRoutingModule,
    FormsModule,
    FullCalendarModule,
    CardModule,
    NavModule,
    CheckboxModule,
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
    TableModule,
    HttpClientModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    MessageModule,
    MessagesModule,
    InputTextModule,
    ToastModule,
    TooltipModule
    // FullCalendarModule,
    // BrowserModule

  ],
  declarations: [DashboardComponent, TimesheetDashboardComponent]
})
export class DashboardModule {
}
