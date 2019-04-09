import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, startOfHour, endOfHour,setHours, setMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaService } from '../../shared/visita.service';
import { VisitaModel } from 'src/app/modelos/visita.model';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';


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
  providers: [ DatePipe]
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
 
  constructor(private modal: NgbModal, private formBuilder: FormBuilder, private ageService: VisitaService,private router: Router, private datePipe: DatePipe) { }

  

  ngOnInit() {
    
    this.ageService.getVisits()
      .subscribe(res => {
      this.completeCalendar(res);
    }, err => {
      console.log(err);
     
    });
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
    //console.log(newStart,newEnd);
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
        title: element.motivo+" "+"de"+" "+element.solicitud.usuario.nombreUsuario+" "+element.solicitud.usuario.apellidosUsuario,
        servicio: element.solicitud.servicioSolicituds[0].servicio.nombreServicio,
        estado: element.solicitud.servicioSolicituds[0].estado.estadoNombre,
        numeroVisita: element.visitaID,
        color: colors.red,
        draggable: true
      }
      obj.push(event)
      console.log(event)
    });
    this.events = obj;
    this.refresh.next();
  }

  update(start, end, event){
   this.ageService.getVisit(event.numeroVisita).subscribe(res=>{
      this.data = res;
      this.data.hora_Inicio = formatDate(start, 'yyyy/MM/dd HH:mm:ss', 'en');
      this.data.hora_Fin = formatDate(end, 'yyyy/MM/dd HH:mm:ss', 'en');;
      this.ageService.updateVisit(this.data).subscribe(res =>{

      });
  });
}

delete(evento:any){
  this.ageService.deleteVisit(evento.numeroVisita).subscribe(res => {
  })
}

updateAll(evento:any){
window.localStorage.removeItem("solID");
window.localStorage.setItem("solID", String(evento.numeroVisita));
this.router.navigate(['editar-visita']);
}

add(){
this.router.navigate(['agregar-visita']);
}
}

