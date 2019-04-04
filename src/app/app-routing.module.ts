import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContenidoComponent } from './components/listar-contenido/listar-contenido.component';
import { AgregarProyectoComponent } from './components/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { AgregarInmuebleComponent } from './components/agregar-inmueble/agregar-inmueble.component';
import { EditarInmuebleComponent } from './components/editar-inmueble/editar-inmueble.component';
import { AgregarCaracteristicaComponent } from './components/agregar-caracteristica/agregar-caracteristica.component';
import { EditarCaracteristicaComponent } from './components/editar-caracteristica/editar-caracteristica.component';
import { AdministrarSolicitudesComponent } from './components/administrar-solicitudes/administrar-solicitudes.component';
import { AgendarVisitaComponent } from './components/agendar-visita/agendar-visita.component';
import { AgregarVisitaComponent } from './components/agregar-visita/agregar-visita.component';
import { AgregarServicioComponent } from './components/agregar-servicio/agregar-servicio.component';
import { DescripcionSolicitudComponent } from './components/descripcion-solicitud/descripcion-solicitud.component';


const routes: Routes = [
{
  path: 'listar-contenido',
  component: ListarContenidoComponent,
  
},
{
  path: 'detalle-proyecto/:id',
  component: DetalleProyectoComponent,
  

},
{
  path: 'agregar-proyecto',
  component: AgregarProyectoComponent,
   
},
{
  path: 'editar-proyecto',
  component: EditarProyectoComponent,
  
},
{
  path:'agregar-inmueble',
  component: AgregarInmuebleComponent,
},
{
  path:'editar-inmueble',
  component: EditarInmuebleComponent
},
{
  path: 'agregar-caracteristica',
  component: AgregarCaracteristicaComponent
},
{
  path: 'editar-caracteristica',
  component: EditarCaracteristicaComponent
},
{
  path: 'administrar-solicitudes',
  component: AdministrarSolicitudesComponent
},
{
  path: 'agendar-visita',
  component: AgendarVisitaComponent
},
{
  path: 'agregar-visita',
  component: AgregarVisitaComponent
},
{
  path: 'agregar-servicio',
  component: AgregarServicioComponent
},
{
  path: 'descripcion-solicitud',
  component: DescripcionSolicitudComponent
},
{
  path:'',
  redirectTo: '/',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
