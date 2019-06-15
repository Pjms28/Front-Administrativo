import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tasacion',
  templateUrl: './tasacion.component.html',
  styleUrls: ['./tasacion.component.css']
})
export class TasacionComponent implements OnInit {

  public metrosI: number;
  public metrosT: number;
  public costoMI: number;
  public costoMT: number;
  public costoI: number;
  public costoT: number;
  public costo: number;

  public add() {
    this.costoI  = this.metrosI * this.costoMI;
    this.costoT = this.metrosT * this.costoMT;
    this.costo = this.costoI + this.costoT;

  }

  tasacionForm: FormGroup
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  this.tasacionForm = this.formBuilder.group({

    tasacionID:[''],

    //informe general 
    descripcionInmueble:[''],
    tasadorNombre: [''],
    asesorNombre:[''],
    tecnicoNombre: [''],    
    direccionConstructora:[''],
    telefonoConstructora: [''],
    correoCompañia: [''],
    clienteNombre: [''],
    fecha:[''],
    ciudad:[''],
    pais: [''],
    banco:[''],

    //Certificador de avaluo

    noCatastral:[''],
    matricula: [''], 
    precio: [''],
    letraPrecio: [''],

    //Informe de avaluo de propiedad

    propietario:[''],
    valuador: [''],
    direccion: [''],
    telefono: [''],

    //Nombre del solicitante <<Nombre del cliente>>

    derechoPropiedad:[''],
    ocupadoPor: [''],
    utilidadInmueble: [''],

    //Descripcion de la vecindad

    tipoVecindad:[''],
    tendenciaVecindad:[''],
    comparacionVecindario:[''],
    antiguedadPromedio: [''],
    areaConstruida: [''],
    oferta: [''],
    demanda: [''],
    deseabilidadPropiedad: [''],
    distanciaEscuelaP: [''],
    distanciaEscuelaS: [''],
    distanciaTransporte:[''],
    distanciaComercio: [''],
    distanciaCiudad:[''],

    //Descripcion de la zona

    limitesNaturales: [''],
    caracteristicasZona:[''],
    area: [''],
    fuente: [''],
    topografia: [''],
    configuracion: [''],
    zonificacion: [''],
    usoPropiedad: [''],
    areaVerde: [''],
    servidumbre: [''],
    marquesina: [''],
    instalacionElectrica: [''],

    //Descripcion de las mejoras agregar propiedad al modelo del back
    construccionTerminada: [''],
    añoEstimado: [''],
    xtotal: [''],
    ventanaMarco: [''],
    sotano: [''],
    areaTotalSotano: [''],
    tipoInmueble: [''],
    estructura: [''],
    materialConstruccion: [''],
    revestimientoExterior: [''],
    materialTecho: [''],
    condicionExterna: [''],

     //Descripcion del interior de la propiedad
     tipoPiso: [''],
     distribucionArq: [''],
     armarios: [''],
     dormitorios: [''],
     baños: [''],
     noBaños: [''],
     codicionInterna: [''],
     paredesMaterial: [''],
     techos: [''],
     otrosDetalles: [''],
     murosCimientos: [''],
     tuberiasSanitarias: [''],
     calentadorAgua: [''],
     capacidadCalentador: [''],
     sistemaElectrico: [''],
     artefactosAdicionales: [''],
     amenidades:[''],
     noParqueos: [''],
     otrasMejoras: [''],
     comentarios: [''],

     //Distribucion Habitaciones

    numeroPiso: [''],
    habitaciones: [''],
    entrada: [''],
    salaEstar: [''],
    cocina: [''],
    comedor: [''],
    bañoCompleto: [''],
    bañoParcial: [''],
    terraza: [''],
    lavanderia: [''],
    cuartoServicio:[''],
    parqueos: [''],

    //Metodologias de venta

    fuenteManualCosto: [''],
    valorTerreno: [''],
    metroTerraza: [''],
    costoMetroInmueble:[''],
    costoMetroTerraza: [''],

    //Enfoque de venta comparables

    fechaVenta:[''],
    precioVenta: [''],
    tamaño: [''],
    precioPorM2: [''],
    condicion: [''],
    estilo: [''],
    valorAjustado: [''],

    //Descripcion 2

    direccion2: [''],
    fechaVenta2: [''],
    precioVenta2: [''],
    tamaño2: [''],
    precioMetro2: [''],
    condicion2: [''],
    estilo2: [''],
    noHabitacion2:[''],
    noParquero2:[''],
    condicionFisica2: [''],
    valoresAjustados2: [''],

    //Descripcion 3

    direccion3: [''],
    fechaVenta3:[''],
    precioVenta3: [''],
    tamaño3: [''],
    precioMetro3: [''],
    condicion3: [''],
    estilo3: [''],
    noHabitacion3:[''],
    noParquero3:[''],
    condicionFisica3: [''],
    valoresAjustados3:[''],

    //Conclusiones
    conclusiones: [''],
    valorEnfoqueVentas: [''],
    opinionValorLiquidacion:[''],
    valorDelMismo: [''],
    comentariosVentas:[''],
    fechaDiaTasacion: [''],
    ventaAdicional: [''],
    suplementoInformativo: [''],
    plano: [''],
    condicionesRestrictivas: [''],
    otro: [''],
    revisor: [''],
    numeroRegistro: [''],
    fechaInspeccion:['']






  }) 
  }

}
