import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Viaje } from '../entidades/viajes';
import { DataService } from '../servicios/data.service';
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
  public apiName = "/viaje/";

  constructor(private route: ActivatedRoute, public dataService: DataService) {

  }


  ngOnInit() {
    this.getVistaViajes(); 
  }


  getVistaViajes(): void{
    this.dataService.getView(this.apiName).subscribe(
     data => this.aItems = data,
     err => console.error(err)
   )
  }


  // Dado el bindeo desde el modal hacia el objeto, este metodo dispara el ngOnChanges() del modal.
  setObjViaje(idViaje){
    this.dataService.getOne(this.apiName,idViaje).subscribe(
      data => {
         this.objViaje = data;
         console.info(this.objViaje);
      },
      err => console.error(err)
    )
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


  //recupero params recibidos por queryString
  // getParams(){
  //   this.route.queryParams.subscribe(
  //     params =>  console.log(params.page)
  //   );
  // }

  
}//class


