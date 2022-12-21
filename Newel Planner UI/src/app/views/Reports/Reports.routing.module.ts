import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './Reports.component';
//import { NewTaskComponent } from './new-task.component';
//import { LeaveRequestComponent} from './leave-request.component';
//import { WeekelyEffortsComponent } from './weekely-efforts.component';

// import { ReportsComponent } from ';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        data: {
            title: 'Reports'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportsRoutingModule { }
