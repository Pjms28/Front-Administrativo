import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { UsuarioModel } from 'src/app/modelos/usuario.model';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  APP_NAME:string = "BRICK";
  user: string;
  constructor(private sideNavService: SidenavService,private cookieService: CookieService, private router: Router, private authService: AuthService ) { }

  ngOnInit() {

    let currentUser = this.authService.getCurrentUser();
    
    this.user = currentUser.nombreUsuario +" "+currentUser.apellidosUsuario;
   
  }

  onCerrarSesion()
  {
   this.authService.logout();
   this.toggleSideBar();
  }

  toggleSideBar(){
  
  }

}
