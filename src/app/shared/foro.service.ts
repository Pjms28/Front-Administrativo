import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { CategoriaModel } from '../modelos/categoria.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/TemasForo";


@Injectable({
  providedIn: 'root'
})
export class ForoService {


  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTemas (): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getTemas', [])))
      );
  }

  getTema(id: number): Observable<CategoriaModel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<CategoriaModel>(url).pipe(
      tap(_ => catchError(this.handleError<CategoriaModel>(`getTema id=${id}`))
    ));
  }


  addCategoria(categoria: CategoriaModel){
    return this.http.post<CategoriaModel>(apiUrl,categoria,httpOptions)
    .pipe(tap((categoria: CategoriaModel) => catchError(this.handleError<CategoriaModel>('addCategoria'))
    ));
  }

  deleteCategoria(id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteCategoria'))
    );
    }

    updateCategoria(categoria: CategoriaModel): Observable<CategoriaModel> {
      return this.http.put<CategoriaModel>(apiUrl +"/"+ categoria.temaID,categoria, httpOptions)
        .pipe(
          catchError(this.handleError('updateProject', categoria))
        );
    }


}
