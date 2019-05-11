import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

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
        
        /*let user_string = sessionStorage.getItem("currentUser");
        if(!isNullOrUndefined(user_string) && user_string != ""){
            let user = JSON.parse(user_string);
            return user;
        }
        else{
            return null;
        }*/
    }

    getToken(){
        //Con cookies
         
            return this.cookieService.get("tkn").toString();
        
        //return sessionStorage.getItem("tkn").toString();
    }

   /*change(){
    let user = this.getCurrentUser();
    let user_string = JSON.stringify(user);
    let tkn = this.getToken();
    localStorage.setItem("currentUser", user_string);
    localStorage.setItem("tkn", tkn);
    }

   set(){
        let user = localStorage.getItem("currentUser");
        let tkn = localStorage.getItem("tkn");
        sessionStorage.setItem("currentUser", user)
        sessionStorage.setItem("tkn", tkn)
        localStorage.removeItem("currentUser");
        localStorage.removeItem("tkn");
    }*/
}
