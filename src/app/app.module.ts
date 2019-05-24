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
import { InmuebleService } from './shared/inmueble.service';
import { CaracteristicaService } from './shared/caracteristica.service';
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
import { AgregarServicioComponent } from './components/agregar-servicio/agregar-servicio.component';
import { DescripcionSolicitudComponent } from './components/descripcion-solicitud/descripcion-solicitud.component';
import { CambioEstadoComponent } from './components/cambio-estado/cambio-estado.component';
import {DatePipe} from '@angular/common';
import { EditarServicioComponent } from './components/editar-servicio/editar-servicio.component';
import { DescripcionVisitaComponent } from './components/descripcion-visita/descripcion-visita.component';
import { AdministrarPeticionesComponent } from './components/administrar-peticiones/administrar-peticiones.component';
import { PeticionService } from './shared/peticion.service';
import { DetallePeticionComponent } from './components/detalle-peticion/detalle-peticion.component';
import { ToastrModule } from 'ngx-toastr';
import { AgregarPostComponent } from './components/agregar-post/agregar-post.component';
import { EditarPostComponent } from './components/editar-post/editar-post.component';
import { NgxEditorModule } from 'ngx-editor';
import { MapComponent } from './components/map/map.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from "../app/guard/auth.guard";
import { ProyectoCaracteristicaComponent } from './components/proyecto-caracteristica/proyecto-caracteristica.component';
import { CategoriasForoComponent } from './components/categorias-foro/categorias-foro.component';

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
    AgregarServicioComponent,
    DescripcionSolicitudComponent,
    CambioEstadoComponent,
    EditarServicioComponent,
    DescripcionVisitaComponent,
    AdministrarPeticionesComponent,
    DetallePeticionComponent,
    AgregarPostComponent,
    EditarPostComponent,
    ProyectoCaracteristicaComponent,
    MapComponent,
    CategoriasForoComponent
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
    ToastrModule.forRoot(),
    NgxEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'Agregar Proyecto', component: AgregarProyectoComponent,canActivate:[AuthGuard]},
      {path: 'Listar', component: ListarContenidoComponent,canActivate:[AuthGuard]},
      {path: 'Agregar Caracteristica', component: AgregarCaracteristicaComponent,canActivate:[AuthGuard]},
      {path: 'Agregar Inmueble', component: AgregarInmuebleComponent,canActivate:[AuthGuard]},
      {path: 'Administrar Solicitudes', component: AdministrarSolicitudesComponent,canActivate:[AuthGuard]},
      {path: 'Agregar Servicio', component: AgregarServicioComponent,canActivate:[AuthGuard]},
      {path: 'Descripcion Solicitud', component: DescripcionSolicitudComponent,canActivate:[AuthGuard]},
      {path: 'Visitas Agendadas', component: AgendarVisitaComponent,canActivate:[AuthGuard]},
      {path: 'Administrar Peticiones', component:AdministrarPeticionesComponent,canActivate:[AuthGuard]},
      {path: 'Agregar Post', component:AgregarPostComponent,canActivate:[AuthGuard]},
      {path: 'Categorias Foro', component:CategoriasForoComponent,canActivate:[AuthGuard]},
      {path: 'proyecto-caracteristica/: id', component: ProyectoCaracteristicaComponent, canActivate:[AuthGuard]},
      {path: '',component: MenuComponent ,canActivate:[AuthGuard]}
    ]),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBgZsUHQRjS7qHQCfX9LaGJNN6G4iVicKY',
      libraries: ['places']
    })
  ],
  providers: [ApiService,InmuebleService,CaracteristicaService, SolicitudService,ServicioService,VisitaService, PeticionService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
