import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor() {
  
  }

  ngOnInit() {
    const table: any = $('table');
    this.dataTable = table.DataTable();
  }

}
