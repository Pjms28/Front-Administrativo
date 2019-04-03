import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SolicitudService } from '../shared/solicitud.service';
import { ServicioSolicitudModel } from '../shared/ServicioSolicitud.model';


@Component({
  selector: 'app-administrar-solicitudes',
  templateUrl: './administrar-solicitudes.component.html',
  styleUrls: ['./administrar-solicitudes.component.css']
})
export class AdministrarSolicitudesComponent implements OnInit {
 
  data:ServicioSolicitudModel[] = [];
  

  constructor(private solApi: SolicitudService,  private router: Router) { }

  ngOnInit() {
    return this.solApi.getServSols()
      .subscribe(res => {
      this.data = res;
      console.log(this.data);
    }, err => {
      console.log(err);
     
    });
  }

  verMas(Serv: any){

    window.localStorage.removeItem("solID");
    window.localStorage.setItem("solID", String(Serv.solicitudID));
    this.router.navigate(['descripcion-solicitud']);

    

  }
  

  }


