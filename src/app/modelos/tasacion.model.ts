import { TmplAstTextAttribute } from '@angular/compiler';

export class TasacionModel{

    tasacionID: number

    //informe general 
    descripcionInmueble: string
    tasadorNombre: string
    asesorNombre: string
    tecnicoNombre: string
    direccionConstructora: string
    telefonoConstructora: string
    correoCompañia: string
    clienteNombre: string
    fecha: Date
    ciudad: string
    pais: string
    banco: string 

    //Certificador de avaluo

    noCatastral: string
    matricula: string 
    precio: number
    letraPrecio: string

    //Informe de avaluo de propiedad

    propietario: string
    valuador: string
    direccion: string
    telefono: string

    //Nombre del solicitante <<Nombre del cliente>>

    derechoPropiedad: string
    ocupadoPor: string
    utilidadInmueble: number

    //Descripcion de la vecindad

    tipoVecindad: string
    tendenciaVecindad: string
    comparacionVecindario: string
    antiguedadPromedio: number
    areaConstruida: number
    oferta: string
    demanda: string
    deseabilidadPropiedad: string
    distanciaEscuelaP: number
    distanciaEscuelaS: number
    distanciaTransporte: number
    distanciaComercio: number
    distanciaCiudad: number


    //Descripcion de la zona

    limitesNaturales: string
    caracteristicasZona:[]
    area: number
    fuente: string
    topografia: string
    configuracion: string
    zonificacion: string
    usoPropiedad: string
    areaVerde: string
    servidumbre: string
    marquesina: string
    instalacionElectrica: string

    //Descripcion de las mejoras agregar propiedad al modelo del back
    construccionTerminada: string
    añoEstimado:Date
    areaPiso:string
    xtotal: number
    ventanaMarco: string
    sotano: string
    areaTotalSotano: number
    tipoInmueble: string
    estructura: string
    materialConstruccion: []
    revestimientoExterior: string
    materialTecho: string
    condicionExterna: string

    //Descripcion del interior de la propiedad
    tipoPiso: string
    distribucionArq: string
    armarios: string
    dormitorios: string
    baños: string
    noBaños: number
    codicionInterna: string
    paredesMaterial: string
    techos: string
    otrosDetalles: string
    murosCimientos: string
    tuberiasSanitarias: string
    calentadorAgua: string
    capacidadCalentador: number
    sistemaElectrico: []
    artefactosAdicionales: []
    amenidades:[]
    noParqueos: number
    otrasMejoras: string
    comentarios: string

    //Distribucion Habitaciones

    numeroPiso: number
    habitaciones: number
    entrada: number
    salaEstar: number
    cocina: number
    comedor: number
    bañoCompleto: number
    bañoParcial: number
    terraza: number
    lavanderia: number
    cuartoServicio: number
    parqueos: number

    //Metodologias de venta

    fuenteManualCosto: string
    valorTerreno: number
    metroInmueble:number
    metroTerraza: number
    costoMetroInmueble:number
    costoMetroTerraza: number

    //Enfoque de venta comparables

    fechaVenta: Date
    precioVenta: number
    tamaño: number
    precioPorM2: number
    condicion: string
    estilo: string
    valorAjustado: number

    //Descripcion 2

    direccion2: string
    fechaVenta2: Date
    precioVenta2: number
    tamaño2: number
    precioMetro2: number
    condicion2: string
    estilo2: string
    noBaños2: number
    noHabitacion2:number
    noParquero2:number
    condicionFisica2: string
    valoresAjustados2:number

    //Descripcion 3

    direccion3: string
    fechaVenta3: Date
    precioVenta3: number
    tamaño3: number
    precioMetro3: number
    condicion3: string
    estilo3: string
    noHabitacion3:number
    noBaños3:number
    noParquero3:number
    condicionFisica3: string
    valoresAjustados3:number

    //Conclusiones
    conclusiones: string
    valorEnfoqueVentas: number
    //opnionValorMercado: number
    opinionValorLiquidacion: number
    valorDelMismo: number
    comentariosVentas: string
    fechaDiaTasacion: Date
    //valorConsiderado: number
    ventaAdicional: string
    suplementoInformativo: string
    plano: string
    condicionesRestrictivas: string
    otro: string
    revisor: string
    numeroRegistro: number
    fechaInspeccion: Date

}