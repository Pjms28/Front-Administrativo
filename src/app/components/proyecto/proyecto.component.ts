import { Component, OnInit } from '@angular/core';
import { ImagenProyecto } from 'imagen-proyecto.model';


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
  latitude: number;
  longitude: number;
  Imagenes: ImagenProyecto[]
  constructor() { }

 
}
