import { Component, OnInit, Input , Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Viaje }    from '../../entidades/viajes';
import { Vehiculo } from '../../entidades/vehiculo';
import { DataService } from '../../servicios/data.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../servicios/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { error } from 'util';

@Component({
  selector: 'app-modal-elegir-vehiculo',
  templateUrl: './modal-elegir-vehiculo.component.html',
  styleUrls: ['./modal-elegir-vehiculo.component.css']
})
export class ModalElegirVehiculoComponent implements OnInit {

  // recibo objeto viaje para validar los datos que cargó el cliente relacionados al vehículo
  @Input() public objViaje : Viaje;
  // flag que indica si los datos del vehiculo pueden ser seleccionados
  @Input() public seleccionable : boolean;

  @Output() public returnComodities  = new EventEmitter<string>();


  idVehiculo             : number;
  userType               : string;

  txtVehiculo            : string;
  chkUtilitario          : boolean ;
  chkUtilitarioDisabled  : boolean = true;
  chkAireAcond           : boolean ;
  chkAireAcondDisabled   : boolean = true;
  chkBaul                : boolean ;
  chkBaulDisabled        : boolean = true;
  aVehiculos             : Array<Vehiculo>;
  

  constructor( private router: Router, public dataService:DataService,public auth : AuthService,public spinner: NgxSpinnerService) {   
  }

  ngOnInit() {
      this.userType = this.auth.getUsuarioLogueado().tipoUsuario;
  }  

  ngOnChanges(){
    this.txtVehiculo = "Seleccione";

    if (this.seleccionable){
      this.chkUtilitarioDisabled= false;
      this.chkAireAcondDisabled=false;
      this.chkBaulDisabled=false;
    }

    this.spinner.show();
    if(this.objViaje != null) {
      this.setControls();
      if(this.objViaje.comodidades != "false;false;false"){ 
        this.getVehiculosWithParams(this.objViaje.comodidades);
      }else{
        this.getVehiculos();
      }
    }
    setTimeout(() => {
      this.spinner.hide();
      }, 1000);
  }
  
 
  confirmar(viaje:Viaje){
      //Si estoy asignando vehiculo en vista encargado devuelvo objViaje, sino solamente las comodidades. (para el alta-viaje)
      this.txtVehiculo = "";
      viaje.idVehiculo = this.idVehiculo ;

      // console.log(viaje);

      this.dataService.update(environment.apiViajes,viaje).subscribe(
        data => {console.log(data)
                location.reload(true)},
        err  => console.error(err)
      );
  }

  enviarComodities( ){
    //Envio al frm de alta viaje las comodidades elegidas por el cliente
    let comodities =     (this.chkBaul       == true ? "true" : "false");
    comodities += ";"  + (this.chkUtilitario == true ? "true" : "false");
    comodities += ";"  + (this.chkAireAcond  == true ? "true" : "false");
    this.returnComodities.emit(comodities);
  }

  // Seteo los checkbox según las preferencias del cliente.
  setControls(){
    // cantPuertas;utilitario;aireAcondicionado
    let aComodidades = this.objViaje.comodidades.split(";");
    aComodidades[0]=="true"? this.chkBaul       = true : this.chkBaul = false;
    aComodidades[1]=="true"? this.chkUtilitario = true : this.chkUtilitario = false;
    aComodidades[2]=="true"? this.chkAireAcond  = true : this.chkAireAcond = false;
  }

  // Modifico el input con el nombre del vehiculo elegido
  setVehiculo(vehiculo : Vehiculo){
    this.idVehiculo = vehiculo.idVehiculo;
    this.txtVehiculo = vehiculo.modelo + " - " + vehiculo.anio;
  }

  //Recupero lista de vehiculos disponibles según las preferencias del cliente
  getVehiculosWithParams(comodidades){
    this.dataService.getAllWithParams(environment.apiVehiculos,comodidades).subscribe(
      data => this.aVehiculos = data,
      err => console.error(err)
    )
  }

  //Recupero todos los vehiculos
  getVehiculos(){
    this.dataService.getAll(environment.apiVehiculos).subscribe(
      data => this.aVehiculos = data,
      err => console.error(err)
    )
  }
 

  test(){
    alert("ok");
  }


}
