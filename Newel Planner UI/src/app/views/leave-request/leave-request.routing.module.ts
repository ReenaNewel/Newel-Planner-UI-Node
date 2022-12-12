import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { NewTaskComponent } from './new-task.component';
import { LeaveRequestComponent} from './leave-request.component';
const routes: Routes = [
    {
        path: '',
        component: LeaveRequestComponent,
        data: {
            title: 'Leave Request'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LeaveRequestRoutingModule { }
