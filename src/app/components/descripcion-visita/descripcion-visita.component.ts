import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SolicitudService } from '../../shared/solicitud.service';
import { ServicioSolicitudModel } from '../../modelos/ServicioSolicitud.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaService } from 'src/app/shared/visita.service';
import { ToastrService } from 'ngx-toastr';
import { VisitaModel } from 'src/app/modelos/visita.model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-descripcion-visita',
  templateUrl: './descripcion-visita.component.html',
  styleUrls: ['./descripcion-visita.component.css']
})
export class DescripcionVisitaComponent implements OnInit {
  data: VisitaModel;
  addForm: FormGroup;
  events: VisitaModel[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, public ageService: VisitaService, private toastr: ToastrService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo: [''],
      descripcion:[''],
      solicitudID:[''],
      estado:['']
    });

    let ID = window.localStorage.getItem("solID");
    if(!ID){
      alert("Accion Invalida")
      this.router.navigate(['administrar-solicitudes']);
      return;
    }
    window.localStorage.removeItem("solID");
    
    this.ageService.getVisit(Number(ID)).subscribe(res =>{
      this.data = res;
    });

    this.ageService.getVisits().subscribe(res =>{
      this.events = res;
    });

  }

}
