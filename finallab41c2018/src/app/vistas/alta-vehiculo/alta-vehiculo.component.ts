import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../entidades/vehiculo';
import { DataService } from '../../servicios/data.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
declare var $;

const URL = environment.apiURL + environment.apiVehiculos + "guardar-imagen";

@Component({
  selector: 'app-alta-vehiculo',
  templateUrl: './alta-vehiculo.component.html',
  styleUrls: ['./alta-vehiculo.component.css']
})
export class AltaVehiculoComponent implements OnInit {

  public uploader       : FileUploader;
  public objVehiculo    : Vehiculo;
  public txtPuertas     : string ;
  public labelInputFile : string;
  public imgVehiculo    : string = "../../assets/placeholders/carPlaceholder2.png";


  public frmAltaVehiculo = new FormGroup({
    'idEmpleado': new FormControl ('',Validators.min(1)),
    'modelo': new FormControl ('', Validators.required),
    'anio': new FormControl ('',[Validators.required,Validators.min(1980),Validators.max(2018)]),
    'color': new FormControl ('',Validators.required),
    'dominio': new FormControl ('',[Validators.required,this.validarDominio ] ),
    'cantPuertas' : new FormControl('',Validators.required),
    'utilitario' : new FormControl(''),
    'aireAcondicionado' : new FormControl(''),
    'foto' : new FormControl('', Validators.pattern(/jpg$|JPG$|png$|PNG$/))
   });

 
  constructor (public dataService:DataService, public router : Router){
  
  }
 
  ngOnInit() {
    this.setUploader();
  }

  selectedFile($event){
   this.labelInputFile = $event.target.files[0].name;
   console.log($event.target.files[0]);
 
  }

  // Modifico el input con la cant de puertas
  setCantPuertas(cant){
    // this.txtPuertas = cant;

    this.frmAltaVehiculo.get("cantPuertas").setValue(cant);
 
  }

  confirmar(){

      this.objVehiculo = new Vehiculo(
        this.frmAltaVehiculo.controls["idEmpleado"].value,
        this.frmAltaVehiculo.controls["modelo"].value,
        this.frmAltaVehiculo.controls["anio"].value,
        this.frmAltaVehiculo.controls["color"].value,
        this.frmAltaVehiculo.controls["dominio"].value.toString().toUpperCase(),
        this.frmAltaVehiculo.controls["cantPuertas"].value,
        this.frmAltaVehiculo.controls["utilitario"].value == true ? "true": "false",
        this.frmAltaVehiculo.controls["aireAcondicionado"].value == true ? "true": "false",
        "Activo", //Estado por default
        this.imgVehiculo
      );

      // insert a la bbdd
      this.dataService.insert(environment.apiVehiculos,this.objVehiculo).subscribe(
        data => {console.log(data)
          this.router.navigate(['/vehiculos']);
        },
        err => console.error(err)
      );
    
  }

  subirFoto(){
    this.uploader.uploadAll();
  }

  setUploader(){
    this.uploader = new FileUploader({
      url: URL  
    });
    this.uploader.onBeforeUploadItem= (item)=>{item.withCredentials=false}
    this.uploader.onSuccessItem=(response,status)=>{this.imgVehiculo= environment.apiURL + "/assets/img/vehiculos/" + response.file.name}
  
    this.uploader.onBeforeUploadItem=(item)=>
    {
      // CAMBIAR NOMBRE DEL ARCHIVO A SUBIR
      let aux = item['file'].name;
      let extension = aux.substring(aux.length -4 ,aux.length);

      item['file'].name = this.frmAltaVehiculo.value.dominio + extension;
      item.withCredentials = false;
      // console.log(this.frmAltaVehiculo.get('foto').value);
    }
    
  }

  validarDominio(control: FormControl)
  {
      let cadena = (<String>control.value).toUpperCase();

      if(cadena == "")
          return null;

      if(
          /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(cadena) ||  /^[A-Z]{3}\d{3}$/.test(cadena)
      )
          return null;
      
      return {
          formato: true
      }
  }

 

}
