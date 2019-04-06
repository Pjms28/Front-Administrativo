import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarProyectoComponent } from './components/agregar-proyecto/agregar-proyecto.component';
import { from } from 'rxjs';
import { ListarContenidoComponent } from './components/listar-contenido/listar-contenido.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
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
import { AgregarInmuebleComponent } from './components/agregar-inmueble/agregar-inmueble.component';
import { EditarInmuebleComponent } from './components/editar-inmueble/editar-inmueble.component';
import { AgregarCaracteristicaComponent } from './components/agregar-caracteristica/agregar-caracteristica.component';
import { EditarCaracteristicaComponent } from './components/editar-caracteristica/editar-caracteristica.component';
import { AdministrarSolicitudesComponent } from './components/administrar-solicitudes/administrar-solicitudes.component';
import { AgmCoreModule } from '@agm/core';
import { SolicitudService } from './shared/solicitud.service';
import { ServicioService } from './shared/servicio.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { AgendarVisitaComponent } from './components/agendar-visita/agendar-visita.component';
import { VisitaService } from './shared/visita.service';
import { AgregarVisitaComponent } from './components/agregar-visita/agregar-visita.component';
import { AgregarServicioComponent } from './components/agregar-servicio/agregar-servicio.component';
import { DescripcionSolicitudComponent } from './components/descripcion-solicitud/descripcion-solicitud.component';
import { CambioEstadoComponent } from './components/cambio-estado/cambio-estado.component';
import { DemoUtilsModule } from '../app/demo-utils/module';
import { EditarVisitaComponent } from './components/editar-visita/editar-visita.component';


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
    AgregarServicioComponent,
    EditarInmuebleComponent,
    AgregarCaracteristicaComponent,
    EditarCaracteristicaComponent,
    AdministrarSolicitudesComponent,
    AgendarVisitaComponent,
    AgregarVisitaComponent,
    AgregarServicioComponent,
    DescripcionSolicitudComponent,
    CambioEstadoComponent,
    EditarVisitaComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FlatpickrModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    DemoUtilsModule,
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
      {path: 'Agregar Servicio', component: AgregarServicioComponent},
      {path: 'Descripcion Solicitud', component: DescripcionSolicitudComponent},
      {path: 'Visitas Agendadas', component: AgendarVisitaComponent}

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
