import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
// import {MessagesModule} from 'primeng/messages';
// import {MessageModule} from 'primeng/message';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {LeaveRequestModule } from './views/leave-request/leave-request.module';
import { MappingModule } from './views/mapping/mapping.module';
// import{DefaultHeaderModule} from './containers/default-layout/default-header/default-header.module';
import {WeekelyEffortsModule} from './views/weekely-efforts/weekely-efforts.module'
import { PasswordChangeComponent } from './views/masters/password-change/password-change.component';


import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
 
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { TimesheetModule } from './views/timesheet/timesheet.module';
import { ApiserviceService } from './Service/apiservice.service';
import { NewTaskModule } from './views/new-task/new-task.module';
import { ReportsModule } from './views/Reports/Reports.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
    
    declarations: [AppComponent, LoginLayoutComponent, AdminLayoutComponent,PasswordChangeComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    FullCalendarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    FormsModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    TimesheetModule,
    NewTaskModule,
    HttpClientModule,
    // MessagesModule,
    // MessageModule,
    ToastModule,
    InputTextModule,
    LeaveRequestModule,
    MappingModule,
    WeekelyEffortsModule,
    ReportsModule,
    
    
    // DefaultHeaderModule


  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService, ApiserviceService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
