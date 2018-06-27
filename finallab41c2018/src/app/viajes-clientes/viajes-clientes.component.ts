import { Component, OnInit } from '@angular/core';
import { Viaje } from '../entidades/viajes';

@Component({
  selector: 'app-viajes-clientes',
  templateUrl: './viajes-clientes.component.html',
  styleUrls: ['./viajes-clientes.component.css']
})
export class ViajesClientesComponent implements OnInit {


  public aViajes : Array<Viaje>;

  constructor() { }

  ngOnInit() {
 
  }



}
