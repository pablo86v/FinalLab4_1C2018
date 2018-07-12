import { Component, OnInit } from '@angular/core';

declare var $ ;


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  }


  test(){
    alert("ok");
  }
}
