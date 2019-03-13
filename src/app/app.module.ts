import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { ApiService } from './shared/api.service';
import { UbicacionService } from './shared/ubicacion.service';
import { InmuebleService } from './shared/inmueble.service';
import { CaracteristicaService } from './shared/caracteristica.service';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgregarInmuebleComponent } from './agregar-inmueble/agregar-inmueble.component';
import { EditarInmuebleComponent } from './editar-inmueble/editar-inmueble.component';


@NgModule({
  declarations: [
    AppComponent,
    AgregarProyectoComponent,
    ListarContenidoComponent,
    ProyectoComponent,
    EditarProyectoComponent,
    DetalleProyectoComponent,
    AgregarInmuebleComponent,
    EditarInmuebleComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'Agregar', component: AgregarProyectoComponent},
      {path: 'Listar', component: ListarContenidoComponent},
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ApiService,UbicacionService,InmuebleService,CaracteristicaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
