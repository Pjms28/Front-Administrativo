import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { SolicitudService } from '../../shared/solicitud.service';
import { ServicioSolicitudModel } from '../../modelos/ServicioSolicitud.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaService } from 'src/app/shared/visita.service';
import { ToastrService } from 'ngx-toastr';
import { VisitaModel } from 'src/app/modelos/visita.model';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-descripcion-solicitud',
  templateUrl: './descripcion-solicitud.component.html',
  styleUrls: ['./descripcion-solicitud.component.css']
})
export class DescripcionSolicitudComponent implements OnInit {

  data : ServicioSolicitudModel;
  addForm: FormGroup;
  events: VisitaModel[] = [];
  ID: any
  

  constructor(private router: Router, private solApi: SolicitudService, private formBuilder: FormBuilder, public ageService: VisitaService, private toastr: ToastrService, private actvRoute: ActivatedRoute) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo: "Solicitud",
      descripcion:[''],
      solicitudID:[''],
      estado:['']
    });

    /*let ID = window.localStorage.getItem("solID");
    if(!ID){
      alert("Accion Invalida")
      this.router.navigate(['administrar-solicitudes']);
      return;
    }
    window.localStorage.removeItem("solID");

    this.ageService.getVisits().subscribe(res =>{
      this.events = res;
    });*/
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');

    return this.solApi.getServSol(Number(this.ID)).subscribe(res =>{
      this.data = res;
    });
  }

  onSubmit(){
   
    if(this.addForm.get('hora_Inicio').value > this.addForm.get('hora_Fin').value){
      this.toastr.error('Fecha Incorreta','Fecha.Incorrecta');
      return
    }

    else{
      
      if (this.validator() === true){
        this.addForm.controls['hora_Inicio'].setValue(formatDate(this.addForm.get('hora_Inicio').value, 'yyyy/MM/dd HH:mm:ss', 'en'));
        this.addForm.controls['hora_Fin'].setValue(formatDate(this.addForm.get('hora_Fin').value, 'yyyy/MM/dd HH:mm:ss', 'en'));
        this.addForm.controls['solicitudID'].setValue(this.data.solicitud.solicitudID);
        this.addForm.controls['descripcion'].setValue(this.data.solicitud.comentario);
        this.addForm.controls['estado'].setValue("Aprobada");
       this.ageService.addVisit(this.addForm.value).subscribe(res =>{
        this.router.navigate(['agendar-visita']);
      });
        this.data.estadoID = 1;
        this.solApi.updateServSol(this.data).subscribe(res => {
        });
      }
    }
  }

  validator(){
    var fechaI = formatDate(this.addForm.get('hora_Inicio').value,'yyyy/MM/dd', 'en');
    var horaI = formatDate(this.addForm.get('hora_Inicio').value,'HH:mm', 'en');
    var fechaF = formatDate(this.addForm.get('hora_Fin').value,'yyyy/MM/dd', 'en');
    var horaF = formatDate(this.addForm.get('hora_Fin').value,'HH:mm', 'en');
    var validator = true;

    this.events.forEach(element => {
      if(formatDate(element.hora_Inicio,'yyyy/MM/dd', 'en') == fechaI){
        if(formatDate(element.hora_Inicio,'HH:mm', 'en') == horaI){
          this.toastr.error('Existen un evento a esta hora','Fecha.Incorrecta');
          validator = false;
        }
      if(formatDate(element.hora_Inicio,'HH:mm', 'en') < horaI  && horaI < formatDate(element.hora_Fin,'HH:mm', 'en')){
          this.toastr.error('Hora no valida, aun no termina un evento anterior','Fecha.Incorrecta'); 
          validator = false;
      }
      }
    });
    return validator;
  }

  rechazar(){
    this.data.estadoID = 6;
      this.solApi.updateServSol(this.data).subscribe(res => {
        this.router.navigate(['administrar-solicitudes']);
      });
  }
  
}

