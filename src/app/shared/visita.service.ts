import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { VisitaModel } from './visita.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/visita";

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getVisits (): Observable<VisitaModel[]> {
    return this.http.get<VisitaModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getVisits', []))
      ));
  }

  getVisit(id: number): Observable<VisitaModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<VisitaModel>(url).pipe(
      tap(_ => catchError(this.handleError<VisitaModel>(`getVisita id=${id}`))
    ));
  }

  addVisit(visita: VisitaModel){
    return this.http.post<VisitaModel>(apiUrl,visita,httpOptions)
    .pipe(tap((nuevoVisita: VisitaModel) => console.log('entre')),
    catchError(this.handleError<VisitaModel>('addVisit'))

    );
  }

  deleteVisit (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteVisit'))
    );
  }

  updateVisit (visita: VisitaModel): Observable<VisitaModel> {
    return this.http.put<VisitaModel>(apiUrl +"/"+ visita.visitaID,visita, httpOptions)
      .pipe(
        catchError(this.handleError('updateVisit', visita))
      );
  }


}
