import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { CookieService } from 'ngx-cookie-service';
import config from '../../config.js';
import { SidenavService } from './sidenav.service.js';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = config.api+"/Auth/Login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


constructor(private http: HttpClient, private router: Router,private cookieService: CookieService, 
  private sideNavService:SidenavService) {
      
  }

get isLoggedIn() {
    let token = this.cookieService.get('tkn');
    if(token)
    {
      this.loggedIn.next(true);
    }
    else
    {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
}

logout() {
  this.loggedIn.next(false);
  this.cookieService.deleteAll(); 
  this.router.navigate(['/login']);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/* 
 return this.http.get<ProyectoComponent>(url).pipe(
      tap(_ => catchError(this.handleError<ProyectoComponent>(`getProject id=${id}`))
    ));
*/

login(user:User)
{
  return this.http.post<User>(apiUrl,user,httpOptions)
  .pipe(tap((login: User) => catchError(this.handleError<User>('login'))
  ));
}

setUser(user:any): void{
  let _user = user['user_info']
  let struser = JSON.stringify(_user);  

  this.cookieService.set('currentUser', struser);

  //sessionStorage.setItem('currentUser', user_string);
  this.setToken(user.token);
   this.loggedIn.next(true);
}

setToken(token): void{
  //Con cookies
  
  this.cookieService.set('tkn', token);
  
  //sessionStorage.setItem('tkn', token);
}

getCurrentUser()
{
    let user_string = this.cookieService.get("currentUser");
    if(!isNullOrUndefined(user_string) && user_string != ""){
        let user = JSON.parse(user_string);
        return user;
    }
    else{
        return null;
    } 
}
}
export interface User {
  email: string;
  password: string;
}