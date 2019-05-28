import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GenericData } from '../modelos/GenericData.model';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/GenericData";

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {

  constructor(private HttpClient: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getGenericData(key: string): Observable<GenericData> {
    const url = `${apiUrl}/key/${key}`;
    return this.HttpClient.get<GenericData>(url).pipe(
      tap(_ => catchError(this.handleError<GenericData>(`getInmueble id=${key}`))
    ));
  }

  updateGenericData (genericData: GenericData): Observable<GenericData> {
    return this.HttpClient.put<GenericData>(apiUrl +"/"+ genericData.Key,genericData, httpOptions)
      .pipe(
      );
  }

  getAllGenericData():Observable<GenericData[]> {
    return this.HttpClient.get<GenericData[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getState', []))
      ));
  }

  addGenericData(data: GenericData){
    return this.HttpClient.post<GenericData>(apiUrl,data,httpOptions)
    .pipe(tap((nuevaDataGenerica: GenericData) => catchError(this.handleError<GenericData>('addGenericData'))
    ));
  }


}

