import { Component, OnInit, Input } from '@angular/core';
import { Viaje }    from '../entidades/viajes';
import { Vehiculo } from '../entidades/vehiculo';
import { Router } from '@angular/router';
import { DataService } from '../servicios/data.service';
import { environment } from '../../environments/environment';
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

  idVehiculo             : number;
  userType               : string;
  txtPuertas             : string;
  txtVehiculo            : string;
  chkUtilitario          : boolean = false;
  chkUtilitarioDisabled  : boolean = true;
  chkAireAcondDisabled   : boolean = true;
  chkAireAcond           : boolean = false;
  aVehiculos             : Array<Vehiculo>;
  

  constructor( private router: Router, public dataService:DataService) {   
  }

  ngOnInit() {
    this.txtPuertas = "Indistinto";
    this.userType = localStorage.getItem("userType");
  }  

  ngOnChanges(){
    this.txtVehiculo = "Seleccione"
    if(this.objViaje != null) {
      this.setControls();
      if(this.objViaje.comodidades != ""){
        this.getVehiculosWithParams(this.objViaje.comodidades);
      }else{
        this.getVehiculos();
      }
    }
  }
  
  // Seteo los checkbox según las preferencias del cliente.
  setControls(){
    // cantPuertas;utilitario;aireAcondicionado
    let aComodidades = this.objViaje.comodidades.split(";");
    if (aComodidades[0]!="Indistinto") this.txtPuertas = "Puertas: "+ aComodidades[0];
    aComodidades[1]=="si"? this.chkUtilitario = true : this.chkUtilitario = false;
    aComodidades[2]=="si"? this.chkAireAcond = true : this.chkAireAcond = false;
    
    if (this.seleccionable){
      this.chkUtilitarioDisabled= false;
      this.chkAireAcondDisabled=false;
    }

  }

  // Modifico el input con el nombre del vehiculo elegido
  setVehiculo(vehiculo : Vehiculo){
    this.idVehiculo = vehiculo.idVehiculo;
    this.txtVehiculo = vehiculo.modelo + " - " + vehiculo.anio;
  }

  // Modifico el input con la cant de puertas
  setCantPuertas(cant){
    this.txtPuertas = cant;
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

  confirmar(viaje:Viaje){
    this.txtVehiculo = "";
    viaje.idVehiculo = this.idVehiculo ;
    this.dataService.update(environment.apiViajes,viaje).subscribe(
      data => {console.log(data)
               location.reload(true)},
      err  => console.error(err)
    )
  }

  test(){
    alert("ok");
  }


}
