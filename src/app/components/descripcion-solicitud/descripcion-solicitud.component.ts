import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { SolicitudService } from '../../shared/solicitud.service';
import { ServicioSolicitudModel } from '../../modelos/ServicioSolicitud.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaService } from 'src/app/shared/visita.service';
import { ToastrService } from 'ngx-toastr';
import { VisitaModel } from 'src/app/modelos/visita.model';
import {formatDate} from '@angular/common';
import { EmailService } from 'src/app/shared/email.service';
import { EmailModel } from 'src/app/modelos/email.model';


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
  email: EmailModel = new EmailModel();
  constructor(private router: Router, private solApi: SolicitudService, private formBuilder: FormBuilder, public ageService: VisitaService, 
    private toastr: ToastrService, private actvRoute: ActivatedRoute, private emailApi:EmailService) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo: "Solicitud",
      descripcion:[''],
      solicitudID:[''],
      estado:['']
    });

    this.ageService.getVisits().subscribe(res =>{
      this.events = res;
    });
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');

    return this.solApi.getServSol(Number(this.ID)).subscribe(res =>{
      this.data = res;
      console.log(res);
      
    });
  }

  onSubmit(){
   
    if(this.addForm.get('hora_Inicio').value >= this.addForm.get('hora_Fin').value){
      this.toastr.error('Fecha Incorreta','Fecha.Incorrecta');
    }

    else{
      
      if (this.validator() === true){
        this.addForm.controls['hora_Inicio'].setValue(formatDate(this.addForm.get('hora_Inicio').value, 'yyyy/MM/dd HH:mm:ss', 'en'));
        this.addForm.controls['hora_Fin'].setValue(formatDate(this.addForm.get('hora_Fin').value, 'yyyy/MM/dd HH:mm:ss', 'en'));
        this.addForm.controls['solicitudID'].setValue(this.data.solicitud.solicitudID);
        this.addForm.controls['descripcion'].setValue(this.data.solicitud.comentario);
        this.addForm.controls['estado'].setValue("Aprobada");
       this.ageService.addVisit(this.addForm.value).subscribe(res =>{
        this.router.navigate(['Visitas Agendadas']);
      });
        this.data.estadoID = 1;
        this.solApi.updateServSol(this.data).subscribe(res => {
          this.email.correo = this.data.solicitud.usuario.correoUsuario;
          this.email.nombre = this.data.solicitud.usuario.nombreUsuario + "" + this.data.solicitud.usuario.apellidosUsuario;
          this.email.subject = "Solicitud del servicio:" + " " + this.data.servicio.nombreServicio;
          this.email.htmlcontent = "Saludos estimad@ cliente" + " " + this.email.nombre + "<br>" + "El servicio:" + " " + this.data.servicio.nombreServicio + " " + "Solicitado en la fecha:"+ " " + formatDate(this.data.solicitud.fechaServSol,'yyyy/MM/dd', 'en') 
          + " " + "<strong>ha sido aprobada</strong>, y la visita se asigno a la fecha:" + " " + "<strong>"+ formatDate(this.addForm.get('hora_Inicio').value, 'yyyy/MM/dd HH:mm:ss aa', 'en')+ "</strong>" + "<br>" + " Sin nada mas que informar, que pase un feliz resto del dia." + "<br>" 
          + "<strong>Gracias por preferirnos.</strong>" ;
          this.emailApi.sendEmail(this.email).subscribe(res => {
            
          });
        });
      }
    }
  }

  validator(){
    var fechaI = formatDate(this.addForm.get('hora_Inicio').value,'yyyy/MM/dd', 'en');
    var horaI = formatDate(this.addForm.get('hora_Inicio').value,'HH:mm', 'en');
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
        this.router.navigate(['Administrar Solicitudes']);
      });
  }
  
}

