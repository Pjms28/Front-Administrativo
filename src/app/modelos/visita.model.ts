import { UsuarioModel } from './usuario.model';
import { SolicitudModel } from './Solicitud.model';
import { ServicioModel } from './servicio.model';

export class VisitaModel {

    visitaID: number;
    proyectoID: number;
    hora_Inicio: Date;
    hora_Fin: Date;
    motivo: string;
    descripcion: string;
    solicitudID: number;
    estado: string;
    usuario: UsuarioModel;
    solicitud: SolicitudModel;
    servicio: ServicioModel;
   
  }