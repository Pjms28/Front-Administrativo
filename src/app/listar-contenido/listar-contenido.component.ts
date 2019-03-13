import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { CaracteristicaService } from '../shared/caracteristica.service';
import { InmuebleService } from '../shared/inmueble.service';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { InmuebleModel } from '../shared/inmueble.model';
import { CaracteristicaModel } from '../shared/caracteristicas.model';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { ElementFinder } from 'protractor';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-contenido',
  templateUrl: './listar-contenido.component.html',
  styleUrls: ['./listar-contenido.component.css']
})
export class ListarContenidoComponent implements OnInit {

  data: any = [];
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

    eliminar(id : number){
     
      if(this.value == "Proyectos"){
        if(confirm('¿Esta seguro que desea eliminar este proyecto?, tambien se borraran los inmuebles y caracteristicas existentes asignados a este proyecto.')){
          console.log(id);
          return this.api.deleteProject(id).
          subscribe(res=>{
            this.loadList();
            this.toastr.warning('Proyecto creado exitosamente','Proyecto.Registro');
          });
        }
      }
      
    }

    updateProject(project: any){
      
      window.localStorage.removeItem("editUserID");
      window.localStorage.setItem("editUserID", String(project.proyectoID));
      this.router.navigate(['editar-proyecto']);

    }

  }


