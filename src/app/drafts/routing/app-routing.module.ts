import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './core/login-guard.service';
import { ContainerComponent } from './home/container/container.component'
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { AppNavigationData } from './app-routing.models';
import { BulkUploaderComponent } from './bulk-uploader/bulk-uploader/bulk-uploader.component';
import {RolesPermissionsComponent} from "./roles-permissions/roles-permissions/roles-permissions.component";

const routes: Routes = [
  { path: '',
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: AppNavigationData.home.path,
        pathMatch: 'full' },
      {
        path: AppNavigationData.home.path,
        component: ContainerComponent,
        data: AppNavigationData.home.data
      },
      {
        path: AppNavigationData.searchResults.path,
        component: SearchResultsComponent,
        data: AppNavigationData.searchResults.data
      },
      {
        path: AppNavigationData.moves.path,
        loadChildren: './moves/moves.module#MovesModule',
        data: AppNavigationData.moves.data
      },
      {
        path: AppNavigationData.analytics.path,
        loadChildren: './mobility-analytics/mobility-analytics.module#MobilityAnalyticsModule',
        data: AppNavigationData.analytics.data
      },
      { path: AppNavigationData.tools.path,
        loadChildren: './tools/tools.module#ToolsModule',
        data: AppNavigationData.tools.data
      },
      {
        path: AppNavigationData.initiation.path,
        loadChildren: './initiation/initiation.module#InitiationModule',
        data: AppNavigationData.initiation.data
      },
      {
        path: AppNavigationData.rolesPermissions.path,
        // loadChildren: './roles-permissions/roles-permissions.module#RolesPermissionsModule',
        component: RolesPermissionsComponent,
        data: AppNavigationData.rolesPermissions.data
      },
      {
        path: AppNavigationData.bulkUpload.path,
        component: BulkUploaderComponent,
        data: AppNavigationData.bulkUpload.data
      },
      {
        path: '**',
        redirectTo: AppNavigationData.home.path
      } // TODO wildcard component instead!
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
