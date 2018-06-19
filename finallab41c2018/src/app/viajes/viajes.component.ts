import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../servicios/viajes.service';
import { Viaje } from '../entidades/viajes';
import { ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  public aViajes : Viaje [];

  constructor(public viajeService : ViajesService,private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.getParams();
    this.getViajes();
  }



  getViajes(): void{
     this.viajeService.getViajes().subscribe(
      data => this.aViajes = data,
      err => console.error(err)
    )
  }


getParams(){
  this.route.queryParams.subscribe(
    params =>  console.log(params.page)
  );

}




  test(){
    alert("ok");
  }




  
}


