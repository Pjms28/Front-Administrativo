import { ServicioModel } from './servicio.model';
import { SolicitudModel } from './Solicitud.model';
import { EstadoModel } from './estado.model';

export class ServicioSolicitudModel {
    servicioID: number
    servicio: ServicioModel
    solicitudID:number
    solicitud: SolicitudModel
    estadoID:number
    estado: EstadoModel
    
  }