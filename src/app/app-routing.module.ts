import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent }    from './components/search/search.component';
import { UserComponent }      from './components/user/user.component';
import { NotFoundComponent }  from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'user/:page/:name', component: UserComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
