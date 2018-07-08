import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class Vehiculo{

    public idVehiculo          : number ;
    public idEmpleado           : number ;
    public modelo		        : string ;
    public anio                 : string ;
    public color                : string ;
    public dominio              : string ;
    public cantPuertas          : string ;
    public utilitario           : string ;
    public aireAcondicionado    : string ;
    public estado               : string ;
    public foto                 : string ;

    constructor (
        parIdEmpleado         : number,
        parModelo		      : string,
        parAnio               : string,
        parColor              : string,
        parDominio            : string,
        parCantPuertas        : string,
        parUtilitario         : string,
        parAireAcondicionado  : string,
        parEstado             : string,
        parFoto               : string,
        parIdVehiculo ?       : number
    ){
        this.idVehiculo        = parIdVehiculo          ;
        this.idEmpleado         = parIdEmpleado         ;
        this.modelo		        = parModelo		        ;
        this.anio               = parAnio               ;
        this.color              = parColor              ;
        this.dominio            = parDominio            ;
        this.cantPuertas        = parCantPuertas        ;
        this.utilitario         = parUtilitario         ;
        this.aireAcondicionado  = parAireAcondicionado  ;
        this.estado             = parEstado             ;
        this.foto               = parFoto               ;
    }

}