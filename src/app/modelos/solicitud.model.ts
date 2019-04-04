import { UsuarioModel } from './usuario.model';

export class SolicitudModel {
    solicitudID: number
    fechaSol: Date
    fechaServSol: Date
    usuarioID:number
    comentario:string
    usuario: UsuarioModel
  }