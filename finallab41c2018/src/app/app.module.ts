import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes }       from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
// import { FormsModule } from '@angular/forms';
import { CanActivate } from '@angular/router';


//Componentes
import { PrincipalComponent } from './principal/principal.component';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import { ViajesComponent } from './viajes/viajes.component';

//Servicios
import { ViajesService} from './servicios/viajes.service';
import { ViajesClientesComponent } from './viajes-clientes/viajes-clientes.component';
import { ModalElegirVehiculoComponent } from './modal-elegir-vehiculo/modal-elegir-vehiculo.component';
import { ValidarAccesoService } from './servicios/validar-acceso.service';

const appRoutes: Routes = [
  { path: 'home'                , component: PrincipalComponent                                              },
  { path: 'viajes-clientes'     , component: ViajesClientesComponent ,  canActivate: [ValidarAccesoService]  },
  { path: 'viajes'              , component: ViajesComponent         ,  canActivate: [ValidarAccesoService]  },
  { path: '**'                  , component: PrincipalComponent                                              }
];


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MyNavBarComponent,
    ViajesComponent,
    ViajesClientesComponent,
    ModalElegirVehiculoComponent
  ],
  exports: [
    HttpClientModule
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ViajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
