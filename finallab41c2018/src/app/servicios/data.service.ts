import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public apiURL= environment.apiURL ;
  private headers: HttpHeaders;

  constructor(public http : HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
   }

   //Array puro de una entidad
   getAll(apiName) : Observable<Array<any>> {
    return this.http.get<Array<any>>(this.apiURL + apiName + 'traer')
    .pipe(
      tap(data => this.log(apiName+"::getAll()")),
      catchError(this.handleError('getAll()', []))
    );
  }

  //Array custom que puede ser join de tablas
  getAllWithParams(apiName,params) : Observable<Array<any>> {
    return this.http.get<Array<any>>(this.apiURL + apiName + 'traer-con-params/'+ params)
    .pipe(
      tap(data => this.log(apiName + "::getAllWithParams()")),
      catchError(this.handleError(apiName + '::getAllWithParams()', []))
    );

  }

  // Objeto custom que puede ser un join de tablas
  getObjectWithParams(apiName,params) : Observable<any> {
    return this.http.get<Array<any>>(this.apiURL + apiName + 'traer-objeto-con-params/'+ params)
    .pipe(
      tap(data => this.log(apiName + "::getObjectWithParams()")),
      catchError(this.handleError(apiName + '::getObjectWithParams()', []))
    );

  }

  //Recupero una vista para cargar una grilla
  getView(apiName) : Observable<Array<any>> {
    return this.http.get<Array<any>>(this.apiURL + apiName +'traer-vista')
    .pipe(
      tap(data => this.log(apiName + "::getView()")),
      catchError(this.handleError(apiName + '::getView', []))
    );
  }

  //Objeto puro de una entidad
  getOne( apiName,id) : Observable<any> {
    return this.http.get<any>(this.apiURL + apiName +'traer-uno/'+id)
    .pipe(
      // map(data=>data.json()),
      tap(data => this.log(apiName + "::getOne()")),
      catchError(this.handleError(apiName + '::getOne()',[]))
    );
  }

  //Actualizo un objeto
  update(apiName,obj) : Observable<any> {
    return this.http.post<boolean>(this.apiURL + apiName + 'update',obj, {headers: this.headers})
    .pipe(
      tap(data => this.log(apiName + "::update()")),
      catchError(this.handleError(apiName + '::update()',[]))
    );
  }


  insert(apiName,obj):  Observable<any> {
    return this.http.post<boolean>(this.apiURL + apiName + 'insertar',obj, {headers: this.headers})
    .pipe(
      tap(data => this.log(apiName + "::insert()")),
      catchError(this.handleError(apiName + '::insert()',[]))
    );

  }




  // ******************************************************************
  // *********************  FUNCIONES MISC ****************************
  // ******************************************************************

  public restoreDB()  {
    return this.http.get(this.apiURL +'/usuario/restoreDB')
    .pipe(
      tap(data => console.log("restoreDB()")));
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
