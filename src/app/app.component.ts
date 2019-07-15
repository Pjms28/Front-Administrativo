import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SolicitudService } from 'src/app/shared/solicitud.service';
import { PeticionService } from 'src/app/shared/peticion.service';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from './guard/auth.guard';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Front-Administrativo-BRICK';
  isLoggedIn$:  Observable<boolean>;
  isForLogin: Boolean; false;
  

  constructor(private userIdle: UserIdleService,private route:ActivatedRoute, private authAPi:AuthService, private solApi:SolicitudService, private ptcApi: PeticionService, private toastr: ToastrService, private auth:AuthGuard){

  }
  ngOnInit() {
    this.isLoggedIn$ = this.authAPi.isLoggedIn;
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    
   // Start watching when user idle is starting and reset if user action is there.
  this.userIdle.onTimerStart().subscribe(count=> {
      var eventList= ['click', 'mouseover','keydown','DOMMouseScroll','mousewheel',
      'mousedown','touchstart','touchmove','scroll','keyup'];
      for(let event of eventList) {
      document.body.addEventListener(event, () =>this.userIdle.resetTimer());
      }
  });
  

  this.userIdle.onTimeout().subscribe(() => {
    this.toastr.info('Sesión expirada.')
    this.authAPi.logout();
    })
    }

}


