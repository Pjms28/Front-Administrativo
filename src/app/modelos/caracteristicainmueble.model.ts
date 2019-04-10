import { CaracteristicaModel } from './caracteristicas.model';
import { InmuebleModel } from './inmueble.model';
import { NumberValueAccessor } from '@angular/forms/src/directives';

export class CaracteristicaInmuebleModel{

    caracteristica:CaracteristicaModel;
    caracteristicaID: number;
    inmueble: InmuebleModel;
    inmuebleID: number;
}