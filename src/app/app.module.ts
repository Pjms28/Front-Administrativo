import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarProyectoComponent } from './agregar-proyecto/agregar-proyecto.component';
import { from } from 'rxjs';
import { ListarContenidoComponent } from './listar-contenido/listar-contenido.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AgregarProyectoComponent,
    ListarContenidoComponent,
    ProyectoComponent,
    EditarProyectoComponent,
    DetalleProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'Agregar', component: AgregarProyectoComponent},
      {path: 'Listar', component: ListarContenidoComponent},
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
