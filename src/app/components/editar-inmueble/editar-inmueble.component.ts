import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {first} from "rxjs/operators";
import { InmuebleModel } from '../../modelos/inmueble.model';
import { InmuebleService } from '../../shared/inmueble.service';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  data : ProyectoComponent[] = [];
  inmueble : InmuebleModel;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiIn: InmuebleService, private apiService: ApiService, private router: Router
    ,private toastr: ToastrService) { }

  ngOnInit() {
    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['listar-contenido']);
      return;
    }

    this.editForm = this.formBuilder.group({
      inmuebleID:['', [Validators.required]],
      nombreInmueble:['', [Validators.required]],
      precio: ['',[Validators.required]],
      descripcionInmueble:['',[Validators.required]],
      proyectoID: ['',[Validators.required]]
    });
    window.localStorage.removeItem("editUserID");
    this.apiIn.getInmueble(Number(userID))
    .subscribe(res => {
      this.editForm.patchValue(res);
    });

    return this.apiService.getProjects()
      .subscribe(res => {
      this.data = res;    
    }, err => {
      console.log(err);
     
    });
 
  }

  
  onSubmit(){
    if(this.editForm.get("precio").value.trim().length === 0){
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
      });
    }
  }

}
