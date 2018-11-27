/**
 * Inspirations for this system:
 *
 *   http://david-barreto.com/how-to-use-typescript-with-systemjs/
 *   https://stackoverflow.com/a/46328636/262831
 *   https://stackoverflow.com/a/45506470/262831
 *
 * Note that we have added both typescript and systemjs to this project's
 * .angular-cli.json file, so to make them available.
 *
 * The goal of this system is to provide:
 *
 *   1. Just-in-time component loading; load components from the currently
 *      used MAGE server, compile them and load them
 */
import { NgModule, Compiler, Injector, ReflectiveInjector } from '@angular/core';
import { Router } from '@angular/router';
import { SystemJsNgModuleLoader } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProjectComponent } from './project.component';
import { ProjectRoutingModule, routedComponents } from './project-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormsModule } from '@angular/forms';

import { ToasterModule } from 'angular2-toaster';
import { PagesComponent } from '../pages.component';

@NgModule({
  imports: [
    ToasterModule,
    ThemeModule,
    FormsModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    ProjectRoutingModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    SmartTableService,
    SystemJsNgModuleLoader
  ],
})
export class ProjectModule {}
