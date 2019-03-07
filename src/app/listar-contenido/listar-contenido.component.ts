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

@Component({
  selector: 'app-listar-contenido',
  templateUrl: './listar-contenido.component.html',
  styleUrls: ['./listar-contenido.component.css']
})
export class ListarContenidoComponent implements OnInit {

  data: ProyectoComponent[] = [];
  dataIn: InmuebleModel[] = [];
  dataCa: CaracteristicaModel[] = [];
  constructor(private api: ApiService, private inmuebleApi: InmuebleService, private caracteristicaApi: CaracteristicaService) { }
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
        return this.inmuebleApi.getInmuebles()
        .subscribe(res =>{
          this.dataIn = res;
          console.log(this.dataIn);
        }, err =>{
          console.log(err);
        });
      }

      if(this.value=="Caracteristicas"){
        console.log("Caracteristicas")
        return this.caracteristicaApi.getCaracteristicas()
        .subscribe(res =>{
          this.dataCa = res;
          console.log(this.dataCa);
        }, err =>{
          console.log(err);
        });
      }

     
    }

  }


