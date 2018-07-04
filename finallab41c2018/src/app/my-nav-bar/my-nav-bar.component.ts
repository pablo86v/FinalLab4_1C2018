import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { DataService } from '../servicios/data.service';
declare var $;


@Component({
  selector: 'app-my-nav-bar',
  templateUrl: './my-nav-bar.component.html',
  styleUrls: ['./my-nav-bar.component.css']
})
export class MyNavBarComponent implements OnInit {


  userType : string ;
  emailInput : string;
  passwordInput : string;
  labelUsuario : string  = "Iniciar sesión";
  isLogued :boolean ;


  constructor(private router: Router, private dataService : DataService,private auth : AuthService) { 
   
  }

  ngOnInit() {
    // console.log("Resolution: "+ screen.width);
    this.isLogued = this.auth.isLogued();
    if(this.isLogued){
      this.userType = localStorage.getItem("userType");   
      this.labelUsuario = "Bienvenido, " + this.auth.getUsuarioLogueado().nombre;
    }
     
  }

  ngOnChanges(){

  }

  login(){
    // this.mostrarSpinner = true;

    this.auth.login(this.emailInput, this.passwordInput).subscribe(
      data => 
      {
        // console.log(data);
        this.router.navigate(['home']);
        this.userType = this.auth.getUsuarioLogueado().tipo;
        this.labelUsuario = "Bienvenido, " + this.auth.getUsuarioLogueado().nombre;
        localStorage.setItem("userType",this.userType);
        this.isLogued = this.auth.isLogued();
      }
    ).add(()=>
    {
      // this.mostrarSpinner = false;
      // this.forma.reset();
     
    })
  }

  restoreDB(){
        this.dataService.restoreDB().subscribe(
          data => console.log("Base restaurada"),
          err => console.error(err)
        );
  }


  logOut(){

    this.auth.logOut();
    localStorage.clear();
    this.isLogued = false;

    location.reload();
    this.router.navigate(['home']);
  }

  setUsuario(tipo){
    switch(tipo) { 
      case "CL": { 
         this.emailInput = "pgomez@gmail.com";
         this.passwordInput = "6666";
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

  // goTo(page){
  //    // this.router.navigate([page], { queryParams: { page: 1 } });
  //   this.router.navigate([page]);
  // }


}
