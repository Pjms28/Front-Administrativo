import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  ProyectoID: number;
  NombreProyecto: string;
  FechaTerminacion: Date;
  Direccion: string;
  ImgURL: string;
  UbicacionID: number;
  Ciuda: string;

  

  constructor(private api: ApiService) { }

  ngOnInit() {
    
  }

}
