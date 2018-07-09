import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicios/data.service';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from '../entidades/empleado';
import { Usuario } from '../entidades/usuario';
declare var $;




@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.css']
})
export class AltaEmpleadoComponent implements OnInit {

  public objEmpleado : Empleado;
  public frmAltaChofer = new FormGroup({
    'nombre': new FormControl  ('', Validators.required),
    'apellido': new FormControl ('', Validators.required),
    'dni': new FormControl  ('', Validators.required),
    'usuario': new FormControl  ('', Validators.required),
    'password': new FormControl  ('', Validators.required),
    'domicilio': new FormControl  ('', Validators.required),
    'cuil': new FormControl  ('', Validators.required),
    'telefono': new FormControl  ('', Validators.required),
    'idVehiculo': new FormControl ('')
   });


  constructor(public dataService: DataService, public router : Router) { }

  ngOnInit() {
  }

  confirmar(){


    this.objEmpleado = new Empleado(
      this.frmAltaChofer.controls["nombre"].value,
      this.frmAltaChofer.controls["apellido"].value,
      this.frmAltaChofer.controls["dni"].value,
      this.frmAltaChofer.controls["usuario"].value,
      this.frmAltaChofer.controls["password"].value,
      this.frmAltaChofer.controls["domicilio"].value,
      "CH",
      this.frmAltaChofer.controls["cuil"].value,
      this.frmAltaChofer.controls["telefono"].value
    );


    console.log(this.objEmpleado);
    
    //Insert doble, primero tbUsuarios, recupero el id y con este dato inserto tbEmpleados
    this.dataService.insert(environment.apiUsuario,this.objEmpleado).subscribe(
      data => {
        this.objEmpleado.idUsuario = data;
        this.dataService.insert(environment.apiEmpleado,this.objEmpleado).subscribe(
          data => {console.log(data)
            this.router.navigate(['/empleados']);
          },
          err => console.error(err)
        );
      
      },
      err => console.error(err)
    ); 

 
  
  } 




}
