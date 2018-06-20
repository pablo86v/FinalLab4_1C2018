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
  public aItems : any[];
  public objViaje : Viaje;

  constructor(public viajeService : ViajesService,private route: ActivatedRoute) {

  }


  ngOnInit() {
    // this.getParams();
    this.getVistaViajes();
    // this.getViajes();

  }

  // consulta la lista de viajes 
  getViajes(): void{
     this.viajeService.getViajes().subscribe(
      data => this.aViajes = data,
      err => console.error(err)
    )
  }

  getVistaViajes(): void{
    this.viajeService.getVistaViajes().subscribe(
     data => this.aItems = data,
     err => console.error(err)
   )
  }



  // Dado el bindeo desde el modal hacia el objeto, este metodo dispara el ngOnChanges() del modal.
  setObjViaje(idViaje){
     this.viajeService.getOne(idViaje).subscribe(
       data => {
          this.objViaje = data;
          console.info(this.objViaje);
       },
       err => console.error(err)
     )
  }

  //recupero params recibidos por queryString
  getParams(){
    this.route.queryParams.subscribe(
      params =>  console.log(params.page)
    );

  }

  test(){
    alert("ok");
  }




  
}//class


