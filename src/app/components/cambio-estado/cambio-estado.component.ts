import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud.service';
import { ServicioSolicitudModel } from 'src/app/modelos/ServicioSolicitud.model';
import { EstadoModel } from 'src/app/modelos/estado.model';
import { EstadoService } from 'src/app/shared/estado.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  ngOnInit() {

    let ID = window.localStorage.getItem("solID");
    if(!ID){
      alert("Accion Invalida")
      this.router.navigate(['administrar-solicitudes']);
      return;
    }
    window.localStorage.removeItem("solID");

    this.cambio = this.formBuilder.group({
      estadoID:['']
    });
    

    this.solApi.getServSol(Number(ID)).subscribe(res =>{
      this.data = res;
    });

    this.esApi.getState().subscribe(res =>{
      this.estados = res;
    })
  }

  onSubmit(){
    console.log(this.cambio.value);
    //this.solApi.updateServSol(this.data).subscribe(res => {
      //this.router.navigate(['administrar-solicitudes']);
    //}
    //);
  }

}
