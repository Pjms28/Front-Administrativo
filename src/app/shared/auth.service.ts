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
        let user_string = sessionStorage.getItem("currentUser");
        if(!isNullOrUndefined(user_string) && user_string != ""){
            let user_string = sessionStorage.getItem("currentUser");
            let user = JSON.parse(user_string);
            return user;
        }
        else{
            return null;
        }
    }

    getToken(){
        return sessionStorage.getItem("tkn").toString();
    }

    change(){
        let user_string = sessionStorage.getItem("currentUser");
        this.cookieService.set("currentUser", user_string);
        let tkn = sessionStorage.getItem("tkn");
        this.cookieService.set("tkn",tkn);
    }

    set(){
        let user_string = this.cookieService.get("currentUser");
        sessionStorage.setItem("currentUser", user_string);
        let tkn = this.cookieService.get("tkn");
        sessionStorage.setItem("tkn",tkn);
        this.cookieService.delete("currentUser");
        this.cookieService.delete("tkn");

    }
}
