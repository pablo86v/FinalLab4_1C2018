import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PrincipalComponent } from './principal/principal.component';
import { RouterModule, Routes }       from '@angular/router';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';

const appRoutes: Routes = [
  { path: 'main'                , component: PrincipalComponent },
  { path: '**'                  , component: PrincipalComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MyNavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
