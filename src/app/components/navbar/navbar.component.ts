import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  //   $(document).ready(function () {

  //     // $("#sidebar").mCustomScrollbar({
  //     //      theme: "minimal"
  //     // });
  
  //     $('#sidebarCollapse').on('click', function () {
  //         // open or close navbar
  //         $('#sidebar').toggleClass('active');
          
  //         // close dropdowns
  //         $('.collapse.in').toggleClass('in');
  //         // and also adjust aria-expanded attributes we use for the open/closed arrows
  //         // in our CSS
  //         $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  //     });
  //     $('#dismiss').on('click', function () {
  //       // open or close navbar
  //       $('#sidebar').toggleClass('active');

  //     });
  
  // });
  }

}
