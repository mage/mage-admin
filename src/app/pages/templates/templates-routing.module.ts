import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TemplatesComponent } from './templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'ui-features',
        loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
      }, {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule',
      }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule',
      }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
      }, {
        path: 'editors',
        loadChildren: './editors/editors.module#EditorsModule',
      }, {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule',
      }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule',
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatesRoutingModule {
}
