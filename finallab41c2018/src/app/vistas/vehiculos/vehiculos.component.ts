import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../entidades/vehiculo';
import { DataService } from '../../servicios/data.service';
import { environment } from '../../../environments/environment';
import { PagerService } from '../../servicios/pager.service';
import { GlobalFunctionsService } from '../../servicios/global-functions.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $;

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  aVehiculos : Vehiculo [];
  aItems: any[];
  chkEstado : boolean = true;
  public objVehiculo : Vehiculo;


  //Atributos para paginado
  pager: any = {};
  pagedItems: any[];
  pageSize : number ;
  availablePageSizes : number[] = environment.availablePageSizes;


  constructor(public dataService:DataService,public pagerService : PagerService, public gFx : GlobalFunctionsService, public spinner: NgxSpinnerService) { 

   }

  ngOnInit() {
    this.spinner.show();
    this.getVistaVehiculos();
    this.getPageSize();
    
  
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.aItems.length, page, this.pageSize);

    // get current page of items
    this.pagedItems = this.aItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  changePageSize(newPageSize : number):void{
    this.pageSize = newPageSize;
    localStorage.setItem("pageSize",this.pageSize.toString());
    this.setPage(1);
  }

  getPageSize(){
    if(localStorage.getItem("pageSize") == undefined){
      this.pageSize = this.availablePageSizes[0];
    }else{
      this.pageSize = Number(localStorage.getItem("pageSize"));
    }
  }

  getEstate(estado: string):boolean{
    if(estado == "Activo")
    {
      return true;
    }else{
      return false;
    }
  }

  changeState(event,objVehiculo){


    if( confirm("¿Desea modificar el estado del vehiculo #" + objVehiculo.idVehiculo + "?" )){
      let estado = objVehiculo.estado ;
      //invierto el estado 
      objVehiculo.estado = estado == "Activo" ? "Inactivo" : "Activo"
      
      //Recupero el obj vehiculo a modificar
      this.setObjVehiculo(objVehiculo.idVehiculo);
  
      //Ejecuto el update contra la BBDD
      this.dataService.update(environment.apiVehiculos,objVehiculo).subscribe(
        data => console.log(data),
        err => console.error(err)
      )
    }else{
      event.target.checked = !event.target.checked;

    }



  }

  getVistaVehiculos(){
    this.dataService.getView(environment.apiVehiculos).subscribe(
      data => {this.aItems = data;
       // initialize to page 1
       this.setPage(1);      
       setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      },
      err => console.error(err)  
    );
  }


    // Dado el bindeo desde el modal hacia el objeto, este metodo dispara el ngOnChanges() del modal.
    setObjVehiculo(idVehiculo){
      this.dataService.getOne(environment.apiVehiculos,idVehiculo).subscribe(
        data => {
            this.objVehiculo = data;
            // console.info(this.objVehiculo);
        },
        err => console.error(err)
      )
    }

  getColorByState(estado: string):string{
    if(estado == "Activo")
    {
      return "#7FCC14";
    }else{
      return "#FF4011";
    }
    
  }  

 
  
  downloadCSV(){
    let aux = "Numero de vehiculo;Chofer;Modelo;Dominio;Estado\n";

    this.pagedItems.forEach(element => {
      aux += element.idVehiculo + ";" ; 
      aux += element.chofer + ";" ; 
      aux += element.modelo + ";" ; 
      aux += element.dominio + ";" ; 
      aux += element.estado + "\n";
    });

   this.gFx.fileDownload("vehiculos.csv", aux);
  
  } 


}
