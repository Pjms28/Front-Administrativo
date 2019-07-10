import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SolicitudService } from 'src/app/shared/solicitud.service';
import { PeticionService } from 'src/app/shared/peticion.service';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from './guard/auth.guard';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Front-Administrativo-BRICK';
  isLoggedIn$:  Observable<boolean>;
  isForLogin: Boolean; false;
  

  constructor(private route:ActivatedRoute, private authAPi:AuthService, private solApi:SolicitudService, private ptcApi: PeticionService, private toastr: ToastrService, private auth:AuthGuard){

  }
  ngOnInit() {
    let route =  window.location.pathname;

    if(route == "/login")
    {
      this.isForLogin = true;
    }

    this.isLoggedIn$ = this.authAPi.isLoggedIn;
   
}

}
