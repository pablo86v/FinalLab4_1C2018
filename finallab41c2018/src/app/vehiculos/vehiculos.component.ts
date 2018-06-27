import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../entidades/vehiculo';
import { DataService } from '../servicios/data.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  aVehiculos : Vehiculo [];
  aItems: any[];

  constructor(public dataService:DataService) { }

  ngOnInit() {
    this.getVistaVehiculos();
  }


  getVistaVehiculos(){
    this.dataService.getView("/vehiculo/").subscribe(
      data => this.aItems = data,
      err => console.error(err)  
    );
  }



}
