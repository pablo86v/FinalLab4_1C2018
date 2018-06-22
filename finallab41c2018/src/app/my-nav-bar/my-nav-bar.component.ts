import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { AuthService } from '../servicios/auth.service';
declare var $;


@Component({
  selector: 'app-my-nav-bar',
  templateUrl: './my-nav-bar.component.html',
  styleUrls: ['./my-nav-bar.component.css']
})
export class MyNavBarComponent implements OnInit {


  userType : string ="nobody";
  emailInput : string;
  passwordInput : string;
  labelUsuario : string  = "Iniciar sesión";
  required :boolean = true;


  constructor(private router: Router, private usuarioService: UsuarioService,private auth : AuthService) { }

  ngOnInit() {

  }

  ngOnChanges(){
  
  }

  goTo(page){
     // this.router.navigate([page], { queryParams: { page: 1 } });
    this.router.navigate([page]);
  }


  login(event : any){
    // this.mostrarSpinner = true;

    this.usuarioService.login(this.emailInput, this.passwordInput).subscribe(
      data => 
      {
        console.log(data);
        this.router.navigate(['home']);
        this.userType = this.auth.getUsuarioLogueado().tipo;
        this.labelUsuario = "Bienvenido, " + this.auth.getUsuarioLogueado().nombre;
        localStorage.setItem("userType",this.userType);
      }
    ).add(()=>
    {
      // this.mostrarSpinner = false;
      // this.forma.reset();
     
    })
  }


  setUsuario(tipo){
    switch(tipo) { 
      case "CL": { 
         this.emailInput = "pgomez@gmail.com";
         this.passwordInput = "5555";
         break; 
      } 
      case "CH": { 
        this.emailInput = "hrodriguez@gmail.com";
        this.passwordInput = "3333";
         break; 
      } 
      case "EN": { 
        this.emailInput = "jfermindez@gmail.com";
        this.passwordInput = "2222";
        break; 
     }
      default: { 
         //statements; 
         break; 
      } 
   } 
    // document.getElementById("emailInput").value = this.emailInput;
    // document.getElementById("passwordInput").value = this.passwordInput;
  }




}
