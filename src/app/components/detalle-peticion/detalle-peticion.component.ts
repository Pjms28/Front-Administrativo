import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PeticionService } from 'src/app/shared/peticion.service';
import { PeticionModel } from 'src/app/modelos/peticion.model';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaModel } from 'src/app/modelos/visita.model';
import { VisitaService } from 'src/app/shared/visita.service';
import { SolicitudService } from 'src/app/shared/solicitud.service';
import { SolicitudModel } from 'src/app/modelos/Solicitud.model';
import { EmailService } from 'src/app/shared/email.service';
import { EmailModel } from 'src/app/modelos/email.model';

@Component({
  selector: 'app-detalle-peticion',
  templateUrl: './detalle-peticion.component.html',
  styleUrls: ['./detalle-peticion.component.css']
})
export class DetallePeticionComponent implements OnInit {

  ID: any
  data: PeticionModel
  addForm: FormGroup
  events: VisitaModel[] = [];
  sol: SolicitudModel;
  email: EmailModel = new EmailModel();
  constructor(private router: Router,private toastr: ToastrService, private actvRoute: ActivatedRoute, private pctApi: PeticionService, public ageService: VisitaService,
    private formBuilder: FormBuilder, private solApi: SolicitudService, private emailApi: EmailService) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo: "Visita a solicitud",
      descripcion:[''],
      solicitudID:[''],
      estado:['']
    });
    
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');

    this.pctApi.getPeticion(this.ID).subscribe(res =>{
      this.data = res;
    })
    this.ageService.getVisits().subscribe(res =>{
      this.events = res;
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
          this.addForm.controls['solicitudID'].setValue(this.data.solicitudID);
          this.addForm.controls['descripcion'].setValue(this.data.comentario);
          this.addForm.controls['estado'].setValue("Aprobada");
          this.data.estado = "Aprobada";
         this.ageService.addVisit(this.addForm.value).subscribe(res =>{
          this.pctApi.updatePeticion(this.data).subscribe(res =>{
            this.router.navigate(['agendar-visita']);
          })
        });
        this.email.correo = this.data.solicitud.usuario.correoUsuario;
        this.email.nombre = this.data.solicitud.usuario.nombreUsuario + "" + this.data.solicitud.usuario.apellidosUsuario;
        this.email.subject = "Peticio de visita por motivo de" + " " + this.data.motivo;
        this.email.htmlcontent = "Saludos estimad@ cliente" + " " + this.email.nombre +
        "<br>" + "Le deseamos informar que su peticion para una nueva visita al servicio ya solicitado previamente ha sido" + " " + "<strong>aprobada</strong>" + "," + 
        "la reunión esta pautada para la fecha" + " " + "<strong>"+ formatDate(this.addForm.get('hora_Inicio').value, 'yyyy/MM/dd', 'en') + "</strong>" +  "," + "iniciara a las" + " " + "<strong>"+ formatDate(this.addForm.get('hora_Inicio').value, 'HH:mm:ss aa', 'en') + "</strong>" + " " +
        "con Dios mediante." + 
        "<br>" + " Sin nada mas que informar, que pase un feliz resto del dia." + "<br>" + "<strong>Gracias por preferirnos.</strong>"; 
        this.emailApi.sendEmail(this.email).subscribe(res => {

        })
        }
      }
    }

    rechazar(){
      this.data.estado = "Rechazado";
      this.pctApi.updatePeticion(this.data).subscribe(res =>{
        this.router.navigate(['administrar-peticiones']);
      })
      this.email.correo = this.data.solicitud.usuario.correoUsuario;
      this.email.nombre = this.data.solicitud.usuario.nombreUsuario + "" + this.data.solicitud.usuario.apellidosUsuario;
      this.email.subject = "Peticio por motivo de" + " " + this.data.motivo;
      this.email.htmlcontent = "Saludos estimad@ cliente" + " " + this.email.nombre +
      "<br>" + "Le informamos por este medio que la peticion solicitada el dia" + "" + formatDate(this.data.createdAt, 'yyyy/MM/dd', 'en')+ " " + "ha sido <strong> denegada </strong>."+
      "<br>" + "Lamentamos los inconvenientes, para mas informacion favor de reenviar sus dudas a este email." +
      "<br>" + " Sin nada mas que informar, que pase un feliz resto del dia." + "<br>" + "<strong>Gracias por preferirnos.</strong>"; 
      this.emailApi.sendEmail(this.email).subscribe(res => {
      })
    }

    aceptar(){
      this.data.estado = "Aprobado"
      this.solApi.getServSol(this.data.solicitudID).subscribe(res => {
        res.estadoID = 7;
        if(res.solicitud.visitaAgendadas.length > 0){
          res.solicitud.visitaAgendadas.forEach(element => {
            element.estado = "Finalizado";
            this.ageService.updateVisit(element).subscribe();
          })
      }
        this.solApi.updateServSol(res).subscribe();
      })
      this.pctApi.updatePeticion(this.data).subscribe(res =>{
        this.router.navigate(['administrar-peticiones']);
      })
      this.email.correo = this.data.solicitud.usuario.correoUsuario;
      this.email.nombre = this.data.solicitud.usuario.nombreUsuario + "" + this.data.solicitud.usuario.apellidosUsuario;
      this.email.subject = "Peticio por motivo de" + " " + this.data.motivo;
      this.email.htmlcontent = "Saludos estimad@ cliente" + " " + this.email.nombre +
      "<br>" + "Le informamos por este medio que la peticion solicitada el dia" + "" + formatDate(this.data.createdAt, 'yyyy/MM/dd', 'en') + " " + + "ha sido <strong> aceptada </strong>."
      +  "<br>" + " Sin nada mas que informar, que pase un feliz resto del dia." + "<br>" + "<strong>Gracias por preferirnos.</strong>"; 
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


}
