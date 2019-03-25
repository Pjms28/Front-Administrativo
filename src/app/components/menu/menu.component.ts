import { Component, OnInit } from '@angular/core';
declare var Jquery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      var links = $('.sidebar-links > div');
    
      links.on('click', function () {
        links.removeClass('selected');
        $(this).addClass('selected');
      });
    });

}

}

