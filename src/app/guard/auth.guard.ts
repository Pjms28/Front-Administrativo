import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { UsuarioModel } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: UsuarioModel;
  constructor(private authService: AuthService, private router: Router){

  }
  canActivate() {

    this.user = this.authService.getCurrentUser()
    if (this.user != null){
      if(this.user.roleId == 1){
        return true;
      }
    }
    else{
      this.authService.set();
      if(this.authService.getCurrentUser()){
        return true;
      }
      else{
      window.location.href = 'http://localhost:4200/login'
      return false;
      }
      
    }
  }
  
}
