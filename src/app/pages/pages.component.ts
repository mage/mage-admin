import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

import { ToasterConfig } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-pages',
  styles: [`
    nb-menu /deep/ .menu-item .menu-icon.fa {
      font-size: 2rem;
      line-height: normal;
    }

    nb-menu /deep/ .menu-group {
      padding: 1.5rem 1.25rem 1rem;
    }
  `],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
    <toaster-container [toasterconfig]="config"></toaster-container>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  config = new ToasterConfig({
    positionClass: 'toast-top-full-width',
    preventDuplicates: true,
  });
}
