import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsuarioModel } from '../modelos/usuario.model';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: UsuarioModel;
  constructor(private authService: AuthService, private router: Router){

  }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        this.user = this.authService.getCurrentUser()
        let isAdmin = false;
        if (this.user != null){
          let roles = this.user['roles'];
          isAdmin = roles.includes('Admin')
          this.router.navigate(['']);
        }
        if (!isLoggedIn && !isAdmin) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
  }
  

