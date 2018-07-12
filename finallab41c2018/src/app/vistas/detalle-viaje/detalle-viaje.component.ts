import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../servicios/data.service';
import { GlobalFunctionsService } from '../../servicios/global-functions.service';
import { AuthService } from '../../servicios/auth.service';
import { Viaje } from '../../entidades/viajes';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';
declare var $;

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.component.html',
  styleUrls: ['./detalle-viaje.component.css']
})
export class DetalleViajeComponent implements OnInit {

  public idViaje : string;
  public objViaje : Viaje;
  public latOrigen;
  public lngOrigen;
  public latDestino;
  public lngDestino;
  public directionDisplay;
  public rutasAlternativas = [];
  public distancia;
  public tiempoDemora;

  constructor(private route: ActivatedRoute, public dataService: DataService, public auth : AuthService, 
    public gFx : GlobalFunctionsService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idViaje = params['idViaje'] ;
      if(this.idViaje != undefined){
        this.getObjViaje(this.idViaje);
        
      } 
      
    });

  }

  public  getObjViaje(idViaje :String){

    this.dataService.getOne(environment.apiViajes,idViaje).subscribe(
      data => {
          this.objViaje = data;
          console.info(this.objViaje);
          this.calcularRuta(this.objViaje);
      },
      err => console.error(err)
    )
  }

  private calcularRuta(objViaje : Viaje)
  {

    let aux = objViaje.coordenadasOrig.split(",");
    this.latOrigen = aux[0];
    this.lngOrigen = aux[1];

    aux = objViaje.coordenadasDest.split(",");
    this.latDestino = aux[0];
    this.lngDestino = aux[1];

    let self = this;
    let directionService = new google.maps.DirectionsService;
    
    let obj = $("#map")[0];

    let map = new google.maps.Map(obj, {
      zoom: 6,
      center: new google.maps.LatLng(this.latOrigen, this.lngOrigen)
    });

    this.directionDisplay.setMap(map);
    let origen = new google.maps.LatLng(this.latOrigen, this.lngOrigen);
    let destino = new google.maps.LatLng(this.latDestino, this.lngDestino);

    directionService.route({
      origin: origen,
      destination: destino,
      provideRouteAlternatives: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, 
    function(response, status)
    {
      console.log(response);
      if(status == google.maps.DirectionsStatus.OK)
      {
        self.directionDisplay.setDirections(response);
        self.rutasAlternativas = response.routes;
        self.distancia = response.routes[0].legs[0].distance.text;
        self.tiempoDemora = response.routes[0].legs[0].duration.text;
        
      }
    });
  }


}
