import { SolicitudModel } from './Solicitud.model';

export class PeticionModel{
    peticionID: number
    tipo:string
    motivo: string
    comentario: string
    fechaSolicitada: Date
    fechaCancelacion: Date
    solicitud: SolicitudModel
    solicitudID: number
    estado: string
    createdAt: Date
}