import { Component, OnInit } from '@angular/core';
declare var Jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-Administrativo-BRICK';

  ngOnInit() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
  
  /*   $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    }); */
  
  }
}


