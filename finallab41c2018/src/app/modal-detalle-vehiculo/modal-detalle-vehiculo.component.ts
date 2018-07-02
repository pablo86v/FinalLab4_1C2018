import { Component, OnInit , Input } from '@angular/core';
import { Vehiculo } from '../entidades/vehiculo';
import { DataService } from '../servicios/data.service';
import { Empleado } from '../entidades/empleado';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-modal-detalle-vehiculo',
  templateUrl: './modal-detalle-vehiculo.component.html',
  styleUrls: ['./modal-detalle-vehiculo.component.css']
})
export class ModalDetalleVehiculoComponent implements OnInit {

  @Input() public objVehiculo : Vehiculo;
  


  // Atributos para bindeo del html
  aireAcondicionado : boolean = false;
  cantPuertas : string = "";
  empleado : string = "";
  modelo : string = "";
  anio : string = "";
  color: string = "";
  dominio: string = "";

  constructor(public dataService:DataService) { }

  ngOnInit() {
 
  }

  ngOnChanges(){

    if(this.objVehiculo != null) {
      this.setControls(this.objVehiculo);
    }

  }

  setControls(auto : Vehiculo){
    if(auto.aireAcondicionado == "si") this.aireAcondicionado = true;
    this.cantPuertas = auto.cantPuertas ;
    this.modelo = auto.modelo;
    this.anio= auto.anio;
    this.color = auto.color;
    this.dominio = auto.dominio;

    this.dataService.getObjectWithParams(environment.apiEmpleado,auto.idEmpleado).subscribe(
        data => { 
                 this.empleado = data.idEmpleado + " - " + data.apellido + "," + data.nombre;
                 console.log(data) 
                },
        err => console.error(err)
      )


  }

}
