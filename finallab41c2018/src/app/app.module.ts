import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes }       from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

//Componentes
import { PrincipalComponent } from './principal/principal.component';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajesClientesComponent } from './viajes-clientes/viajes-clientes.component';
import { ModalElegirVehiculoComponent } from './modal-elegir-vehiculo/modal-elegir-vehiculo.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { AltaVehiculoComponent } from './alta-vehiculo/alta-vehiculo.component';
import { ModalDetalleVehiculoComponent } from './modal-detalle-vehiculo/modal-detalle-vehiculo.component';

//Servicios
import { ValidarAccesoService } from './servicios/validar-acceso.service';


const appRoutes: Routes = [
  { path: 'home'                , component: PrincipalComponent                                              },
  { path: 'viajes-clientes'     , component: ViajesClientesComponent ,  canActivate: [ValidarAccesoService]  },
  { path: 'viajes'              , component: ViajesComponent         ,  canActivate: [ValidarAccesoService]  },
  { path: 'vehiculos'           , component: VehiculosComponent      ,  canActivate: [ValidarAccesoService]  },
  { path: 'alta-vehiculo'       , component: AltaVehiculoComponent      ,  canActivate: [ValidarAccesoService]  },
  { path: '**'                  , component: PrincipalComponent                                              }
];


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MyNavBarComponent,
    ViajesComponent,
    ViajesClientesComponent,
    ModalElegirVehiculoComponent,
    VehiculosComponent,
    ModalDetalleVehiculoComponent,
    AltaVehiculoComponent,
  ],
  exports: [
    HttpClientModule
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
