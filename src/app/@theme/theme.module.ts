import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Customized login components
 */
import { MageAuthBlockComponent } from './components/auth/auth-block/auth-block.component';
import { MageLoginComponent } from './components/auth/login/login.component';
import { MageRegisterComponent } from './components/auth/register/register.component';
import { MageLogoutComponent } from './components/auth/logout/logout.component';
import { MageRequestPasswordComponent } from './components/auth/request-password/request-password.component';
import { MageResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
} from '@nebular/theme';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  ThemeSwitcherComponent,
  TinyMCEComponent,
} from './components';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import {
  OneColumnLayoutComponent,
  SampleLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { DARK_THEME } from './styles/theme.dark';

import {
  JsonEditorDirective,
  RenderJsonDirective,
} from './directives';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  RouterModule,
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NgbModule,
];

const DIRECTIVES = [
  JsonEditorDirective,
  RenderJsonDirective
];

const COMPONENTS = [
  MageAuthBlockComponent,
  MageLoginComponent,
  MageRegisterComponent,
  MageRequestPasswordComponent,
  MageResetPasswordComponent,
  MageLogoutComponent,
  ThemeSwitcherComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  SampleLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'dark',
    },
    [ DEFAULT_THEME, DARK_THEME ],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...DIRECTIVES, ...COMPONENTS, ...PIPES],
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS,
    ...PIPES,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
