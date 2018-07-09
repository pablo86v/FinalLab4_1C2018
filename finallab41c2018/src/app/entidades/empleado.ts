import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
  })

export class Empleado extends Usuario{

    public idEmpleado    : number;
    public idUsuario     : number;
    public cuil          : string;
    public telefono      : string;


    constructor (
        parNombre       : string,
        parApellido     : string,
        parDni          : string,
        parUsuario      : string,
        parPassword     : string,
        parDomicilio    : string,
        parTipoUsuario  : string,
        parCuil          : string,
        parTelefono      : string,
        parIdEmpleado?    : number,
        parIdUsuario?     : number
    ){
        super(
            parNombre       ,
            parApellido     ,
            parDni          ,
            parUsuario      ,
            parPassword     ,
            parDomicilio    ,
            parTipoUsuario  
        );

        this.idEmpleado = parIdEmpleado ;
        this.idUsuario  = parIdUsuario  ;
        this.cuil       = parCuil       ;
        this.telefono   = parTelefono   ;

    }

}