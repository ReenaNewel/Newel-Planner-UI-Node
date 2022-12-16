import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { NewTaskComponent } from './new-task.component';
//import { LeaveRequestComponent} from './leave-request.component';
import { WeekelyEffortsComponent } from './weekely-efforts.component';
const routes: Routes = [
    {
        path: '',
        component: WeekelyEffortsComponent,
        data: {
            title: 'Weekely Efforts'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WeekelyEffortsRoutingModule { }
