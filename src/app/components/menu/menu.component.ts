import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { Observable } from 'rxjs';

declare var Jquery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
data: UsuarioModel;
  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    $(function () {
      var links = $('.sidebar-links > div');
    
      links.on('click', function () {
        links.removeClass('selected');
        $(this).addClass('selected');
      });
    });
    this.isLoggedIn$ = this.AuthService.isLoggedIn;
    console.log(this.isLoggedIn$)
    this.data = this.AuthService.getCurrentUser();

}

inicio(){
  //this.authApi.change();
  return "http://localhost:4200";
}

}

