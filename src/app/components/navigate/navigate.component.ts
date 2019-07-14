import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  APP_NAME:string = "BRICK";
  
  constructor(private cookieService: CookieService, private router: Router, private authService: AuthService ) { }

  ngOnInit() {
  }

  onCerrarSesion()
  {
   this.authService.logout();
   
  }

}
