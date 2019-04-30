import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SolicitudService } from '../../shared/solicitud.service';
import { ServicioSolicitudModel } from '../../modelos/ServicioSolicitud.model';


@Component({
  selector: 'app-administrar-solicitudes',
  templateUrl: './administrar-solicitudes.component.html',
  styleUrls: ['./administrar-solicitudes.component.css']
})
export class AdministrarSolicitudesComponent implements OnInit {
 
  data:ServicioSolicitudModel[] = [];
  data1:ServicioSolicitudModel[] = [];
  

  constructor(private solApi: SolicitudService,  private router: Router) { }

  ngOnInit() {
    this.solApi.getServSols()
      .subscribe(res => {
      this.data = res;
    }, err => {
      console.log(err);
     
    });
    this.solApi.getServSolsA()
      .subscribe(res => {
      this.data1 = res;
    }, err => {
      console.log(err);
     
    });
  }

  verMas(Serv: any){
    window.localStorage.removeItem("solID");
    window.localStorage.setItem("solID", String(Serv.solicitudID));
    this.router.navigate(['descripcion-solicitud']);
  }

  administrar(Serv: any){
    window.localStorage.removeItem("solID");
    window.localStorage.setItem("solID", String(Serv.solicitudID));
    this.router.navigate(['cambiar-estado']);
  }
  }


