import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ImagenProyecto } from 'imagen-proyecto.model';
import { ImagenesModel } from 'src/app/modelos/imagenes.model';
=======
import { ImagenesModel } from 'src/app/modelos/imagenes.model';
>>>>>>> 1536f9c6ccfae7b5023b2460814189b3bcf840c8


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
  imagenes: ImagenesModel[];
  documentoResumenPdf:string;



  constructor() { }

 
}
