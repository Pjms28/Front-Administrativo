export class TasacionModel{

    tasacionID: number 
    descripcionInmueble: string
    tasadorNombre: string
    asesorNombre: string
    tecnicoNombre: string
    direccionConstructora: string
    telefonoConstructora: string
    correoCompañia: string
    clienteNombre: string
    fecha: string
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

    //Descripcion de las mejoras
    construccionTerminada: string
    xtotal: number
    ventanaMarco: string
    sotano: string
    tipoInmueble: string
    estructura: string
    materialConstruccion: string
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
    sistemaElectrico: string
    artefactosAdicionales: []
    noParqueos: number
    otrasMejoras: string
    comentarios: string

    //Distribucion Habitaciones

    nivelesCasa: number
    cantidadPiso: number
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

    //Enfoque de venta comparables

    fechaVenta: Date
    precioVenta: number
    tamaño: number
    precioPorM2: number
    condicion: string
    estilo: string
    valorAjustado: number


    //Conclusiones
    conclusiones: string
    valorEnfoqueVentas: number
    opnionValorMercado: number
    opinionValorLiquidacion: number
    valorDelMismo: number
    comentariosVentas: string
    fechaDiaTasacion: Date
    valorConsiderado: number
    ventaAdicional: string
    suplementoInformativo: string
    plano: string
    condicionesRestrictivas: string
    otro: string
    revisor: string
    numeroRegistro: number
    fechaInspeccion: Date

}