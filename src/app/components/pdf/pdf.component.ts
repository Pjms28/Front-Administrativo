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

  public InforGen(){

    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;
    let nombre = this.nombre.nativeElement;
    let servicios = this.servicios.nativeElement;
    let tasacion = this.tasacion.nativeElement;

    
    doc.fromHTML(nombre.innerHTML, 80, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.fromHTML(servicios.innerHTML, 30, 20, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.fromHTML(tasacion.innerHTML, 80, 30, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    
    doc.fromHTML(content.innerHTML, 10, 40, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    
    doc.save('InformaciónGeneral.pdf');
    

  }

  // Solicitud Avalúo

  @ViewChild('solicitud') solicitud: ElementRef
  @ViewChild('der') der: ElementRef
  @ViewChild('tecnico') tecnico: ElementRef

  public Solicitud(){

    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let solicitud = this.solicitud.nativeElement;
    let der = this.der.nativeElement;
    let tecnico = this.tecnico.nativeElement;

    
    doc.fromHTML(der.innerHTML, 180, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });


    doc.fromHTML(tecnico.innerHTML, 180, 120, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    
    doc.fromHTML(solicitud.innerHTML, 10, 30, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    
    doc.save('SolicitudAváluo.pdf');
    

  }

  // Certificación Avalúo

  @ViewChild('certificacion') certificacion: ElementRef


  public Certificacion(){

    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let certificacion = this.certificacion.nativeElement;


    
    doc.fromHTML(certificacion.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    
    doc.save('CertificaciónAváluo.pdf');
    

  }


  // Informe de Avalúo de Propiedad

  @ViewChild('informe') informe: ElementRef


  public Informe(){

    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let informe = this.informe.nativeElement;


    
    doc.fromHTML(informe.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    
    doc.save('InformeAváluoPropiedad.pdf');
    

  }

  // Descripción de la Vecindad

  @ViewChild('vecindad') vecindad: ElementRef


  public Vecindad(){

    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let vecindad = this.vecindad.nativeElement;


    
    doc.fromHTML(vecindad.innerHTML, 10, 10, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    
    doc.save('DescripciónVecindad.pdf');
    

  }

   // Descripción de la Zona

   @ViewChild('zona') zona: ElementRef


   public Zona(){
 
     let doc = new jsPDF();
     let specialElementHandlers = {
       '#editor': function(element, renderer){
         return true;
       }
     };
 
     let zona = this.zona.nativeElement;
 
 
     
     doc.fromHTML(zona.innerHTML, 10, 10, {
       'width': 190,
       'elementHandlers': specialElementHandlers
     });
 
     
     doc.save('DescripciónZona.pdf');
     
 
   }

      // Descripción de las Mejoras

      @ViewChild('mejoras') mejoras: ElementRef


      public Mejoras(){
    
        let doc = new jsPDF();
        let specialElementHandlers = {
          '#editor': function(element, renderer){
            return true;
          }
        };
    
        let mejoras = this.mejoras.nativeElement;
    
    
        
        doc.fromHTML(mejoras.innerHTML, 10, 10, {
          'width': 190,
          'elementHandlers': specialElementHandlers
        });
    
        
        doc.save('DescripciónMejoras.pdf');
        
    
      }

        // Descripción del Interior de la Propiedad

        @ViewChild('interior') interior: ElementRef


        public Interior(){
      
          let doc = new jsPDF();
          let specialElementHandlers = {
            '#editor': function(element, renderer){
              return true;
            }
          };
      
          let interior = this.interior.nativeElement;
      
      
          
          doc.fromHTML(interior.innerHTML, 10, 10, {
            'width': 190,
            'elementHandlers': specialElementHandlers
          });
      
          
          doc.save('DescripciónInterior.pdf');
          
      
        }

                // Distribución de las Habitaciones

        @ViewChild('habitaciones') habitaciones: ElementRef


        public Habitaciones(){
      
          let doc = new jsPDF();
          let specialElementHandlers = {
            '#editor': function(element, renderer){
              return true;
            }
          };
      
          let habitaciones = this.habitaciones.nativeElement;
      
      
          
          doc.fromHTML(habitaciones.innerHTML, 10, 10, {
            'width': 190,
            'elementHandlers': specialElementHandlers
          });
      
          
          doc.save('DistribuciónHabitaciones.pdf');
          
      
        }

// Distribución de las Habitaciones


        @ViewChild('metodologia') metodologia: ElementRef


        public Metodologia(){
      
          let doc = new jsPDF();
          let specialElementHandlers = {
            '#editor': function(element, renderer){
              return true;
            }
          };
      
          let metodologia = this.metodologia.nativeElement;
      
      
          
          doc.fromHTML(metodologia.innerHTML, 10, 10, {
            'width': 190,
            'elementHandlers': specialElementHandlers
          });
      
          
          doc.save('MetodologíiaVentasComparables.pdf');
          
      
        }

        // Com


        @ViewChild('comparables') comparables: ElementRef


        public Comparable(){
      
          let columns = ["ID", "Name", "Country"];
          let rows = [
              [1, "Shaw", "Tanzania"],
              [2, "Nelson", "Kazakhstan"],
              [3, "Garcia", "Madagascar"],
          ];
  
          let doc = new jsPDF('l', 'pt');
          doc.autoTable(columns, rows); // typescript compile time error
          doc.save('table.pdf');
          
      
        }

  constructor() { }

  ngOnInit() {
  }

}
