import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { TasacionService } from 'src/app/shared/tasacion.service';
import { TasacionModel } from 'src/app/modelos/tasacion.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

//Variable que contiene las variables del informe.
private iT: TasacionModel = new TasacionModel();
private ID: any;


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

    let info = new jsPDF();
    let avaluo = new jsPDF();
    let certif = new jsPDF();
    let propiedad = new jsPDF();
    let desVecindad = new jsPDF();
    let desZona = new jsPDF();
    let desMejoras = new jsPDF();
    let desInterior = new jsPDF();
    let distribucion = new jsPDF();
    let metVentas = new jsPDF();
    let conclu = new jsPDF();

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
    info.fromHTML(nombre.innerHTML, 80, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    info.fromHTML(servicios.innerHTML, 30, 20, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    info.fromHTML(tasacion.innerHTML, 80, 30, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    
    info.fromHTML(content.innerHTML, 10, 40, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

 // Solicitud Avalúo
    avaluo.fromHTML(der.innerHTML, 180, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });


    avaluo.fromHTML(tecnico.innerHTML, 180, 120, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    
    avaluo.fromHTML(solicitud.innerHTML, 10, 30, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

     // Certificación Avalúo

     certif.fromHTML(certificacion.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    // Informe de Avalúo de Propiedad
    
    propiedad.fromHTML(informe.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    // Descripción de la Vecindad

    desVecindad.fromHTML(vecindad.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

     // Descripción de la Zona

     desZona.fromHTML(zona.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    // Descripción de las Mejoras

    desMejoras.fromHTML(mejoras.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    // Descripción del Interior de la Propiedad
    desInterior.fromHTML(interior.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    // Distribución de las Habitaciones
    distribucion.fromHTML(habitaciones.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    // Metodología de Ventas Comparables de Mercado
    metVentas.fromHTML(metodologia.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    // Conclusiones
    conclu.fromHTML(conclusiones.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    
    

    info.save('InformaciónGeneral.pdf');
    avaluo.save('SolicitudAváluo.pdf');
    certif.save('CertificaciónAváluo.pdf');
    propiedad.save('InformeAváluoPropiedad.pdf');
    desVecindad.save('DescripciónVecindad.pdf');
    desZona.save('DescripciónZona.pdf');
    desMejoras.save('DescripciónMejoras.pdf');
    desInterior.save('DescripciónInterior.pdf');
    distribucion.save('DistribuciónHabitaciones.pdf');
    metVentas.save('MetodologíiaVentasComparables.pdf');
    conclu.save('Conclusiones.pdf');

  }

  private costoTotalI: number;
  private costoTotalT: number;
  private valorTotal: number;

  constructor(public tscApi: TasacionService,private actvRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    this.tscApi.getTasacion(this.ID).subscribe(res => {
      this.iT = res
      this.iT.caracteristicasZona = JSON.parse(res.caracteristicasZona);
    })
    this.costoTotalI = this.iT.metroInmueble * this.iT.costoMetroInmueble;
    this.costoTotalT = this.iT.metroTerraza * this.iT.costoMetroTerraza;
    this.valorTotal = this.costoTotalI + this.costoTotalT;
  }

}
