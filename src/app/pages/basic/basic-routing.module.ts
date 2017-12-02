import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BasicComponent } from './basic.component';
import { UserCommandsComponent } from './usercommands/usercommands.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  {
    path: '',
    component: BasicComponent,
    children: [
      { path: 'usercommands', component: UserCommandsComponent },
      { path: 'topics', component: TopicsComponent },
      { path: '', redirectTo: 'usercommands', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'usercommands' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicRoutingModule {
}

export const routedComponents = [
  BasicComponent,
  UserCommandsComponent,
  TopicsComponent
];
