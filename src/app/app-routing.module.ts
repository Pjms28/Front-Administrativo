import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarContenidoComponent } from './listar-contenido/listar-contenido.component';
import { AgregarProyectoComponent } from './agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';


const routes: Routes = [
{
  path: 'listar-contenido',
  component: ListarContenidoComponent,
  data: {tittle: 'Lista de proyectos'}
},
{
  path: 'detalle-proyecto/:id',
  component: DetalleProyectoComponent,
  data: {tittle: 'Detalles del producto'}

},
{
  path: 'agregar-proyecto',
  component: AgregarProyectoComponent,
  data:{tittle:'Agregar proyecto'} 
},
{
  path: 'editar-proyecto/:id',
  component: EditarProyectoComponent,
  data:{tittle: 'Editar proyecto'}
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
