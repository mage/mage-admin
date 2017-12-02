import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { BasicComponent } from './basic.component';
import { BasicRoutingModule, routedComponents } from './basic-routing.module';

@NgModule({
  imports: [
    BasicRoutingModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class BasicModule {}
