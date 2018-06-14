import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class Viaje{
    private idViaje          :  number;
    private idVehiculo       :  number;
    private idCliente        :  number;
    private domicilioOrig    :	string;  
    private domicilioDest    :  string;
    private coordenadasOrig  :  string;
    private coordenadasDest  :  string;
    private monto		     :  string;
    private fechaViaje       :  string;
    private medioPago        :  string;

    constructor(
                parIdViaje        	:  number,
                parIdVehiculo     	:  number,
                parIdCliente      	:  number,
                parDomicilioOrig  	:  string,
                parDomicilioDest  	:  string,
                parCoordenadasOrig	:  string,
                parCoordenadasDest	:  string,
                parMonto		    :  string, 	
                parFechaViaje       :  string,
                parMedioPago        :  string
                ){
        this.idViaje        	=  parIdViaje        
        this.idVehiculo     	=  parIdVehiculo     
        this.idCliente          =  parIdCliente      
        this.domicilioOrig      =  parDomicilioOrig  
        this.domicilioDest      =  parDomicilioDest  
        this.coordenadasOrig    =  parCoordenadasOrig
        this.coordenadasDest    =  parCoordenadasDest
        this.monto		        =  parMonto		   
        this.fechaViaje         =  parFechaViaje     
        this.medioPago          =  parMedioPago       
    }//constructor



}