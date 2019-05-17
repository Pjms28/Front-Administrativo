import { UsuarioModel } from './usuario.model';

export class VisitaModel {

    visitaID: number;
    proyectoID: number;
    hora_Inicio: Date;
    hora_Fin: Date;
    motivo: string;
    descripcion: string;
    solicitudID: number;
    estado: string;
    usuario: UsuarioModel
   
  }