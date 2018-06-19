import { Injectable } from '@angular/core';
import {Viaje} from '../entidades/viajes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  public viajes : Viaje[];
  // public apiURL = "http://pablovalenzuela.esy.es/lab4/api/viajes";
  public apiURL = "http://localhost/api/viajes";

  constructor(public http : HttpClient) { }


  getViajes() : Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.apiURL)
    .pipe(
      tap(data => this.log("fetched data")),
      catchError(this.handleError('getViajes', []))
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


