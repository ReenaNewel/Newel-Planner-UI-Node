import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRoleMappingComponent } from './project-role-mapping/project-role-mapping.component';
import { RaMappingMasterComponent } from './ra-mapping-master/ra-mapping-master.component';
const routes: Routes = [
  {
    path: 'project-mapping',
    component: ProjectRoleMappingComponent,
    data: {
      title: 'Project Mapping'
    }
  },
  {
    path: 'ra-mapping',
    component: RaMappingMasterComponent,
    data: {
      title: 'RA Mapping'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule { }
