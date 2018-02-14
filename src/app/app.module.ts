import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchComponent } from './components/search/search.component';


import { CustomBreakpointsModule } from './shared/custom-breakpoints/custom-breakpoints.module';
import { AppRoutingModule } from './app-routing.module';
import { GithubService } from './shared/services/github.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SearchComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CustomBreakpointsModule,
    AppRoutingModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
