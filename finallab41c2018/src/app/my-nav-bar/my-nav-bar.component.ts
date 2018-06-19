import { Component, OnInit } from '@angular/core';
import { Router }       from '@angular/router';

@Component({
  selector: 'app-my-nav-bar',
  templateUrl: './my-nav-bar.component.html',
  styleUrls: ['./my-nav-bar.component.css']
})
export class MyNavBarComponent implements OnInit {


  userType : string ;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTo(page){
 
    // this.router.navigate([page], { queryParams: { page: 1 } });
    this.router.navigate([page]);
  }

}
