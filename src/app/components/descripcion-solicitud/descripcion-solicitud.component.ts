import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SolicitudService } from '../../shared/solicitud.service';
import { ServicioSolicitudModel } from '../../modelos/ServicioSolicitud.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaService } from 'src/app/shared/visita.service';
@Component({
  selector: 'app-descripcion-solicitud',
  templateUrl: './descripcion-solicitud.component.html',
  styleUrls: ['./descripcion-solicitud.component.css']
})
export class DescripcionSolicitudComponent implements OnInit {

  data : ServicioSolicitudModel;
  addForm: FormGroup;

  constructor(private router: Router, private solApi: SolicitudService, private formBuilder: FormBuilder, public ageService: VisitaService) { }

  ngOnInit() {
    let ID = window.localStorage.getItem("solID");
    if(!ID){
      alert("Accion Invalida")
      this.router.navigate(['administrar-solicitudes']);
      return;
    }
    window.localStorage.removeItem("solID");

    this.addForm = this.formBuilder.group({
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo: "Solicitud",
      descripcion:[''],
      solicitudID:['']
    });
    
    return this.solApi.getServSol(Number(ID)).subscribe(res =>{
      this.data = res;
      console.log(this.data)
    });
  }

  date(date: string){
    var myDate = new Date(date);
    return myDate;
  }

  onSubmit(){
    this.addForm.controls['solicitudID'].setValue(this.data.solicitud.solicitudID);
    this.addForm.controls['descripcion'].setValue(this.data.solicitud.comentario);
    this.ageService.addVisit(this.addForm.value).subscribe(res =>{
    this.router.navigate(['agendar-visita']);
    });
    this.data.estadoID = 1;
    this.solApi.updateServSol(this.data).subscribe(res => {
      console.log("llamo");
    }
    );
  }
}
