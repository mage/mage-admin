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

/**
 * Let our current script know of the SystemJS global.
 *
 * SystemJS is specified in this project's `.angular-cli.json` file.
 */
declare const SystemJS;
declare const System;

const realImport = SystemJS.import.bind(SystemJS);
System.import = SystemJS.import = (...args: any[]) => {
  console.log(args);
  return realImport(...args);
}


/**
 * Import typescript, and register it to SystemJS dynamically
 */
import * as typescript from 'typescript/lib/typescript';
SystemJS.registerDynamic('typescript', [], true, (require, exports, module) => Object.assign(exports, typescript));

/**
 * Configure SystemJS.
 *
 * We have symlinked the typescript plugin
 * into our vendors folder; we let SystemJS know
 * it can download it from there.
 */
SystemJS.config({
  packages: {
    'https://raw.githubusercontent.com': {
      defaultExtension: 'ts'
    },
    ts: {
      main: 'systemjs-typescript-plugin.js'
    }
  },
  map: {
    ts: 'assets/vendors'
  },
  transpiler: 'ts',
});

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
export class ProjectModule {
  parentInjector: Injector

  constructor(private compiler: Compiler, injector: Injector) {
    this.parentInjector =  (injector as ReflectiveInjector).parent

    setTimeout(() => SystemJS.import('https://raw.githubusercontent.com/AlexKhymenko/ngx-permissions/master/src/index.ts')
    .then((module) => {
      const moduleFactory = this.compiler.compileModuleSync(module.moduleClassName);
      const moduleRef = moduleFactory.create(this.parentInjector);
      const resolver = moduleRef.componentFactoryResolver;
      const compFactory = resolver.resolveComponentFactory(PagesComponent);
    })
    .catch((error) => {
      console.log(error)
    }), 1000)

  }
}
