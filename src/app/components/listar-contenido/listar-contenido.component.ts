import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { CaracteristicaService } from '../../shared/caracteristica.service';
import { InmuebleService } from '../../shared/inmueble.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import { ServicioService } from 'src/app/shared/servicio.service';
import { ForoService } from 'src/app/shared/foro.service';

@Component({
  selector: 'app-listar-contenido',
  templateUrl: './listar-contenido.component.html',
  styleUrls: ['./listar-contenido.component.css'],
  providers: [NgbPaginationConfig]
})


export class ListarContenidoComponent implements OnInit {
  totalItems: number;
  page: number;
  previousPage: number;
  showPagination: boolean;
  data: any = [];
  form : any;
  constructor(private router: Router, private config: NgbPaginationConfig, private api: ApiService, private inmuebleApi: InmuebleService, private caracteristicaApi: CaracteristicaService, 
    private toastr: ToastrService, public apiSer: ServicioService, public apiCtg: ForoService) { }
  value:string="";
  p: number = 1;
  ngOnInit() {
    }

    Select(event:any){
      this.value = event.target.value;
      if(this.value=="Proyectos"){
        return this.api.getProjects()
      .subscribe(res => {
      this.data = res;
    
    }, err => {
      console.log(err);
     
    });
      }
      
      if(this.value=="Inmuebles"){
        return this.inmuebleApi.getInmuebles()
        .subscribe(res =>{
          this.data = res;
        }, err =>{
          console.log(err);
        });
      }

      if(this.value=="Caracteristicas"){
        return this.caracteristicaApi.getCaracteristicas()
        .subscribe(res =>{
          this.data = res;
        }, err =>{
          console.log(err);
        });
      }

      if(this.value=="Servicios"){
        return this.apiSer.getServices()
      .subscribe(res => {
      this.data = res;
    
    }, err => {
      console.log(err);
     
    });
      }

      if(this.value=="Categoria"){
        return this.apiCtg.getTemas()
      .subscribe(res => {
      this.data = res;
    
    }, err => {
      console.log(err);
     
    });
      }


    }

    loadList() {
      return this.api.getProjects().subscribe((res: {}) => {
        this.data = res;
      })
    }

    eliminar(d : any){
      if(this.value == "Proyectos"){
        if(confirm('¿Esta seguro que desea eliminar este proyecto?, tambien se borraran los inmuebles y caracteristicas existentes asignados a este proyecto.')){
          return this.api.deleteProject(d.proyectoID).
          subscribe(res=>{
            this.toastr.warning('Proyecto eliminado exitosamente','Proyecto.Eliminado');
            this.loadList();
          });
        }
      }

      if(this.value == "Inmuebles"){
        if(confirm('¿Esta seguro que desea eliminar este inmueble?')){
          return this.inmuebleApi.deleteInmueble(d.inmuebleID).
          subscribe(res=>{
            this.toastr.warning('Inmueble eliminado exitosamente','Inmueble.Eliminado');
            return this.inmuebleApi.getInmuebles().subscribe((res: {}) => {
              this.data = res;
            })
          });
        }
      }
      
      if(this.value == "Caracteristicas"){
        if(confirm('¿Esta seguro que desea eliminar esta caracteristica?')){
          return this.caracteristicaApi.deleteCaracteristica(d.caracteristicaID).
          subscribe(res=>{
            this.toastr.warning('Caracteristica eliminado exitosamente','Caracteristica.Eliminada');
            return this.caracteristicaApi.getCaracteristicas().subscribe((res: {}) => {
              this.data = res;
            })
          });
        }
      }

      if(this.value == "Servicios"){
        if(confirm('¿Esta seguro que desea eliminar este servicio?')){
          return this.apiSer.deleteService(d.servicioID).
          subscribe(res=>{
            this.toastr.warning('Servicio eliminado exitosamente','Servicio.Eliminado');
            return this.apiSer.getServices().subscribe((res: {}) => {
              this.data = res;
            })
          });
        }
      }

      if(this.value == "Categoria"){
        if(confirm('¿Esta seguro que desea eliminar esta categoria?, Tambien se eliminaran los post pertenecientes a esta categoria ')){
          return this.apiCtg.deleteCategoria(d.temaID).
          subscribe(res=>{
            this.toastr.warning('Categoria eliminada exitosamente','Categoria.Eliminada');
            return this.apiCtg.getTemas().subscribe((res: {}) => {
              this.data = res;
            })
          });
        }
      }
    }

    updateProject(project: any){
      if(this.value == "Proyectos"){
        window.localStorage.removeItem("editUserID");
        window.localStorage.setItem("editUserID", String(project.proyectoID));
        this.router.navigate(['editar-proyecto']);
      }
      if(this.value == "Inmuebles"){
        window.localStorage.removeItem("editUserID");
        window.localStorage.setItem("editUserID", String(project.inmuebleID));
        this.router.navigate(['editar-inmueble']);
      }
      if(this.value == "Caracteristicas"){
        window.localStorage.removeItem("editUserID");
        window.localStorage.setItem("editUserID", String(project.caracteristicaID));
        this.router.navigate(['editar-caracteristica']);
      }
      if(this.value == "Servicios"){
        window.localStorage.removeItem("editUserID");
        window.localStorage.setItem("editUserID", String(project.servicioID));
        this.router.navigate(['editar-servicio']);
      }
      if(this.value == "Categoria"){
        this.router.navigate(['editar-categoria/'+project.temaID]);
      }

    }

  }


