import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Viaje} from '../entidades/viajes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  public viajes : Array<Viaje>;
 
  public apiURL= environment.apiURL + "/viajes/" ;

  private headers: HttpHeaders;

  constructor(public http : HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
   }


  getViajes() : Observable<Array<Viaje>> {
    return this.http.get<Array<Viaje>>(this.apiURL +'traer')
    .pipe(
      tap(data => this.log("getViajes()")),
      catchError(this.handleError('getViajes()', []))
    );

  }


  getVistaViajes() : Observable<Array<any>> {
    return this.http.get<Array<any>>(this.apiURL +'traer-vista')
    .pipe(
      tap(data => this.log("getVistaViajes()")),
      catchError(this.handleError('getVistaViajes', []))
    );

  }

  getOne(id) : Observable<Viaje> {
    return this.http.get<any>(this.apiURL +'traer-uno/'+id)
    .pipe(
      // map(data=>data.json()),
      tap(data => this.log("getOne()")),
      catchError(this.handleError('getOne()',[]))
    );

  }


  updateViaje(viaje : Viaje , idVehiculo : number) : Observable<any> {
    viaje.idVehiculo = idVehiculo;

    return this.http.post<boolean>(this.apiURL +'update',viaje, {headers: this.headers})
    .pipe(
      tap(data => this.log("update()")),
      catchError(this.handleError('update()',[]))
    );
  }


 




  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
 
  private log(message: string) {
    console.log(message);
  }





}


