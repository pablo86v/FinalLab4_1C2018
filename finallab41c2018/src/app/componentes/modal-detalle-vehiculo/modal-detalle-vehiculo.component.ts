import { Component, OnInit , Input } from '@angular/core';
import { Vehiculo } from '../../entidades/vehiculo';
import { DataService } from '../../servicios/data.service';
import { Empleado } from '../../entidades/empleado';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-detalle-vehiculo',
  templateUrl: './modal-detalle-vehiculo.component.html',
  styleUrls: ['./modal-detalle-vehiculo.component.css']
})
export class ModalDetalleVehiculoComponent implements OnInit {

  @Input() public objVehiculo : Vehiculo;
  


  // Atributos para bindeo del html
  aireAcondicionado : boolean = false;
  baul       : string = "";
  empleado          : string = "";
  modelo            : string = "";
  anio              : string = "";
  color             : string = "";
  dominio           : string = "";
  foto              : string = "";

  constructor(public dataService:DataService,public spinner: NgxSpinnerService) { }

  ngOnInit() {
    
  }

  ngOnChanges(){

    if(this.objVehiculo != null) {
      this.spinner.show();
      this.setControls(this.objVehiculo);
      setTimeout(() => {
        this.spinner.hide();
        }, 1000);
    }

  }

  setControls(auto : Vehiculo){
    if(auto.aireAcondicionado == "true") {
      this.aireAcondicionado = true;
    }else{
       this.aireAcondicionado = false;
     }

    this.baul = auto.baul == "true" ? "si" : "no" ;
    this.modelo = auto.modelo;
    this.anio= auto.anio;
    this.color = auto.color;
    this.dominio = auto.dominio;
    this.foto = auto.foto != ""? auto.foto :"../../assets/placeholders/carPlaceholder2.png" ;

    this.dataService.getObjectWithParams(environment.apiEmpleado,auto.idEmpleado).subscribe(
        data => { 
                 this.empleado = data.idEmpleado + " - " + data.apellido + "," + data.nombre;
                 // console.log(data) 
                },
        err => console.error(err)
      );
  }

  


}
