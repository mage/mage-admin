import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'basic', loadChildren: './basic/basic.module#BasicModule' },
      { path: 'templates', loadChildren: './templates/templates.module#TemplatesModule' },
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'basic' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
