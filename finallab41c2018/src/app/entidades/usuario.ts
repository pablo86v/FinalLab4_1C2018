import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })


export class Usuario{
    public idUsuario    : number;
    public nombre       : string; 
    public apellido     : string;
    public dni          : string;
    public usuario      : string;
    public password     : string;
    public domicilio    : string;
    public tipo  : string;
    

    constructor(
        parNombre       : string,
        parApellido     : string,
        parDni          : string,
        parUsuario      : string,
        parPassword     : string,
        parDomicilio    : string,
        parTipoUsuario  : string,
        parIdUsuario    : number
    ){
       if(parIdUsuario != undefined) this.idUsuario    = parIdUsuario      ;
        this.nombre       = parNombre         ; 
        this.apellido     = parApellido       ;
        this.dni          = parDni            ;
        this.usuario      = parUsuario        ;
        this.password     = parPassword       ;
        this.domicilio    = parDomicilio      ;
        this.tipo         = parTipoUsuario    ;
    }

}


