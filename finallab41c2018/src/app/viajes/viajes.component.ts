import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../servicios/viajes.service';
import { Viaje } from '../entidades/viajes';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  public viajes : any [];

  constructor(public viajeService : ViajesService) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes(): void{

     this.viajeService.getViajes().subscribe(data => console.log(data))
  }

}
