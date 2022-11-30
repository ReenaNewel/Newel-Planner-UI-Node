import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaskComponent } from './new-task.component';

const routes: Routes = [
    {
        path: '',
        component: NewTaskComponent,
        data: {
            title: 'New Task'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewTaskRoutingModule { }
