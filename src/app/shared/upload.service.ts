import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ImagenesModel } from '../modelos/imagenes.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:61756/api/";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addImage(imagenes: ImagenesModel){
    return this.http.post<ImagenesModel>(apiUrl + "imagenes",imagenes,httpOptions)
    .pipe(tap((nuevaImagen: ImagenesModel) => catchError(this.handleError<ImagenesModel>('addImagen'))
    ));
  }

  sendFormData(formData: any){
    var t = `${apiUrl + "Upload"}`;
    this.http.post(t, formData).subscribe((val) => {
    });
  }
}
