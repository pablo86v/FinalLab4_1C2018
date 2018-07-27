import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Viaje } from '../../entidades/viajes';
import { DataService } from '../../servicios/data.service';
import { environment } from '../../../environments/environment';
import { PagerService } from '../../servicios/pager.service';
import { Vehiculo } from '../../entidades/vehiculo';
import { AuthService } from '../../servicios/auth.service';
import { GlobalFunctionsService } from '../../servicios/global-functions.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-viajes-encargado',
  templateUrl: './viajes-encargado.component.html',
  styleUrls: ['./viajes-encargado.component.css']
})
export class ViajesEncargadoComponent implements OnInit {

  public aViajes : Array<Viaje>;
  public aItems : Array<any>;
  public objViaje : Viaje;
  public objVehiculo : Vehiculo;
  public userType: string;
  public txtFiltroEstado : string; 


  //Atributos para paginado
  pager: any = {};
  pagedItems: any[];
  pageSize : number ;
  availablePageSizes : number[] = environment.availablePageSizes;

  constructor(private route: ActivatedRoute, public dataService: DataService, public pagerService : PagerService, public auth : AuthService, 
    public gFx : GlobalFunctionsService, public spinner: NgxSpinnerService) {
  }


  ngOnInit() {
    this.spinner.show();
    this.userType = this.auth.getUsuarioLogueado().tipoUsuario; 
    this.getVistaViajes();
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

  filtrar(event :any){
      // if the value is an empty string don't filter the items
      let filtro = event.target.value;

      if ( filtro.trim() != "")
      {
           this.pagedItems = this.aItems.filter((item) => {
            return (item.cliente.trim().toLowerCase().indexOf(filtro.toLocaleLowerCase())>-1);
         });

      }else{
        this.ngOnInit();
      }
     
  }

  getVistaViajes(): void{
  this.dataService.getView(environment.apiViajes).subscribe(
    data => {
      this.aItems = data
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
  setObjViaje(idViaje){
    this.dataService.getOne(environment.apiViajes,idViaje).subscribe(
      data => {
          this.objViaje = data;
          console.info(this.objViaje);
      },
      err => console.error(err)
    )
  }


    // Dado el bindeo desde el modal hacia el objeto, este metodo dispara el ngOnChanges() del modal.
  setObjVehiculo(idVehiculo){
    this.dataService.getOne(environment.apiVehiculos,idVehiculo).subscribe(
      data => {
          this.objVehiculo = data;
          console.info(this.objVehiculo);
      },
      err => console.error(err)
    )
  }
  

  downloadCSV(){
    let aux = "Numero de viaje;Cliente;Numero vehiculo;Fecha-hora; Destino;Estado\n";

    this.pagedItems.forEach(element => {
      aux += element.idViaje + ";" ; 
      aux += element.cliente + ";" ; 
      aux += (element.idVehiculo == null? "No asignado" : element.idVehiculo) + ";" ;
      aux += element.fechaViaje.replace("T"," ") + ";";
      aux += element.domicilioDest + ";" ;
      aux += element.estado + "\n";
    });

   this.gFx.fileDownload("viajes.csv", aux);
  
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
  getParams(){
    this.route.queryParams.subscribe(
      params =>  console.log(params.page)
    );
  }

  
}//class


