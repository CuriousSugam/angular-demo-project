import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './server/server.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
