import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes }       from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 


//Componentes
import { PrincipalComponent } from './principal/principal.component';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import { ViajesComponent } from './viajes/viajes.component';

//Servicios
import {ViajesService} from './servicios/viajes.service';
import { ViajesClientesComponent } from './viajes-clientes/viajes-clientes.component';


const appRoutes: Routes = [
  { path: 'home'                , component: PrincipalComponent },
  { path: 'viajes-clientes'     , component: ViajesClientesComponent },
  { path: 'viajes'              , component: ViajesComponent },
  { path: '**'                  , component: PrincipalComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MyNavBarComponent,
    ViajesComponent,
    ViajesClientesComponent
  ],
  exports: [
    HttpClientModule
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HttpClientModule,
    ViajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
