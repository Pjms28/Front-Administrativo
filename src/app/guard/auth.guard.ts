import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsuarioModel } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: UsuarioModel;
  constructor(private authService: AuthService, private router: Router){

  }
  canActivate() {

    //Con cookies
    
    this.user = this.authService.getCurrentUser()

    if (this.user != null){
      let roles = this.user['roles'];
      let isAdmin = roles.includes('Admin')

      if(isAdmin){
        return true;
      }
      else{
        return false;
      }
    }
    else {
        this.router.navigate(['/login'])
        return false;
      }
    }
  }
  

