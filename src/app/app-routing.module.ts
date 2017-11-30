import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NbAuthComponent } from '@nebular/auth';

import { MageAuthBlockComponent } from './@theme/components/auth/auth-block/auth-block.component';
import { MageLoginComponent } from './@theme/components/auth/login/login.component';
import { MageRegisterComponent } from './@theme/components/auth/register/register.component';
import { MageLogoutComponent } from './@theme/components/auth/logout/logout.component';
import { MageRequestPasswordComponent } from './@theme/components/auth/request-password/request-password.component';
import { MageResetPasswordComponent } from './@theme/components/auth/reset-password/reset-password.component';


import { MageAuthGuard } from './mage/auth-guard.service';

const routes: Routes = [
  { path: 'pages', canActivate: [ MageAuthGuard ], loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: MageLoginComponent,
      },
      {
        path: 'login',
        component: MageLoginComponent,
      },
      {
        path: 'logout',
        component: MageLogoutComponent,
      },
      {
        path: 'register',
        component: MageRegisterComponent,
      },
    ],
  },
  { path: '', canActivate: [ MageAuthGuard ], redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', canActivate: [ MageAuthGuard ], redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
