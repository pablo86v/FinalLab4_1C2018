import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../entidades/vehiculo';
import { DataService } from '../../servicios/data.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

declare var $;


@Component({
  selector: 'app-alta-viaje',
  templateUrl: './alta-viaje.component.html',
  styleUrls: ['./alta-viaje.component.css']
})
export class AltaViajeComponent implements OnInit {

  public txtMedioPago;

  public frmNuevoViaje = new FormGroup({
    'domicilioOrig': new FormControl ('',Validators.required),
    'domicilioDest': new FormControl ('', Validators.required),
    'fechahora': new FormControl ('',[Validators.required,Validators.min(1980),Validators.max(2018)]),
    'medioPago': new FormControl ('',Validators.required)
   });


  constructor() { }

  ngOnInit() {
  
                
  }


  setMedioPago(tender)
  {
    this.txtMedioPago = tender;
  }

}
