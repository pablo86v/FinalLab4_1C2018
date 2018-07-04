import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../entidades/vehiculo';
import { DataService } from '../servicios/data.service';
import { environment } from '../../environments/environment';
import { PagerService } from '../servicios/pager.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  aVehiculos : Vehiculo [];
  aItems: any[];

  //Atributos para paginado
  pager: any = {};
  pagedItems: any[];
  pageSize : number ;
  availablePageSizes : number[] = environment.availablePageSizes;


  constructor(public dataService:DataService,public pagerService : PagerService) { }

  ngOnInit() {
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

  getVistaVehiculos(){
    this.dataService.getView("/vehiculo/").subscribe(
      data => {this.aItems = data;
       // initialize to page 1
       this.setPage(1);      
      },
      err => console.error(err)  
    );
  }


  getColorByState(estado: string):string{
    if(estado == "Activo")
    {
      return "#7FCC14";
    }else{
      return "#FF4011";
    }
    
  }  

}
