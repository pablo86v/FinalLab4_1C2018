import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Usuario} from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService();


  constructor( private router: Router) {
  }



  public logOut()
  {
      try 
      {
          localStorage.removeItem('token');
          this.router.navigate(['/home']);
      } 
      catch (error) 
      {
          return false;
      }
  }

  public isLogued()
  {
      
    try 
    {
      return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
    } 
    catch (error) 
    {
      return false;
    }
  }

  public getToken()
  {
      try 
      {
          return this.jwtHelper.decodeToken(localStorage.getItem('token'));
      } 
      catch (error) 
      {
          return undefined;
      }
  }

  public getUsuarioLogueado()
  {
      let tokenDecodif = this.getToken()['data'];

      return new Usuario(
          tokenDecodif.nombre, 
          tokenDecodif.apellido, 
          tokenDecodif.dni,
          tokenDecodif.usuario,
          tokenDecodif.password,
          tokenDecodif.domicilio,
          tokenDecodif.tipo,
          tokenDecodif.idUsuario);
  
  }


  
}
