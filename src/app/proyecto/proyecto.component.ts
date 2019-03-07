import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {

  ProyectoID: number;
  NombreProyecto: string;
  FechaTerminacion: Date;
  Direccion: string;
  ImgURL: string;
  UbicacionID: number;
  constructor() { }

 
}
