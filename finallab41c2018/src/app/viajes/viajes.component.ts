import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajesService } from '../servicios/viajes.service';
import { Viaje } from '../entidades/viajes';


declare var $;

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  public aViajes : Array<Viaje>;
  public aItems : Array<any>;
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


  getColorByState(estado: string):string{
    let color : string = "";
    switch(estado){
      case "Realizado" : {
       color =  "#7FCC14";
       break
      }
      case "Solicitado" : {
        color = "#CCB919";
        break
      }
      case "Cancelado": {
        color= "#FF4011"
        break
      }    
    }
    return color;
  }  



  test(){
    alert("ok");
  }




  
}//class


