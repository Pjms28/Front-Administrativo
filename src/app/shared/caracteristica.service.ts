import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { CaracteristicaModel } from '../modelos/caracteristicas.model';
import { CaracteristicaProyectoModel } from '../modelos/caracteristicaproyecto.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/caracteristicas";


@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCaracteristicas (): Observable<CaracteristicaModel[]> {
    return this.http.get<CaracteristicaModel[]>(apiUrl)
      .pipe(
        tap(heroes =>catchError(this.handleError('getCaracteristicas', [])))
      );
  }

  getCaracteristica(id: number): Observable<CaracteristicaModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<CaracteristicaModel>(url).pipe(
      tap(_ => catchError(this.handleError<CaracteristicaModel>(`getCaracteristica id=${id}`))
    ));
  }

  getCaracteristicasP():Observable<any>{
    const url = `${apiUrl}/${"GetCaracteristicaProyecto"}`;
    return this.http.get<any>(url).pipe(
      tap(_ => catchError(this.handleError<any>(`getCaracteristica`))
    ));
  } 

  getCaracteristicasProyecto(id: number):Observable<any>{
    const url = `${apiUrl}/${"GetByProyecto/" + id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => catchError(this.handleError<any>(`getCaracteristica id=${id}`))
    ));
  } 
  addCaracteristica(caracteristica: CaracteristicaModel){
    return this.http.post<CaracteristicaModel>(apiUrl,caracteristica,httpOptions)
    .pipe(tap((nuevaCaracteristica: CaracteristicaModel) => catchError(this.handleError<CaracteristicaModel>('addCaracteristica'))
    ));
  }

  deleteCaracteristica (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteCaracteristica'))
    );
    }

  updateCaracteristica (caracteristica: CaracteristicaModel): Observable<CaracteristicaModel> {
    return this.http.put<CaracteristicaModel>(apiUrl +"/"+ caracteristica.caracteristicaID,caracteristica, httpOptions)
      .pipe(
        catchError(this.handleError('updateCaracteristica', caracteristica))
      );
    }

    addCaracteristicaProyecto(caracteristicaproyecto: CaracteristicaProyectoModel){
      const url = `${apiUrl}/${"CaracteristicaProyecto"}`;
      return this.http.post<CaracteristicaProyectoModel>(url,caracteristicaproyecto, httpOptions)
      .pipe(
        catchError(this.handleError('addCaracteristicaproyecto', caracteristicaproyecto))
      );
    }
    
    deleteCaracteristicaProyecto (id: number): Observable<{}> {
      const url = `${apiUrl}/${"DeleteCaracterisiticaByProyecto/"+ id}`;
      return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError('deleteCaracteristica'))
      );
    }
  

}
