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
import { MenuComponent } from "./components/menu/menu.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { DatatableComponent } from './components/datatable/datatable.component';
import { CategoriasForoComponent } from './components/categorias-foro/categorias-foro.component';
import { EditarCategoriaComponent } from './components/editar-categoria/editar-categoria.component';
import { GenericdatalistComponent } from './components/genericdata-list/genericdata-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { DatoGenericoComponent } from './components/dato-generico/dato-generico.component';
import { GenericDataService } from './services/generic-data.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { InmueblesComponent } from './components/inmuebles/inmuebles.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { TemasforosComponent } from './components/temasforos/temasforos.component';
import { TasacionComponent } from './components/tasacion/tasacion.component';
import {NgxMaskModule} from 'ngx-mask';
import { EditarTasacionComponent } from '../app/components/editar-tasacion/editar-tasacion.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/jwt.interceptor';
import { AppMaterialModule } from './app-material/app-material.module';
import { TasacionesComponent } from './components/tasaciones/tasaciones.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { NavigateComponent } from './components/navigate/navigate.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidenavService } from './services/sidenav.service';




@NgModule({
  declarations: [
    AppComponent,
    AgregarProyectoComponent,
    ListarContenidoComponent,
    ProyectoComponent,
    EditarProyectoComponent,
    DetalleProyectoComponent,
    MenuComponent,
    DatatableComponent,
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
    AdministrarPeticionesComponent,
    DetallePeticionComponent,
    AgregarPostComponent,
    EditarPostComponent,
    ProyectoCaracteristicaComponent,
    MapComponent,
    CategoriasForoComponent,
    EditarCategoriaComponent,
    GenericdatalistComponent,
    DatoGenericoComponent,
    ProyectosComponent,
    InmueblesComponent,
    CaracteristicasComponent,
    ServiciosComponent,
    TemasforosComponent,
    LoginComponent,
    TasacionComponent,
    EditarTasacionComponent,
    PdfComponent,
    ImagenesComponent,
    TasacionesComponent,
    NavigateComponent,
    NavigationComponent

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
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    NgxEditorModule,
    AppMaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBgZsUHQRjS7qHQCfX9LaGJNN6G4iVicKY',
      libraries: ['places']
    }),
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports:[
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatGridListModule
  ],
  providers: [ 
    ApiService,
    SidenavService,
    InmuebleService,
    CaracteristicaService, 
    SolicitudService,
    ServicioService,
    VisitaService, 
    PeticionService, 
    CookieService,
    GenericDataService,
    AuthService,
    PdfComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[DatoGenericoComponent]
})
export class AppModule { }
