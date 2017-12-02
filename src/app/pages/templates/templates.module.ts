import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { TemplatesComponent } from './templates.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { TemplatesRoutingModule } from './templates-routing.module';


const TEMPLATES_COMPONENTS = [
  TemplatesComponent,
];

@NgModule({
  imports: [
    TemplatesRoutingModule,
    DashboardModule
  ],
  declarations: [
    ...TEMPLATES_COMPONENTS,
  ]
})
export class TemplatesModule {}
