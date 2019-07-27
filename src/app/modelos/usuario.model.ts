import { SolicitudModel } from './Solicitud.model';

export class UsuarioModel{

    clienteID:number;
    nombre: string;
    apellidos: string;
    email: string;
    fechaNacimiento: Date;
    telefono: number;
    solicitud: SolicitudModel;
}