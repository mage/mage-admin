import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

import { ToasterService, ToasterModule, Toast } from 'angular2-toaster';
import { MageService } from '../mage/service';

const SERVICES = [
  MageService,
  ToasterService
];

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    ToasterModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class PagesModule {
  constructor(
    private mageService: MageService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    mageService.on('session.unset', (...args: any[]) => {
      this.toasterService.popAsync({
        type: 'warning',
        title: 'Session expired',
        body: 'Please log in',
        timeout: 3000,
        onHideCallback: () => this.router.navigate(['auth/login'])
      });
    });

    mageService.on('io.error.network', () => this.emitNetworkIssueToast());
  }

  private emitNetworkIssueToast() {
    this.toasterService.popAsync({
      type: 'error',

      title: 'Network connectivity error',
      body: 'Either your connection is unstable or the server is having issues',
      timeout: 10000
    });
  }
}
