import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
  AvatarModule,
  ButtonGroupModule,
  // ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  // TableModule,
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
    ScrollPanelModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
