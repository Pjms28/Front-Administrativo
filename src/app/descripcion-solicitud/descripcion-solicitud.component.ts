import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SolicitudService } from '../shared/solicitud.service';
import { ServicioSolicitudModel } from '../shared/ServicioSolicitud.model';
@Component({
  selector: 'app-descripcion-solicitud',
  templateUrl: './descripcion-solicitud.component.html',
  styleUrls: ['./descripcion-solicitud.component.css']
})
export class DescripcionSolicitudComponent implements OnInit {

  data : ServicioSolicitudModel;

  constructor(private router: Router, private solApi: SolicitudService) { }

  ngOnInit() {
    let ID = window.localStorage.getItem("solID");
    if(!ID){
      alert("Accion Invalida")
      this.router.navigate(['administrar-solicitudes']);
      return;
    }
    window.localStorage.removeItem("solID");

    this.solApi.getServSol(Number(ID)).subscribe(res =>{
      this.data = res;
      console.log(this.data);
    });
  }

}
