import { Component, OnInit, Input } from '@angular/core';
import { Viaje } from '../entidades/viajes';


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

  txtPuertas :string  ;
  chkUtilitario : boolean = false;
  chkAireAcond :boolean = false;

  constructor() {   
  }

  ngOnInit() {
    this.txtPuertas = "Indistinto";
  }  

  ngOnChanges(){
    if(this.objViaje != null) this.setControls();
    
  }
  
  setControls(){
    // cantPuertas;utilitario;aireAcondicionado
    let aComodidades = this.objViaje.comodidades.split(";");
    if (aComodidades[0]!="Indistinto") this.txtPuertas = "Puertas: "+ aComodidades[0];
    aComodidades[1]=="si"? this.chkUtilitario = true : this.chkUtilitario = false;
    aComodidades[2]=="si"? this.chkAireAcond = true : this.chkAireAcond = false;
    
    if (this.seleccionable){
      let a = document.getElementById("myChkUtilitario");
      a.removeAttribute("disabled");
      a = document.getElementById("myChkAireAcond");
      a.removeAttribute("disabled");
    }

  }


  setCantPuertas(cant){
    console.log(cant)
    this.txtPuertas = cant;
  }

  confirmar(){
   console.log("confirmar");
  }

  test(){
    alert("ok");
  }


}
