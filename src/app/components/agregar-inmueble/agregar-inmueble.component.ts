import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { InmuebleModel } from '../../modelos/inmueble.model';
import { InmuebleService } from '../../shared/inmueble.service';
import { ApiService } from '../../shared/api.service';
import { CaracteristicaModel } from '../../modelos/caracteristicas.model';
import { CaracteristicaService } from '../../shared/caracteristica.service';

@Component({
  selector: 'app-agregar-inmueble',
  templateUrl: './agregar-inmueble.component.html',
  styleUrls: ['./agregar-inmueble.component.css']
})
export class AgregarInmuebleComponent implements OnInit {

  data : ProyectoComponent[] = [];
  inmueble : InmuebleModel;
  addForm: FormGroup;
  checkbox:any [] = [];
  
  constructor(private formBuilder: FormBuilder, private apiIn: InmuebleService, private apiService: ApiService, private router: Router
    ,private toastr: ToastrService,  public actRoute: ActivatedRoute, private apiCar: CaracteristicaService) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      precio: ['',[Validators.required]],
      nombreInmueble:['', [Validators.required]],
      descripcionInmueble:['', [Validators.required]],
      proyectoID: ['', [Validators.required]],
      cantidadHabitaciones:['',[Validators.required]],
      cantidadBanos:['',[Validators.required]],
      cantidadParqueos:['',[Validators.required]],
      moneda:['',[Validators.required]],
      mts:['',[Validators.required]]
    });

    

    this.apiService.getProjects()
      .subscribe(res => {
      this.data = res;
    
    }, err => {
      console.log(err);
     
    });
  }

   
  onSubmit(){
   if(this.addForm.get("precio").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("nombreInmueble").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("descripcionInmueble").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("proyectoID").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else {
      this.apiIn.addInmueble(this.addForm.value)
      .subscribe(data =>{
        if(data == null){
          this.toastr.error('El nombre del inmueble ya ha sido registrado','Inmueble.Registro');
        }
        else{
          this.toastr.success('Inmueble ha sido creado exitosamente','Inmueble.Registro');
          this.router.navigate(['inmuebles']);
        }
      });
    }
  }



}
