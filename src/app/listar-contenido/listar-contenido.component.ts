import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { ElementFinder } from 'protractor';

@Component({
  selector: 'app-listar-contenido',
  templateUrl: './listar-contenido.component.html',
  styleUrls: ['./listar-contenido.component.css']
})
export class ListarContenidoComponent implements OnInit {

  data: ProyectoComponent[] = [];
  constructor(private api: ApiService) { }
  value:string="";
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
      }

      if(this.value=="Caracteristicas"){
        console.log("Caracteristicas")
      }
    }

  }


