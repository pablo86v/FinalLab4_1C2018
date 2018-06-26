import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Vehiculo } from '../entidades/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  public apiURL= environment.apiURL + "/vehiculo/" ;

  constructor(public http : HttpClient) { }



  getVehiculosWithParams(comodidades) : Observable<Array<Vehiculo>> {
    return this.http.get<Array<Vehiculo>>(this.apiURL +'traer-con-comodidades/'+ comodidades)
    .pipe(
      tap(data => this.log("getVehiculosWithParams()")),
      catchError(this.handleError('getVehiculosWithParams()', []))
    );

  }

  getVehiculos() : Observable<Array<Vehiculo>> {
    return this.http.get<Array<Vehiculo>>(this.apiURL +'traer')
    .pipe(
      tap(data => this.log("getVehiculos()")),
      catchError(this.handleError('getVehiculos()', []))
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
