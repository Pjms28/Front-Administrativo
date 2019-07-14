import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSidenav } from '@angular/material';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor(private authApi:AuthService,private sideNavService: SidenavService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authApi.isLoggedIn;
    this.sideNavService.setSidenav(this.sidenav);
  
  }





}
