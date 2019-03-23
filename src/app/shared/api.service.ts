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

  
  list: ProyectoComponent [];
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
        tap(heroes => catchError(this.handleError('getProjects', []))
      ));
  }
  
  getProject(id: number): Observable<ProyectoComponent> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ProyectoComponent>(url).pipe(
      tap(_ => catchError(this.handleError<ProyectoComponent>(`getProject id=${id}`))
    ));
  }

  sendFormData(formData: any){
    var t = `${apiUrl}/${'SaveFile'}`;
    this.http.post(t, formData).subscribe((val) => {
    });
  }

  refreshList(){
    this.http.get(apiUrl)
    .toPromise().then(res => this.list = res as ProyectoComponent[]);
  }

  addProject(proyecto: ProyectoComponent){
    return this.http.post<ProyectoComponent>(apiUrl,proyecto,httpOptions)
    .pipe(tap((nuevoProyecto: ProyectoComponent) => catchError(this.handleError<ProyectoComponent>('addProject'))
    ));
  }

  deleteProject (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteProject'))
    );
    }

    updateProject (proyecto: ProyectoComponent): Observable<ProyectoComponent> {
      return this.http.put<ProyectoComponent>(apiUrl +"/"+ proyecto.proyectoID,proyecto, httpOptions)
        .pipe(
          catchError(this.handleError('updateProject', proyecto))
        );
    }
  

}

