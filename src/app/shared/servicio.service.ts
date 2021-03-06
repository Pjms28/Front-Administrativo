import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ServicioModel } from './servicio.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/servicios";

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  list: ServicioModel [];
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getServices (): Observable<ServicioModel[]> {
    return this.http.get<ServicioModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getServices', []))
      ));
  }
  
  getService(id: number): Observable<ServicioModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ServicioModel>(url).pipe(
      tap(_ => catchError(this.handleError<ServicioModel>(`getService id=${id}`))
    ));
  }

  refreshList(){
    this.http.get(apiUrl)
    .toPromise().then(res => this.list = res as ServicioModel[]);
  }

  addService(proyecto: ServicioModel){
    return this.http.post<ServicioModel>(apiUrl,proyecto,httpOptions)
    .pipe(tap((nuevoProyecto: ServicioModel) => catchError(this.handleError<ServicioModel>('addService'))
    ));
  }

  deleteService (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteProject'))
    );
    }

    updateService (servicio: ServicioModel): Observable<ServicioModel> {
      return this.http.put<ServicioModel>(apiUrl +"/"+ servicio.servicioID,servicio, httpOptions)
        .pipe(
          catchError(this.handleError('updateService', servicio))
        );
    }
  
}
