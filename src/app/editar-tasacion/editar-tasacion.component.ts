import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TasacionService } from '../shared/tasacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-tasacion',
  templateUrl: './editar-tasacion.component.html',
  styleUrls: ['./editar-tasacion.component.css']
})
export class EditarTasacionComponent implements OnInit {

  public metrosI: number;
  public metrosT: number;
  public costoMI: number;
  public costoMT: number;
  public costoI: number;
  public costoT: number;
  public costo: number;

  ID: any;

  //Arreglos para los check
  public A = [] = []
  public B = []
  public C = []
  public D = []
  public E = []

  public add() {
    this.costoI  = this.metrosI * this.costoMI;
    this.costoT = this.metrosT * this.costoMT;
    this.costo = this.costoI + this.costoT;

  }

  tasacionForm: FormGroup
  checkboxA = [
    {nombre:"Calle Pavimentada", valor: "callepavimentada", checked:false },
    {nombre:"Calle sin Pavimentar", valor: "callesinpavimentar", checked:false },
    {nombre:"Acera", valor: "acera", checked:false },
    {nombre:"Contenes", valor: "contenes", checked:false },
    {nombre:"Alumbrado Electrico", valor: "alumbradoelectrico", checked:false },
    {nombre:"Television por Cable", valor: "televisionporcable", checked:false },
    {nombre:"Telefono", valor: "telefono", checked:false },
    {nombre:"Gas", valor: "gas", checked:false },
    {nombre:"Agua Potable", valor: "aguapotable", checked:false },
    {nombre:"Pozo Privado", valor: "pozoprivado", checked:false },
    {nombre:"Pozo Publico", valor: "pozopublico", checked:false },
    {nombre:"Alcantarillado Sanitario", valor: "alcantarillasanitario", checked:false },
    {nombre:"Pozo Séptico", valor: "pozoseptico", checked:false },
    {nombre:"Alcantarilla Pluvial", valor: "alcantarillapluvial", checked:false },
    {nombre:"Drenaje de Zanjas abiertas", valor: "dranajedezanjasabiertas", checked:false }
  ];
  
  checkboxB = [
    {nombre:"Madera", valor: "madera", checked:false },
    {nombre:"Acero", valor: "acero", checked:false },
    {nombre:"Bloques de H.A", valor: "BloquesHA", checked:false },
    {nombre:"Bloques de Hormigon Armado", valor: "BloquesHormigon", checked:false }   
  ];

  checkboxC = [
    {nombre:"Cisterna", valor: "cisterna", checked:false },
    {nombre:"Jacuzzy", valor: "jacuzzy", checked:false },
    {nombre:"Piscina", valor: "piscina", checked:false } 
  ];

  checkboxD = [
    {nombre:"Fusibles", valor: "fusibles", checked:false },
    {nombre:"Breakers", valor: "breakers", checked:false },
    {nombre:"Inversor en Areas Comunes", valor: "inversor", checked:false } 
  ];

  checkboxE = [
    {nombre:"Alarmas de Robo", valor: "robo", checked:false },
    {nombre:"Alarmas de Incendio", valor: "incendio", checked:false },
    {nombre:"Verja Perimetral", valor: "verja", checked:false },
    {nombre:"Barrera de Alambre de Pua", valor: "alambrepua", checked:false },
    {nombre:"Eliminador de Basura", valor: "eliminarbasura", checked:false },
    {nombre:"Chimenea", valor: "chimenea", checked:false },
    {nombre:"Sauna", valor: "sauna", checked:false },
    {nombre:"Tratamiento de Agua", valor: "tratamientoagua", checked:false },
    {nombre:"Tragaluces/Domos", valor: "domos", checked:false },
    {nombre:"Gas Común", valor: "gascomun", checked:false },
    {nombre:"Puerta de Garaje Automática", valor: "puertaelectrica", checked:false },
    {nombre:"Intercom", valor: "intercom", checked:false }
  ];

  constructor(private formBuilder: FormBuilder, private tscApi: TasacionService,private actvRoute: ActivatedRoute) { }

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
      areaPiso:[''],
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
      metroInmueble: [''],
      metroTerraza: [''],
      costoMetroInmueble: [''],
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
  
      descripcion2:[''],
      direccion2: [''],
      fechaVenta2: [''],
      precioVenta2: [''],
      tamaño2: [''],
      precioMetro2: [''],
      condicion2: [''],
      estilo2: [''],
      noHabitacion2:[''],
      noBaños2:[''],
      noParquero2:[''],
      condicionFisica2: [''],
      valoresAjustados2: [''],
  
      //Descripcion 3
  
      descripcion3:[''],
      direccion3: [''],
      fechaVenta3:[''],
      precioVenta3: [''],
      tamaño3: [''],
      precioMetro3: [''],
      condicion3: [''],
      estilo3: [''],
      noHabitacion3:[''],
      noBaños3:[''],
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

    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    this.tscApi.getTasacion(this.ID).subscribe(res =>{
      if(res == null){
        //this.toastr.error("Accion invalida", "Error");
      }
      else{
        this.generar(res.caracteristicasZona,this.checkboxA,this.A);
        this.generar(res.materialConstruccion,this.checkboxB,this.B);
        this.generar(res.amenidades,this.checkboxC,this.C);
        this.generar(res.sistemaElectrico,this.checkboxD,this.D);
        this.generar(res.artefactosAdicionales,this.checkboxE,this.E);
        res.caracteristicasZona = this.A;
        res.materialConstruccion = this.B;
        res.amenidades = this.C;
        res.sistemaElectrico = this.D;
        res.artefactosAdicionales = this.E;
        this.tasacionForm.patchValue(res);
      }
    })

  }

  get selectedOptions() { // right now: ['1','3']
  return this.checkboxA
            .filter(opt => opt.checked)
            .map(opt => opt.valor)
}

get selectedOptionsb() { // right now: ['1','3']
  return this.checkboxB
            .filter(opt => opt.checked)
            .map(opt => opt.valor)
}

get selectedOptionsc() { // right now: ['1','3']
return this.checkboxC
          .filter(opt => opt.checked)
          .map(opt => opt.valor)
}

get selectedOptionsd() { // right now: ['1','3']
return this.checkboxD
          .filter(opt => opt.checked)
          .map(opt => opt.valor)
}

get selectedOptionse() { // right now: ['1','3']
return this.checkboxE
          .filter(opt => opt.checked)
          .map(opt => opt.valor)
}

onSubmit(){
this.tasacionForm.controls['caracteristicasZona'].setValue(this.selectedOptions);
this.tasacionForm.controls['materialConstruccion'].setValue(this.selectedOptionsb);
this.tasacionForm.controls['amenidades'].setValue(this.selectedOptionsc);
this.tasacionForm.controls['sistemaElectrico'].setValue(this.selectedOptionsd);
this.tasacionForm.controls['artefactosAdicionales'].setValue(this.selectedOptionse);
this.tscApi.updateTasacion(this.tasacionForm.value).subscribe(res =>{
  
})

}

generar(checkbox:any[],checkboxL: any[], guardar:any[]){
checkboxL.forEach(element => {
  if(checkbox.includes(element.nombre)){
    var obj: Object ={
      nombre: element.nombre,
      valor: element.valor,
      checked: true
    }
    guardar.push(obj);
  }
  else{
    var obj: Object ={
      nombre: element.nombre,
      valor: element.valor,
      checked: false
    }
    guardar.push(obj);
  }

});

}

}
