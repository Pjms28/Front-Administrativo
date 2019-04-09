import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud.service';
import { ServicioSolicitudModel } from 'src/app/modelos/ServicioSolicitud.model';
import { EstadoModel } from 'src/app/modelos/estado.model';
import { EstadoService } from 'src/app/shared/estado.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitudModel } from 'src/app/modelos/Solicitud.model';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { ServicioModel } from 'src/app/modelos/servicio.model';

@Component({
  selector: 'app-cambio-estado',
  templateUrl: './cambio-estado.component.html',
  styleUrls: ['./cambio-estado.component.css']
})
export class CambioEstadoComponent implements OnInit {

  constructor(private router: Router,  private solApi: SolicitudService, private esApi: EstadoService, private formBuilder: FormBuilder) { }
  
  data: ServicioSolicitudModel; 
  estados: EstadoModel[]=[];
  cambio: FormGroup;
  usuario: UsuarioModel;
  solicitud: SolicitudModel;
  servicio: ServicioModel;

  ngOnInit() {

    this.cambio = this.formBuilder.group({
      estadoID: [''],
      servicioID:[''],
      servicio:[''],
      solicitudID:[''],
      solicitud:[''],
      estado:['']
    });
    
    let ID = window.localStorage.getItem("solID");
    if(!ID){
      alert("Accion Invalida")
      this.router.navigate(['administrar-solicitudes']);
      return;
    }
    window.localStorage.removeItem("solID");

    this.solApi.getServSol(Number(ID)).
    subscribe(res =>{
      this.data = res;
      this.usuario = this.data.solicitud.usuario;
      this.solicitud = this.data.solicitud;
      this.servicio = this.data.servicio;
      this.cambio.patchValue(res);
    });

    this.esApi.getState().subscribe(res =>{
      this.estados = res;
    })
  }

  onSubmit(){
    this.solApi.updateServSol(this.cambio.value).subscribe(res => {
      this.router.navigate(['administrar-solicitudes']);
    }
    );
  }

}
