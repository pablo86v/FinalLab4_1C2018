import { Component, OnInit , NgZone, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Viaje } from '../../entidades/viajes';
import { AuthService } from '../../servicios/auth.service';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

declare var $;
// declare var google: any;


@Component({
  selector: 'app-alta-viaje',
  templateUrl: './alta-viaje.component.html',
  styleUrls: ['./alta-viaje.component.css']
})
export class AltaViajeComponent implements OnInit {

  @ViewChild('search') public searchElementOrigen: ElementRef;
  @ViewChild('searchDestino') public searchElementDestino: ElementRef;

  public coordenadasOrig :string;
  public coordenadasDest :string;
  public comodidades : string = "false;false;false";
  public objViaje : Viaje;
  public idViaje;
  public txtTitulo = "Nuevo viaje";
  public frmNuevoViaje = new FormGroup({
    'domicilioOrig': new FormControl ('',Validators.required),
    'domicilioDest': new FormControl ('', Validators.required),
    'fechaViaje': new FormControl ('',[Validators.required,Validators.min(1980),Validators.max(2018)]),
    'medioPago': new FormControl ('',Validators.required),
    'captcha' :new FormControl ('',Validators.required)
   });


  constructor(public dataService:DataService, public authService : AuthService, public route:ActivatedRoute, public router : Router,
     public mapsAPILoader : MapsAPILoader, public ngZone : NgZone) { }

  ngOnInit() {
    this.inicializarGooglePlacesOrigen();
    this.inicializarGooglePlacesDestino();

    this.route.params.subscribe(params => {
      this.idViaje = params['idViaje'] ;
      if(this.idViaje != undefined) this.enableEditMode(this.idViaje);
      
    });
                
  }

  setComodidades(comodidades : string){
    this.comodidades = comodidades;

  }

  enableEditMode(idViaje){
    this.txtTitulo= "Editar viaje #" + idViaje;

    //Recupero de la BBDD el viaje recibido por param
    this.dataService.getOne(environment.apiViajes,idViaje).subscribe(
      data => 
      {
        this.objViaje = data;
        // valido que el viaje le pertenezca al usuario logueado
        if(this.authService.getUsuarioLogueado().idUsuario==data.idCliente){
          this.frmNuevoViaje.get("domicilioOrig").setValue(data.domicilioOrig);
          this.frmNuevoViaje.get("domicilioDest").setValue(data.domicilioDest);
          this.frmNuevoViaje.get("fechaViaje").setValue(data.fechaViaje);
          this.frmNuevoViaje.get("medioPago").setValue(data.medioPago);
        }else{
          alert("No puede editar este viaje");
          this.router.navigate(['/viajes-cliente']);
        }
       } 
    );

  }

  setMedioPago(tender)
  {
    this.frmNuevoViaje.get("medioPago").setValue(tender);
  }

  confirmar(){
    if(this.idViaje==null){


       //************  INSERT ***********************

      this.objViaje= new Viaje(
        null,
        this.authService.getUsuarioLogueado().idUsuario,
        this.comodidades,
        this.frmNuevoViaje.controls["domicilioOrig"].value,
        this.frmNuevoViaje.controls["domicilioDest"].value,
        this.coordenadasOrig,
        this.coordenadasDest,
        "0",
        "Solicitado",
        this.frmNuevoViaje.controls["fechaViaje"].value,
        this.frmNuevoViaje.controls["medioPago"].value
      );
  
      // console.log(this.objViaje);
      
      if(confirm("¿Confirmar viaje?")){
        this.dataService.insert(environment.apiViajes,this.objViaje).subscribe(
          data => console.log(data)
        );
        location.reload(true); 
        this.router.navigate(['/viajes-cliente']);
      }

    }else{

      //************  UPDATE ***********************

      this.objViaje.comodidades = this.comodidades;
      this.objViaje.domicilioOrig = this.frmNuevoViaje.controls["domicilioOrig"].value;
      this.objViaje.domicilioDest = this.frmNuevoViaje.controls["domicilioDest"].value;
      // Actualizar las coordenadas con maps-
      this.objViaje.fechaViaje =  this.frmNuevoViaje.controls["fechaViaje"].value;
      this.objViaje.medioPago = this.frmNuevoViaje.controls["medioPago"].value;
    
      console.log(this.objViaje);

      if(confirm("¿Confirmar cambios en el viaje?")){
        this.dataService.update(environment.apiViajes,this.objViaje).subscribe(
          data => console.log(data)
        );
        location.reload(true); 
        this.router.navigate(['/viajes-cliente']);
      }

    }


  }

  inicializarGooglePlacesOrigen()
  {
    let place: google.maps.places.PlaceResult;
    let autocomplete;
    this.mapsAPILoader.load().then(
      () => 
      {
        autocomplete = new google.maps.places.Autocomplete(this.searchElementOrigen.nativeElement, { types:["address"] });
  

        autocomplete.addListener("place_changed", () => 
        {
          this.ngZone.run(
            () => 
            {
              place = autocomplete.getPlace();
              if(place.geometry === undefined || place.geometry === null )
                return;
              else
              {
               this.coordenadasOrig = place.geometry.location.lat() + "," + place.geometry.location.lng()
                // this.zoomOrigen = 15;
               this.frmNuevoViaje.get('domicilioOrig').setValue(place.formatted_address);  

              }
            });
        });
      });
  }

  inicializarGooglePlacesDestino()
  {
    let place: google.maps.places.PlaceResult;
    let autocomplete;
    this.mapsAPILoader.load().then(
      () => 
      {
        autocomplete = new google.maps.places.Autocomplete(this.searchElementDestino.nativeElement, { types:["address"] });
  

        autocomplete.addListener("place_changed", () => 
        {
          this.ngZone.run(
            () => 
            {
              place = autocomplete.getPlace();
              if(place.geometry === undefined || place.geometry === null )
                return;
              else
              {
               this.coordenadasDest = place.geometry.location.lat() + "," + place.geometry.location.lng()
                // this.zoomOrigen = 15;
                this.frmNuevoViaje.get('domicilioDest').setValue(place.formatted_address);  
              }
            });
        });
      });
  }

  

}
