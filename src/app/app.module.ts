/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NbAuthModule } from '@nebular/auth';

import { MageService } from './mage/service';
import { MageAuthGuard } from './mage/auth-guard.service';
import { MageAuthProvider } from './mage/auth.provider';

import { Config } from './app.config';

export function mageServiceFactory(mageService: MageService) {
  return  () => mageService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: MageAuthProvider,
          config: {
            servers: Config.environments,
          },
        },
      },
      forms: {
        login: {
          redirectDelay: 0,
        },
        register: {
          redirectDelay: 3000,
          showMessages: {
            success: true,
          },
        },
        logout: {
          redirectDelay: 1200,
          showMessages: {
            success: true,
          },
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    MageService,
    {
      provide: APP_INITIALIZER,
      useFactory: mageServiceFactory,
      deps: [MageService],
      multi: true,
    },
    MageAuthProvider,
    MageAuthGuard,
  ],
})

export class AppModule {
}
