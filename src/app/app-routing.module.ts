import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* import { ListarContenidoComponent } from './components/listar-contenido/listar-contenido.component'; */
import { AgregarProyectoComponent } from './components/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { AgregarInmuebleComponent } from './components/agregar-inmueble/agregar-inmueble.component';
import { EditarInmuebleComponent } from './components/editar-inmueble/editar-inmueble.component';
import { AgregarCaracteristicaComponent } from './components/agregar-caracteristica/agregar-caracteristica.component';
import { EditarCaracteristicaComponent } from './components/editar-caracteristica/editar-caracteristica.component';
import { CategoriasForoComponent } from './components/categorias-foro/categorias-foro.component';
import { AdministrarSolicitudesComponent } from './components/administrar-solicitudes/administrar-solicitudes.component';
import { AgendarVisitaComponent } from './components/agendar-visita/agendar-visita.component';
import { AgregarServicioComponent } from './components/agregar-servicio/agregar-servicio.component';
import { DescripcionSolicitudComponent } from './components/descripcion-solicitud/descripcion-solicitud.component';
import { CambioEstadoComponent } from './components/cambio-estado/cambio-estado.component';
import { EditarServicioComponent } from './components/editar-servicio/editar-servicio.component';
import { AdministrarPeticionesComponent } from './components/administrar-peticiones/administrar-peticiones.component';
import { DetallePeticionComponent } from './components/detalle-peticion/detalle-peticion.component';
import { AuthGuard } from "../app/guard/auth.guard";
import { EditarPostComponent } from './components/editar-post/editar-post.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TasacionComponent } from './components/tasacion/tasacion.component';
import { EditarTasacionComponent } from '../app/components/editar-tasacion/editar-tasacion.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { TasacionesComponent } from './components/tasaciones/tasaciones.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { GenericdatalistComponent } from './components/genericdata-list/genericdata-list.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';


const routes: Routes = [
{
  path : 'login',
  component: LoginComponent,
  canActivate : []
},
{
  path: 'proyectos',
  component : ProyectosComponent,
  canActivate: [AuthGuard]
},
{
  path: 'detalle-proyecto/:id',
  component: DetalleProyectoComponent,
  canActivate:[AuthGuard]
},
{
  path: 'agregar-proyecto',
  component: AgregarProyectoComponent,
  canActivate:[AuthGuard]
},
{
  path: 'editar-proyecto',
  component: EditarProyectoComponent,
  canActivate:[AuthGuard]
},
{
  path:'agregar-inmueble',
  component: AgregarInmuebleComponent,
  canActivate:[AuthGuard]
},
{
  path:'editar-inmueble',
  component: EditarInmuebleComponent,
  canActivate:[AuthGuard]
},
{
  path: 'agregar-caracteristica',
  component: AgregarCaracteristicaComponent,
  canActivate:[AuthGuard]
},
{
  path: 'editar-caracteristica',
  component: EditarCaracteristicaComponent,
  canActivate:[AuthGuard]
},
{
  path: 'administrar-solicitudes',
  component: AdministrarSolicitudesComponent,
  canActivate:[AuthGuard]
},
{
  path: 'agendar-visita',
  component: AgendarVisitaComponent,
  canActivate:[AuthGuard]
},
{
  path: 'datos-genericos',
  component: GenericdatalistComponent,
  canActivate: [AuthGuard]
},
{
  path: 'agregar-servicio',
  component: AgregarServicioComponent,
  canActivate:[AuthGuard]
},
{
  path: 'descripcion-solicitud/: id',
  component: DescripcionSolicitudComponent,
  canActivate:[AuthGuard]
},
{
  path: 'cambiar-estado',
  component: CambioEstadoComponent,
  canActivate:[AuthGuard]
},
{
  path: 'editar-servicio',
  component: EditarServicioComponent,
  canActivate:[AuthGuard]
},
{
  path: 'administrar-peticiones',
  component: AdministrarPeticionesComponent,
  canActivate:[AuthGuard]
},
{
  path: 'detalle-peticion/: id',
  component: DetallePeticionComponent,
  canActivate:[AuthGuard]
},
{
  path: 'categorias-foro/: id',
  component: CategoriasForoComponent,
  canActivate:[AuthGuard]
},
{
  path: 'editar-post/: id',
  component: EditarPostComponent,
  canActivate:[AuthGuard]
},
{
  path: 'editar-tasacion/: id',
  component:EditarTasacionComponent,
  canActivate:[AuthGuard]
},
{
  path: 'agregar-tasacion',
  component: TasacionComponent,
  canActivate:[AuthGuard]
},
{
  path: 'pdf/: id',
  component: PdfComponent,
  canActivate:[AuthGuard]
},
{
  path: 'img/: id',
  component: ImagenesComponent,
  canActivate:[AuthGuard]
},
{
  path: 'tasacion',
  component: TasacionesComponent,
  canActivate:[AuthGuard]
},
{
  path:'',
  redirectTo: '/',
  pathMatch: 'full',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
