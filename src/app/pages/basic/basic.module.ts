import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BasicComponent } from './basic.component';
import { BasicRoutingModule, routedComponents } from './basic-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';

import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    ToasterModule,
    ThemeModule,
    FormsModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    BasicRoutingModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    SmartTableService,
  ],
})
export class BasicModule {}
