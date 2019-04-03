import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContenidoComponent } from './listar-contenido/listar-contenido.component';
import { AgregarProyectoComponent } from './agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { AgregarInmuebleComponent } from './agregar-inmueble/agregar-inmueble.component';
import { EditarInmuebleComponent } from './editar-inmueble/editar-inmueble.component';
import { AgregarCaracteristicaComponent } from './agregar-caracteristica/agregar-caracteristica.component';
import { EditarCaracteristicaComponent } from './editar-caracteristica/editar-caracteristica.component';
import { AdministrarSolicitudesComponent } from './administrar-solicitudes/administrar-solicitudes.component';
import { AgendarVisitaComponent } from './agendar-visita/agendar-visita.component';
import { AgregarVisitaComponent } from './agregar-visita/agregar-visita.component';
import { AgregarServicioComponent } from './agregar-servicio/agregar-servicio.component';
import { DescripcionSolicitudComponent } from './descripcion-solicitud/descripcion-solicitud.component';


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
