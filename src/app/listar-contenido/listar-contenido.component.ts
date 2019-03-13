import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { CaracteristicaService } from '../shared/caracteristica.service';
import { InmuebleService } from '../shared/inmueble.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-contenido',
  templateUrl: './listar-contenido.component.html',
  styleUrls: ['./listar-contenido.component.css']
})
export class ListarContenidoComponent implements OnInit {

  data: any = [];
  form : any;
  constructor(private router: Router, private api: ApiService, private inmuebleApi: InmuebleService, private caracteristicaApi: CaracteristicaService, 
    private toastr: ToastrService) { }
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
      console.log(this.data);
    
    }, err => {
      console.log(err);
     
    });
      }
      
      if(this.value=="Inmuebles"){
        console.log("Inmuebles")
        return this.inmuebleApi.getInmuebles()
        .subscribe(res =>{
          this.data = res;
          console.log(this.data);
        }, err =>{
          console.log(err);
        });
      }

      if(this.value=="Caracteristicas"){
        console.log("Caracteristicas")
        return this.caracteristicaApi.getCaracteristicas()
        .subscribe(res =>{
          this.data = res;
          console.log(this.data);
        }, err =>{
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
            this.loadList();
            this.toastr.warning('Proyecto creado exitosamente','Proyecto.Registro');
          });
        }
      }

      if(this.value == "Inmuebles"){
        if(confirm('¿Esta seguro que desea eliminar este inmueble?, tambien se borraran las caracteristicas existentes asignados a este inmueble.')){
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
      

    }

  }


