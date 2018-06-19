import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-elegir-vehiculo',
  templateUrl: './modal-elegir-vehiculo.component.html',
  styleUrls: ['./modal-elegir-vehiculo.component.css']
})
export class ModalElegirVehiculoComponent implements OnInit {

  txtPuertas :string  ;

  constructor() { }

  ngOnInit() {
    this.txtPuertas = "Indistinto"
  }

  setCantPuertas(cant){
    console.log(cant)
    this.txtPuertas = cant;
  }


  test(){
    alert("ok");
  }


}
