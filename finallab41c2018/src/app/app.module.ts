import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes }       from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

//Servicios
import { ValidarAccesoService } from './servicios/validar-acceso.service';

//Componentes
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import { ModalElegirVehiculoComponent } from './modal-elegir-vehiculo/modal-elegir-vehiculo.component';
import { ModalDetalleVehiculoComponent } from './modal-detalle-vehiculo/modal-detalle-vehiculo.component';

//Vistas principales
import { PrincipalComponent } from './principal/principal.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajesClientesComponent } from './viajes-clientes/viajes-clientes.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { AltaVehiculoComponent } from './alta-vehiculo/alta-vehiculo.component';



const appRoutes: Routes = [
  { path: 'home'                , component: PrincipalComponent                                              },
  { path: 'viajes-clientes'     , component: ViajesClientesComponent ,  canActivate: [ValidarAccesoService]  },
  { path: 'viajes'              , component: ViajesComponent         ,  canActivate: [ValidarAccesoService]  },
  { path: 'vehiculos'           , component: VehiculosComponent      ,  canActivate: [ValidarAccesoService]  },
  { path: 'empleados'           , component: EmpleadosComponent      ,  canActivate: [ValidarAccesoService]  },
  { path: 'alta-vehiculo'       , component: AltaVehiculoComponent   ,  canActivate: [ValidarAccesoService]  },
  { path: 'alta-empleado'       , component: AltaEmpleadoComponent   ,  canActivate: [ValidarAccesoService]  },
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
    EmpleadosComponent,
    AltaEmpleadoComponent,
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
