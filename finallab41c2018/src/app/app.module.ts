import { AppComponent }                      from './app.component';
import { BrowserModule }                     from '@angular/platform-browser';
import { NgModule }                          from '@angular/core';
import { RouterModule, Routes }              from '@angular/router';
import { HttpClientModule }                  from '@angular/common/http'; 
import { HttpModule }                        from '@angular/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule }                  from 'ng2-file-upload';

//Servicios
import { ValidarAccesoService }              from './servicios/validar-acceso.service';

//Componentes
import { MyNavBarComponent }                 from './componentes/my-nav-bar/my-nav-bar.component';
import { ModalElegirVehiculoComponent }      from './componentes/modal-elegir-vehiculo/modal-elegir-vehiculo.component';
import { ModalDetalleVehiculoComponent }     from './componentes/modal-detalle-vehiculo/modal-detalle-vehiculo.component';

//Vistas principales
import { PrincipalComponent }                from './vistas/principal/principal.component';
import { ViajesClientesComponent }           from './vistas/viajes-clientes/viajes-clientes.component';
import { ViajesChoferComponent }             from './vistas/viajes-chofer/viajes-chofer.component';
import { ViajesEncargadoComponent }          from './vistas/viajes-encargado/viajes-encargado.component';
import { EmpleadosComponent }                from './vistas/empleados/empleados.component';
import { AltaEmpleadoComponent }             from './vistas/alta-empleado/alta-empleado.component';
import { VehiculosComponent }                from './vistas/vehiculos/vehiculos.component';
import { AltaVehiculoComponent }             from './vistas/alta-vehiculo/alta-vehiculo.component';
import { AltaViajeComponent }                from './vistas/alta-viaje/alta-viaje.component';




const appRoutes: Routes = [
  { path: 'viajes-clientes'     , component: ViajesClientesComponent  ,  canActivate: [ValidarAccesoService]  },
  { path: 'viajes-encargado'    , component: ViajesEncargadoComponent ,  canActivate: [ValidarAccesoService]  },
  { path: 'viajes-chofer'       , component: ViajesChoferComponent    ,  canActivate: [ValidarAccesoService]  },
  { path: 'vehiculos'           , component: VehiculosComponent       ,  canActivate: [ValidarAccesoService]  },
  { path: 'empleados'           , component: EmpleadosComponent       ,  canActivate: [ValidarAccesoService]  },
  { path: 'alta-vehiculo'       , component: AltaVehiculoComponent    ,  canActivate: [ValidarAccesoService]  },
  { path: 'alta-empleado'       , component: AltaEmpleadoComponent    ,  canActivate: [ValidarAccesoService]  },
  { path: 'alta-viaje'          , component: AltaViajeComponent       ,  canActivate: [ValidarAccesoService]  },
  { path: 'home'                , component: PrincipalComponent                                               },
  { path: '**'                  , component: PrincipalComponent                                               }
];


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MyNavBarComponent,
    ModalElegirVehiculoComponent,
    ModalDetalleVehiculoComponent,
    VehiculosComponent,
    EmpleadosComponent,
    AltaVehiculoComponent,
    AltaEmpleadoComponent,
    ViajesChoferComponent,
    ViajesClientesComponent,
    ViajesEncargadoComponent,
    AltaViajeComponent,
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
