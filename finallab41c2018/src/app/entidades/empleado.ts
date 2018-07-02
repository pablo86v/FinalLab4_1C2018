import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class Empleado{

    public idEmpleado    : number;
    public idUsuario     : number;
    public cuil          : string;
    public telefono      : string;


    constructor (
        parIdEmpleado    : number,
        parIdUsuario     : number,
        parCuil          : string,
        parTelefono      : string
        
    ){
        this.idEmpleado = parIdEmpleado ;
        this.idUsuario  = parIdUsuario  ;
        this.cuil       = parCuil       ;
        this.telefono   = parTelefono   ;

    }

}