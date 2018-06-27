import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarAccesoService implements CanActivate {

  constructor(  private router: Router, 
    private auth: AuthService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
      let isLogued = this.auth.isLogued();

      // console.log(isLogued);
 
      if (isLogued ) {
        return true;
      }
      else 
      {
        // this.router.navigate(['/home']);
        this.auth.logOut();
        alert("Sesion expirada");
        return false;
      }

    }
    

}
