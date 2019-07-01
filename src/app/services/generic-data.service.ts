import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GenericData } from '../modelos/GenericData.model';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,FormBuilder, FormControl, Validators } from "@angular/forms";
import config from '../../config.js';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = config.api+"/DatosGenericos";

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {

  constructor(private HttpClient: HttpClient) { }

  form: FormGroup = new FormGroup({
    id : new FormControl(0),
    key : new FormControl('',[Validators.required,Validators.minLength(4)]),
    value : new FormControl('',[Validators.required]),
    descripcion: new FormControl('')
  });

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

  deleteGenericData (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`; // DELETE api/heroes/42
    return this.HttpClient.delete(url, httpOptions)
    .pipe(
    catchError(this.handleError('deleteProject'))
    );
    }

  updateGenericData (genericData:any): Observable<GenericData> {
    return this.HttpClient.put<GenericData>(apiUrl +"/"+ genericData.id,genericData, httpOptions)
    .pipe(tap((nuevaDataGenerica: GenericData) => catchError(this.handleError<GenericData>('updateDataGenerica'))
    ));
  }

  getAllGenericData():Observable<GenericData[]> {
    return this.HttpClient.get<GenericData[]>(apiUrl)
      .pipe(
        tap(heroes => catchError(this.handleError('getState', []))
      ));
  }

  addGenericData(data: GenericData){
    console.log('data :', data);
    return this.HttpClient.post<GenericData>(apiUrl,data,httpOptions)
    .pipe(tap((nuevaDataGenerica: GenericData) => catchError(this.handleError<GenericData>('addGenericData'))
    ));
  }

  initializeFormGroup(){
    this.form.setValue({
      id: '',
      key : '',
      value :'',
      descripcion :''
    })
  }

  pupulateForm(dato){
    this.form.setValue(dato)
  }




}

