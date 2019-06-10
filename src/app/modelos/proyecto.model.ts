import { ImagenProyecto } from 'imagen-proyecto.model';

export class Proyecto {
    ProyectoID: number;
    NombreProyecto: string;
    FechaTerminacion: string;
    Latitude: string;
    Longitude: string;
    Direccion: string;
    ImgUrl: string;
    DocumentoResumenPDF: string;
    Estado: string;
    Imagenes: any[] = [];


}