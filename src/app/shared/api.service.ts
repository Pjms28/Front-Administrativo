import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ProyectoComponent } from '../proyecto/proyecto.component';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/proyectos";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  formData : ProyectoComponent;
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProjects (): Observable<ProyectoComponent[]> {
    return this.http.get<ProyectoComponent[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('Proyectos recuperados')),
        catchError(this.handleError('getProjects', []))
      );
  }
  
  getProject(id: number): Observable<ProyectoComponent> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ProyectoComponent>(url).pipe(
      tap(_ => console.log(`Proyecto recuperado id=${id}`)),
      catchError(this.handleError<ProyectoComponent>(`getProject id=${id}`))
    );
  }

  addProject(proyecto: ProyectoComponent){

    console.log('******',proyecto);
    return this.http.post<ProyectoComponent>(apiUrl,proyecto,httpOptions)
    .pipe(tap((nuevoProyecto: ProyectoComponent) => console.log(`added hero w/ id=${nuevoProyecto.ProyectoID}`)),
    catchError(this.handleError<ProyectoComponent>('addProject'))
    );
  }

}

