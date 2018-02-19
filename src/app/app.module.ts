import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NgModule }                 from '@angular/core';
import { HttpClientModule }         from '@angular/common/http';

import { CustomBreakpointsModule }  from './shared/custom-breakpoints/custom-breakpoints.module';
import { AppRoutingModule }         from './app-routing.module';

import { AppComponent }       from './app.component';
import { HeaderComponent }    from './components/header/header.component';
import { NotFoundComponent }  from './components/not-found/not-found.component';
import { SearchComponent }    from './components/search/search.component';
import { UserComponent }      from './components/user/user.component';

import { GithubService }      from './shared/services/github.service';
import { PaginationService }  from './shared/services/pagination.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    SearchComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomBreakpointsModule,
    AppRoutingModule
  ],
  providers: [PaginationService, GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
