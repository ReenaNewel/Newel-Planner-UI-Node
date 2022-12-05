import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from './task-details.component';

const routes: Routes = [
    {
        path: '',
        component: TaskDetailsComponent,
        data: {
            title: 'Task'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TaskDetailsRoutingModule { }
