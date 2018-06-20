import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class Viaje{
    public idViaje          :  number;
    public idVehiculo       :  number;
    public idCliente        :  number;
    public comodidades      :  string;
    public domicilioOrig    :	string;  
    public domicilioDest    :  string;
    public coordenadasOrig  :  string;
    public coordenadasDest  :  string;
    public monto		     :  string;
    public estado		     :  string;
    public fechaViaje       :  string;
    public medioPago        :  string;
  


    constructor(
                parIdViaje        	:  number,
                parIdVehiculo     	:  number,
                parIdCliente      	:  number,
                parComodidades      :  string,
                parDomicilioOrig  	:  string,
                parDomicilioDest  	:  string,
                parCoordenadasOrig	:  string,
                parCoordenadasDest	:  string,
                parMonto		    :  string, 	
                parEstado		    :  string, 	
                parFechaViaje       :  string,
                parMedioPago        :  string
                ){
        this.idViaje        	=  parIdViaje          ;
        this.idVehiculo     	=  parIdVehiculo       ;
        this.idCliente          =  parIdCliente        ; 
        this.comodidades        =  parComodidades      ;
        this.domicilioOrig      =  parDomicilioOrig    ;
        this.domicilioDest      =  parDomicilioDest    ;
        this.coordenadasOrig    =  parCoordenadasOrig  ;
        this.coordenadasDest    =  parCoordenadasDest  ;
        this.monto		        =  parMonto		       ;
        this.estado		        =  parEstado	       ;
        this.fechaViaje         =  parFechaViaje       ;
        this.medioPago          =  parMedioPago        ;
    }//constructor



}