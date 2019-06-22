import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

// Información General

  @ViewChild('content') content: ElementRef
  @ViewChild('nombre') nombre: ElementRef
  @ViewChild('servicios') servicios: ElementRef
  @ViewChild('tasacion') tasacion: ElementRef
  // Solicitud Avalúo
  @ViewChild('solicitud') solicitud: ElementRef
  @ViewChild('der') der: ElementRef
  @ViewChild('tecnico') tecnico: ElementRef
  // Certificación Avalúo
  @ViewChild('certificacion') certificacion: ElementRef
  // Informe de Avalúo de Propiedad
  @ViewChild('informe') informe: ElementRef
  // Descripción de la Vecindad
  @ViewChild('vecindad') vecindad: ElementRef
  // Descripción de la Zona
  @ViewChild('zona') zona: ElementRef
  // Descripción de las Mejoras
  @ViewChild('mejoras') mejoras: ElementRef
  // Descripción del Interior de la Propiedad
  @ViewChild('interior') interior: ElementRef
  // Distribución de las Habitaciones
  @ViewChild('habitaciones') habitaciones: ElementRef
  // Metodología de Ventas Comparables de Mercado
  @ViewChild('metodologia') metodologia: ElementRef
  // Conclusiones
  @ViewChild('conclusiones') conclusiones: ElementRef

  public GenerarPDF(){

    let pdf = new jsPDF();
  

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;
    let nombre = this.nombre.nativeElement;
    let servicios = this.servicios.nativeElement;
    let tasacion = this.tasacion.nativeElement;
    let solicitud = this.solicitud.nativeElement;
    let der = this.der.nativeElement;
    let tecnico = this.tecnico.nativeElement;
    let certificacion = this.certificacion.nativeElement;
    let informe = this.informe.nativeElement;
    let vecindad = this.vecindad.nativeElement;
    let zona = this.zona.nativeElement;
    let mejoras = this.mejoras.nativeElement;
    let interior = this.interior.nativeElement;
    let habitaciones = this.habitaciones.nativeElement;
    let metodologia = this.metodologia.nativeElement;
    let conclusiones  = this.conclusiones.nativeElement;


    
    // Información General
    pdf.fromHTML(nombre.innerHTML, 80, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });


    pdf.fromHTML(servicios.innerHTML, 30, 20, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.fromHTML(tasacion.innerHTML, 80, 30, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    
    pdf.fromHTML(content.innerHTML, 10, 40, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

 // Solicitud Avalúo
    pdf.fromHTML(der.innerHTML, 180, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });


    pdf.fromHTML(tecnico.innerHTML, 180, 120, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    
    pdf.fromHTML(solicitud.innerHTML, 10, 30, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

     // Certificación Avalúo

     pdf.fromHTML(certificacion.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

    // Informe de Avalúo de Propiedad
    
    pdf.fromHTML(informe.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

    // Descripción de la Vecindad

    pdf.fromHTML(vecindad.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

     // Descripción de la Zona

     pdf.fromHTML(zona.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

    // Descripción de las Mejoras

    pdf.fromHTML(mejoras.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

    // Descripción del Interior de la Propiedad
    pdf.fromHTML(interior.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

    // Distribución de las Habitaciones
    pdf.fromHTML(habitaciones.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

    // Metodología de Ventas Comparables de Mercado
    pdf.fromHTML(metodologia.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    pdf.addPage()

    // Conclusiones
    pdf.fromHTML(conclusiones.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    
    

    
    pdf.save('InformeTasación.pdf');

  }



  constructor() { }

  ngOnInit() {
  }

}
