import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
declare var Jquery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
data: UsuarioModel;
  constructor(private authApi: AuthService) { }

  ngOnInit() {
    $(function () {
      var links = $('.sidebar-links > div');
    
      links.on('click', function () {
        links.removeClass('selected');
        $(this).addClass('selected');
      });
    });

    this.data = this.authApi.getCurrentUser();
}

inicio(){
  //this.authApi.change();
  return "http://localhost:4200";
}

}

