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
    public cantPuertas          : number ;
    public utilitario           : string ;
    public aireAcondicionado    : string ;


    constructor (
        parIdVehiculo        : number,
        parIdEmpleado         : number,
        parModelo		      : string,
        parAnio               : string,
        parColor              : string,
        parDominio            : string,
        parCantPuertas        : number,
        parUtilitario         : string,
        parAireAcondicionado  : string
    ){
        this.idVehiculo        = parIdVehiculo        ;
        this.idEmpleado         = parIdEmpleado         ;
        this.modelo		        = parModelo		        ;
        this.anio               = parAnio               ;
        this.color              = parColor              ;
        this.dominio            = parDominio            ;
        this.cantPuertas        = parCantPuertas        ;
        this.utilitario         = parUtilitario         ;
        this.aireAcondicionado  = parAireAcondicionado  ;

    }

}