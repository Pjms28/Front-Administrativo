import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SolicitudService } from '../../shared/solicitud.service';
import { ServicioSolicitudModel } from '../../modelos/ServicioSolicitud.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-administrar-solicitudes',
  templateUrl: './administrar-solicitudes.component.html',
  styleUrls: ['./administrar-solicitudes.component.css']
})
export class AdministrarSolicitudesComponent implements OnInit {
 
  data:ServicioSolicitudModel[] = [];
  data1:ServicioSolicitudModel[] = [];
  p:any;
  

  constructor(private solApi: SolicitudService,  private router: Router, public toarst: ToastrService) { }

  ngOnInit() {
    this.solApi.getServSols()
      .subscribe(res => {
      this.data = res;
    }, err => {
      this.toarst.error("Ha ocurrido un error: " + err);
     
    });
    this.solApi.getServSolsA()
      .subscribe(res => {
      this.data1 = res;
    }, err => {
      this.toarst.error("Ha ocurrido un error:" + err)
     
    });
  }

  administrar(Serv: any){
    window.localStorage.removeItem("solID");
    window.localStorage.setItem("solID", String(Serv.solicitudID));
    this.router.navigate(['cambiar-estado']);
  }
  }


