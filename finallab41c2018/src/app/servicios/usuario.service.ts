import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, tap} from 'rxjs/operators';
import { HttpModule } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
   }


    // public apiURL = "http://pablovalenzuela.esy.es/lab4/api/";
    public apiURL = "http://localhost/lab4/api/usuario/";
  private headers: Headers;

  public login(usuario: string, password: string)
  {
    return this.http.post
    (
      this.apiURL + "login/",
      {
        usuario: usuario,
        password: password
      },
      { headers: this.headers }
    )
    .pipe(
      map(data => data.json()), 
      tap(data => localStorage.setItem('token', data.token))
    )
  }

}