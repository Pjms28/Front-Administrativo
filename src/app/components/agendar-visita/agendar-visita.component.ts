import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, startOfHour, endOfHour,setHours, setMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaService } from '../../shared/visita.service';
import { VisitaModel } from 'src/app/modelos/visita.model';
import { Router, Data } from '@angular/router';
import {formatDate} from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { EmailService } from 'src/app/shared/email.service';
import { EmailModel } from 'src/app/modelos/email.model';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-agendar-visita',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agendar-visita.component.html',
  styleUrls: ['./agendar-visita.component.css'],
  providers: [ToastrService]
})
export class AgendarVisitaComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[];

  data: any;
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;
  eventValidator: VisitaModel[]=[];
  oldFecha: string;

  constructor(private modal: NgbModal, private formBuilder: FormBuilder, private ageService: VisitaService,private router: Router, private toastr: ToastrService
    , private emailApi:EmailService) { }
    email: EmailModel = new EmailModel();
  

  ngOnInit() {
    
    this.ageService.getVisits()
      .subscribe(res => {
      this.completeCalendar(res);
      this.oldEvents(res);

    }, err => {
      console.log(err);
     
    });

    this.ageService.getVisitsF()
    .subscribe(res =>{
      if(res.length >= 1){
        this.completeCalendarF(res);
      }
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.update(newStart,newEnd, event);
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if(confirm('¿Esta seguro que desea eliminar este evento?')){
      this.events = this.events.filter(event => event !== eventToDelete);
      this.delete(eventToDelete);
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
 

  completeCalendar(res : any){
    var obj: Array<any> = [];
    res.forEach(element => {
      var event: Object= {
        start: startOfHour(element.hora_Inicio),
        end: startOfHour(element.hora_Fin),
        title: element.motivo+" "+"de"+" "+element.solicitud.usuario.nombre+" "+element.solicitud.usuario.apellidos,
        servicio: element.solicitud.servicioSolicituds[0].servicio.nombreServicio,
        estado: element.solicitud.servicioSolicituds[0].estado.estadoNombre,
        numeroVisita: element.visitaID,
        estadoR: element.estado,
        color: colors.red,
        draggable: true
      }
      obj.push(event)
    });
    this.events = obj;
    this.refresh.next();
  }

  completeCalendarF(res : any){
    var obj: Array<any> = [];
    res.forEach(element => {
      var event: Object= {
        start: startOfHour(element.hora_Inicio),
        end: startOfHour(element.hora_Fin),
        title: element.motivo+" "+"de"+" "+element.solicitud.usuario.nombreUsuario+" "+element.solicitud.usuario.apellidosUsuario,
        servicio: element.solicitud.servicioSolicituds[0].servicio.nombreServicio,
        estado: element.solicitud.servicioSolicituds[0].estado.estadoNombre,
        numeroVisita: element.visitaID,
        estadoR: element.estado,
        color: colors.blue,
        draggable: false
      }
      obj.push(event)
    });
    
     this.events.forEach(element => {
      obj.push(element)
     })
    this.events = obj;
    this.refresh.next();
  }


  

  update(start, end, event){
    if(this.validator(start,end) === true){
       this.ageService.getVisit(event.numeroVisita).subscribe(res=>{
          this.data = res;
          this.oldFecha = formatDate(this.data.hora_Inicio, 'yyyy/MM/dd HH:mm:ss aa', 'en');
          this.data.hora_Inicio = formatDate(start, 'yyyy/MM/dd HH:mm:ss', 'en');
          this.data.hora_Fin = formatDate(end, 'yyyy/MM/dd HH:mm:ss', 'en');;
          this.ageService.updateVisit(this.data).subscribe(res =>{
          this.email.correo = this.data.solicitud.usuario.email;
          this.email.nombre = this.data.solicitud.usuario.nombre + "" + this.data.solicitud.usuario.apellidos;
          this.email.subject = "Cambio de fecha para la reunion del servicio solicitado" + " " + this.data.solicitud.servicioSolicituds[0].servicio.nombreServicio;
          this.email.htmlcontent = "Saludos estimad@ cliente" + " " + this.email.nombre + "<br>" +  "Le informamos por este medio que la reunion pautada para la fecha" + "" 
          + "<strong>"+this.oldFecha +"</strong>" + "" + "ha sido modificada y ahora esta pautada para la fecha:" + "" + "<strong>" + this.data.hora_Inicio + "</strong>"+ "."
          + "<br>" + " Sin nada mas que informar, que pase un feliz resto del dia." + "<br>" + "<strong>Gracias por preferirnos.</strong>"; 
          this.emailApi.sendEmail(this.email).subscribe(res => {
            
          });
          this.ageService.getVisits().subscribe((res: {}) => {
              this.completeCalendar(res);
            })
            this.ageService.getVisitsF()
            .subscribe(res =>{
            if(res.length >= 1){
            this.completeCalendarF(res);
            }
            })
          });
     });
  }
  this.ageService.getVisits().subscribe((res: {}) => {
    this.completeCalendar(res);
  })
  this.ageService.getVisitsF().subscribe(res =>{
  if(res.length >= 1){
        this.completeCalendarF(res);
  }
  })
}

delete(evento:any){
  this.ageService.deleteVisit(evento.numeroVisita).subscribe(res => {
    return this.ageService.getVisits().subscribe((res: {}) => {
      this.completeCalendar(res);
    })
  })
}

validator(start, end){
  var fechaI = formatDate(start,'yyyy/MM/dd', 'en');
  var horaI = formatDate(start,'HH:mm', 'en');
  var fechaF = formatDate(end,'yyyy/MM/dd', 'en');
  var horaF = formatDate(end,'HH:mm', 'en');
  var validator = true;

  this.eventValidator.forEach(element => {
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

oldEvents(res: VisitaModel[]){  
  res.forEach(element => {
    if(formatDate(element.hora_Inicio,'yyyy/MM/dd', 'en') < formatDate( new Date(),'yyyy/MM/dd', 'en')){
      if(confirm("El evento agendado para el"+ "" + formatDate(element.hora_Inicio,'yyyy/MM/dd', 'en')+ " " + "ya es obsoleto, si el evento ya fue finalizado desea cambiar el estado del evento?")){
        element.estado = "Finalizado";
        this.ageService.updateVisit(element).subscribe(res=>{
          this.ageService.getVisits().subscribe((res: {}) => {
            this.completeCalendar(res);
          })

        this.ageService.getVisitsF()
        .subscribe(res =>{
        if(res.length >= 1){
        this.completeCalendarF(res);
        }
        })
        })

      }
    }
  });
}



}

