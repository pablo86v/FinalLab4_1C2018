import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../servicios/viajes.service';
import { Viaje } from '../entidades/viajes';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  public aViajes : Viaje [];

  constructor(public viajeService : ViajesService) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes(): void{
     this.viajeService.getViajes().subscribe(
      data => this.aViajes = data,
      err => console.error(err),
      () => console.log(this.aViajes)
    )
  }



  
}
