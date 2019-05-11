import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {first} from "rxjs/operators";
import { InmuebleModel } from '../../modelos/inmueble.model';
import { InmuebleService } from '../../shared/inmueble.service';
import { ApiService } from '../../shared/api.service';
import { CaracteristicaService } from 'src/app/shared/caracteristica.service';
import { CaracteristicaModel } from 'src/app/modelos/caracteristicas.model';
import { CaracteristicaInmuebleModel } from 'src/app/modelos/caracteristicainmueble.model';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  data : ProyectoComponent[] = [];
  inmueble : InmuebleModel;
  editForm: FormGroup;
  checkbox:any [] = [];
  caraceristicas: CaracteristicaModel [] = [];
  caracteristicainmueble: CaracteristicaInmuebleModel = new CaracteristicaInmuebleModel();
  id: number;

  constructor(private formBuilder: FormBuilder, private apiIn: InmuebleService, private apiService: ApiService, private router: Router
    ,private toastr: ToastrService, private apiCar: CaracteristicaService) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      inmuebleID:['', [Validators.required]],
      nombreInmueble:['', [Validators.required]],
      precio: ['',[Validators.required]],
      descripcionInmueble:['',[Validators.required]],
      proyectoID: ['',[Validators.required]],
      cantidadHabitaciones:['',[Validators.required]],
      cantidadBanos:['',[Validators.required]],
      cantidadParqueos:['',[Validators.required]]
    });

    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['listar-contenido']);
      return;
    }
    this.id = Number(userID);
    window.localStorage.removeItem("editUserID");
    this.apiIn.getInmueble(Number(userID))
    .subscribe(res => {
      this.editForm.patchValue(res);
    });

    this.apiService.getProjects()
      .subscribe(res => {
      this.data = res;    
    }, err => {
      console.log(err);
     
    }); 
  }
  
  onSubmit(){
    if(this.editForm.get("precio").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("nombreInmueble").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("descripcionInmueble").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("proyectoID").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.apiIn.updateInmueble(this.editForm.value)
      .pipe(first())
      .subscribe(data =>{
        this.toastr.info('Inmueble ha sido editado','Inmueble.Info');
        this.router.navigate(['listar-contenido']);
      })
    }
  }

       
}
