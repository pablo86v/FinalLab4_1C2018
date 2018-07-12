import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {


  private headers: HttpHeaders;

  constructor(public http : HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
   }


 public  fileDownload(parFileName,parData){

 
  var csvData = new Blob([parData], {type: 'text/csv;charset=utf-8;'});
  var csvURL = window.URL.createObjectURL(csvData);
  var tempLink = document.createElement('a');
  tempLink.href = csvURL;
  tempLink.setAttribute('download', parFileName);
  tempLink.click();
  }


  copyToClipBoard(parContent){
    let selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
  
    selBox.value = parContent;
  
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
  
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }




  // getPDF(obj) : Observable<any> {
  //   return this.http.post<any>(environment.apiURL +environment.apiPDF,obj, {headers: this.headers})
  //   .pipe(
  //     tap(data => this.log( "getPDF()")),
  //     catchError(this.handleError("getPDF()",[]))
  //   );
  // }


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
