import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuicklinkStrategy } from 'ngx-quicklink';

import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './server/server.component';

import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './auth/auth.component';
import { AuthenticationGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    component: HomeComponent,
  },
  // Lazy loading the product module only when product route is hit.
  {
    path: 'products',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'catalog',
    canActivate: [AuthenticationGuard],
    component: CatalogComponent,
  },
  {
    path: 'users',
    canActivate: [AuthenticationGuard],
    component: UsersComponent,
  },
  { path: 'users/:id', component: UserComponent },
  {
    path: 'servers',
    canActivate: [AuthenticationGuard],
    component: ServersComponent,
    children: [{ path: ':id/edit', component: ServersComponent }],
  },
  {
    path: 'server',
    canActivate: [AuthenticationGuard],
    component: ServerComponent,
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
