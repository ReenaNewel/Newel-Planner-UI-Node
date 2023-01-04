import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityMasterComponent } from './activity-master/activity-master.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { GeneralMasterComponent } from './general-master/general-master.component';
import { HolidayMasterComponent } from './holiday-master/holiday-master.component';
import { LeaveMasterComponent } from './leave-master/leave-master.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import {PasswordChangeComponent} from './password-change/password-change.component';
const routes: Routes = [
  {
    path: 'activity',
    component: ActivityMasterComponent,
    data: {
      title: 'Activity'
    }
  },
  {
    path: 'client',
    component: ClientMasterComponent,
    data: {
      title: 'Client'
    }
  },
  {
    path: 'general',
    component: GeneralMasterComponent,
    data: {
      title: 'General'
    }
  },
  {
    path: 'holiday',
    component: HolidayMasterComponent,
    data: {
      title: 'Holiday'
    }
  },
  {
    path: 'leave',
    component: LeaveMasterComponent,
    data: {
      title: 'Leave'
    }
  },
  {
    path: 'project',
    component: ProjectMasterComponent,
    data: {
      title: 'Project'
    }
  },
  {
    path: 'user',
    component: UsermasterComponent,
    data: {
      title: 'User'
    }
  },
  {

    path: 'ChangePassword',
    component: PasswordChangeComponent,
    data: {
      title: 'ChangePassword'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule {
}
