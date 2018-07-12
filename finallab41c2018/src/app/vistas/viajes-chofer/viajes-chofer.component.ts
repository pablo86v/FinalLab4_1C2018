import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Viaje } from '../../entidades/viajes';
import { DataService } from '../../servicios/data.service';
import { environment } from '../../../environments/environment';
import { PagerService } from '../../servicios/pager.service';
import { AuthService } from '../../servicios/auth.service';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-viajes-chofer',
  templateUrl: './viajes-chofer.component.html',
  styleUrls: ['./viajes-chofer.component.css']
})
export class ViajesChoferComponent implements OnInit {

  public aViajes : Array<Viaje>;
  public aItems : Array<any>;
  public objViaje : Viaje;
  public userType: string;
  public medioPago : string;
  
  public frmFinalizarViaje = new FormGroup({
    'monto': new FormControl ('',[Validators.required,Validators.min(60)])
   });


  //Atributos para paginado
  pager: any = {};
  pagedItems: any[];
  pageSize : number ;
  availablePageSizes : number[] = environment.availablePageSizes;

  constructor(private route: ActivatedRoute, public dataService: DataService, public pagerService : PagerService , public auth : AuthService, public spinner: NgxSpinnerService) {
  }


  ngOnInit() {
    this.spinner.show();
    this.userType = this.auth.getUsuarioLogueado().tipoUsuario; 
    this.getVistaViajes();
    this.getPageSize();
    setTimeout(() => {
    this.spinner.hide();
    }, 1000);
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

  getVistaViajes(): void{
    this.dataService.getAllWithParams(environment.apiViajes,this.auth.getUsuarioLogueado().idUsuario + ";CH").subscribe(
      data => {
        this.aItems = data
        console.log(this.auth.getUsuarioLogueado().idUsuario);
        // initialize to page 1
        this.setPage(1);
      },
      err => console.error(err)
    );
  }

  // Dado el bindeo desde el modal hacia el objeto, este metodo dispara el ngOnChanges() del modal.
  setObjViaje(idViaje){
    this.dataService.getOne(environment.apiViajes,idViaje).subscribe(
      data => {
          this.objViaje = data;
          this.medioPago = "Medio de pago: " + this.objViaje.medioPago;
      },
      err => console.error(err)
    );
  }

  confirmar(){
    
    this.objViaje.monto = this.frmFinalizarViaje.controls["monto"].value.toString();
    this.objViaje.estado = "Realizado";

    console.log(this.objViaje);

    this.dataService.update(environment.apiViajes,this.objViaje).subscribe(
      data => {console.log(data);
              location.reload(true);
      },
      err => console.error(err)
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

  //recupero params recibidos por queryString
  getParams(){
    this.route.queryParams.subscribe(
      params =>  console.log(params.page)
    );
  }

  
}//class


