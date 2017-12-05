import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      { path: '', redirectTo: 'project', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'project' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {
}

export const routedComponents = [
  ProjectComponent,
];
