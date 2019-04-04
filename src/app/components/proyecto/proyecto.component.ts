import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {

  proyectoID: number;
  nombreProyecto: string;
  fechaTerminacion: Date;
  direccion: string;
  imgURL: string;
  ubicacionID: number;
  constructor() { }

 
}
