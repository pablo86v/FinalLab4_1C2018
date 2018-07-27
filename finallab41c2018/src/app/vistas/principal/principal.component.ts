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

  let obj1 = {"c1":"v1"}
  let obj2 = {"c2":"v2"}
  
  var result = {};
  for(let key in obj1) result[key] = obj1[key];
  for(let key in obj2) result[key] = obj2[key];
  
  console.clear();
  console.log(result);

  }



  

  test(){
    alert("ok");
  }
}
