import { UsuarioModel } from './usuario.model';

export class BlogModel{

    blogID: number
    tituloEntrada: string
    textoEntrada: string
    imgURL: string
    usuario: UsuarioModel
    usuarioID: number
    timeStampBlog: Date
    }
      