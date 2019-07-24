import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SolicitudModel } from '../modelos/Solicitud.model';
import { ServicioSolicitudModel } from '../modelos/ServicioSolicitud.model';
import config from '../../config.js';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.local+"/Solicitud";


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getRequests (): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getRequests', []))
      ));
  }
  
  getRequest(id: number): Observable<SolicitudModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<SolicitudModel>(url).pipe(
      tap(_ => catchError(this.handleError<SolicitudModel>(`getRequest id=${id}`))
    ));
  }

  getServSols(): Observable<ServicioSolicitudModel[]>{
    const url = `${apiUrl}/${'ServicioSolicitud'}`;
    return this.http.get<ServicioSolicitudModel[]>(url)
    .pipe(tap(_ => catchError(this.handleError<ServicioSolicitudModel>(`getRequest`))
    ));
  }
  getServSolsA(): Observable<ServicioSolicitudModel[]>{
    const url = `${apiUrl}/${'ServicioSolicitudA'}`;
    return this.http.get<ServicioSolicitudModel[]>(url)
    .pipe(tap(_ => catchError(this.handleError<ServicioSolicitudModel>(`getRequest`))
    ));
  }


  getServSol(id: number): Observable<ServicioSolicitudModel>{
    const url = `${apiUrl}/${'ServicioSolicitud/'+id}`;
    return this.http.get<ServicioSolicitudModel>(url)
    .pipe(tap(_ => catchError(this.handleError<ServicioSolicitudModel>(`getRequest`))
    ));
  }

  updateServSol(ServicioSolicitud: ServicioSolicitudModel){
    const url = `${apiUrl}/${'ServicioSolicitud'}`;
    return this.http.put<ServicioSolicitudModel>(url +"/"+ ServicioSolicitud.solicitud.solicitudID,ServicioSolicitud, httpOptions)
        .pipe(
          catchError(this.handleError('updateServSol', ServicioSolicitud))
        );
  }

  deleteRequest (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteRequest'))
    );
    }
}
