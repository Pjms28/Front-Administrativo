import { UsuarioModel } from './usuario.model';
import { VisitaModel } from './visita.model';

export class SolicitudModel {
    solicitudID: number
    fechaSol: Date
    fechaServSol: Date
    usuarioID: number
    comentario:string
    usuario: UsuarioModel
    visita: VisitaModel
}
