import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { HttpModule } from '@angular/http';
declare var $;


@Component({
  selector: 'app-my-nav-bar',
  templateUrl: './my-nav-bar.component.html',
  styleUrls: ['./my-nav-bar.component.css']
})
export class MyNavBarComponent implements OnInit {


  userType : string ;
  public emailInput = "jfermindez@gmail.com";
  public passwordInput = "2222";



  constructor(private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  
  }

  goTo(page){
     // this.router.navigate([page], { queryParams: { page: 1 } });
    this.router.navigate([page]);
  }


  public login(event : any)
  {
    // this.mostrarSpinner = true;

    this.usuarioService.login(this.emailInput, this.passwordInput).subscribe(
      data => 
      {
        console.log(data);
        this.router.navigate(['home']);
      
      }
    ).add(()=>
    {
      // this.mostrarSpinner = false;
      // this.forma.reset();
     
    })
  }

  // public setUsuario(tipo)
  // {
  //   console.log(tipo);

  //   switch(tipo)
  //   {
  //     case 'encargado':
  //       this.forma.setValue({correo:"jfermindez@gmail.com", password: "2222"});
  //     break;
  //     case 'cliente':
  //       this.forma.setValue({correo:"pgomez@gmail.com", password: "5555"});
  //     break;
  //     case 'chofer':
  //       this.forma.setValue({correo:"ealvarez@gmail.com", password: "4444"});
  //     break;
  //   }
  // }


}
