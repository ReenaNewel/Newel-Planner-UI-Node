import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
    {
        path: '',
        component: TimesheetComponent,
        data: {
            title: 'Timesheet'
        }
    }
];

 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimesheetRoutingModule {
}