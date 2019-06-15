import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasacion',
  templateUrl: './tasacion.component.html',
  styleUrls: ['./tasacion.component.css']
})
export class TasacionComponent implements OnInit {

  public metrosI: number;
  public metrosT: number;
  public costoMI: number;
  public costoMT: number;
  public costoI: number;
  public costoT: number;
  public costo: number;

  public add() {
    this.costoI  = this.metrosI * this.costoMI;
    this.costoT = this.metrosT * this.costoMT;
    this.costo = this.costoI + this.costoT;

  }
  

  constructor() { }

  ngOnInit() {
   
  }

}
