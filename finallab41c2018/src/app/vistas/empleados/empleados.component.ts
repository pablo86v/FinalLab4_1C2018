import { Component, OnInit } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { environment} from '../../../environments/environment';
import { PagerService } from '../../servicios/pager.service';
import { GlobalFunctionsService } from '../../servicios/global-functions.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {


  public aItems : Array<any>;

  //Atributos para paginado
  pager: any = {};
  pagedItems: any[];
  pageSize : number ;
  availablePageSizes : number[] = environment.availablePageSizes;


  constructor(public dataService:DataService,public pagerService : PagerService, public gFx: GlobalFunctionsService,public spinner: NgxSpinnerService) { }

  ngOnInit() {  
    this.spinner.show();
    this.getVistaEmpleados();
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
  
  getVistaEmpleados(): void{
    this.dataService.getView(environment.apiEmpleado).subscribe(
      data => {
        this.aItems = data
        // initialize to page 1
        this.setPage(1);
      },
      err => console.error(err)
    );
    }


    
  downloadCSV(){
    let aux = "Numero de empleado;Apellido y nombre;Usuario;Cuil;Telefono\n";

    this.pagedItems.forEach(element => {
      aux += element.idEmpleado + ";" ; 
      aux += element.empleado + ";" ; 
      aux += element.usuario + ";" ; 
      aux += element.cuil + ";" ; 
      aux += element.telefono + "\n" ; 
    });

   this.gFx.fileDownload("empleados.csv", aux);
  
  } 







}
