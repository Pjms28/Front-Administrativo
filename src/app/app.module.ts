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
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './shared/api.service';
import { UbicacionService } from './shared/ubicacion.service';
import { InmuebleService } from './shared/inmueble.service';
import { CaracteristicaService } from './shared/caracteristica.service';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgregarInmuebleComponent } from './agregar-inmueble/agregar-inmueble.component';
import { EditarInmuebleComponent } from './editar-inmueble/editar-inmueble.component';
import { AgregarCaracteristicaComponent } from './agregar-caracteristica/agregar-caracteristica.component';
import { EditarCaracteristicaComponent } from './editar-caracteristica/editar-caracteristica.component';
import { AdministrarSolicitudesComponent } from './administrar-solicitudes/administrar-solicitudes.component';
import { AgmCoreModule } from '@agm/core';
import { SolicitudService } from './shared/solicitud.service';
import { ServicioService } from './shared/servicio.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { AgendarVisitaComponent } from './agendar-visita/agendar-visita.component';
import { VisitaModel } from './shared/visita.model';
import { VisitaService } from './shared/visita.service';
import { AgregarVisitaComponent } from './agregar-visita/agregar-visita.component';


@NgModule({
  declarations: [
    AppComponent,
    AgregarProyectoComponent,
    ListarContenidoComponent,
    ProyectoComponent,
    EditarProyectoComponent,
    DetalleProyectoComponent,
    NavbarComponent,
    MenuComponent,
    AgregarInmuebleComponent,
    EditarInmuebleComponent,
    AgregarCaracteristicaComponent,
    EditarCaracteristicaComponent,
    AdministrarSolicitudesComponent,
    AgendarVisitaComponent,
    AgregarVisitaComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FlatpickrModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'Agregar Proyecto', component: AgregarProyectoComponent},
      {path: 'Listar', component: ListarContenidoComponent},
      {path: 'Agregar Caracteristica', component: AgregarCaracteristicaComponent},
      {path: 'Agregar Inmueble', component: AgregarInmuebleComponent},
      {path: 'Administrar Solicitudes', component: AdministrarSolicitudesComponent},
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY'
    })
  ],
  providers: [ApiService,UbicacionService,InmuebleService,CaracteristicaService, SolicitudService,ServicioService,VisitaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
