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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // Lazy loading the product module only when product route is hit.
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  { path: 'catalog', component: CatalogComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserComponent },
  {
    path: 'servers',
    component: ServersComponent,
    children: [{ path: ':id/edit', component: ServersComponent }],
  },
  { path: 'server', component: ServerComponent },
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
