import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { InmuebleModel } from '../shared/inmueble.model';
import { InmuebleService } from '../shared/inmueble.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-agregar-inmueble',
  templateUrl: './agregar-inmueble.component.html',
  styleUrls: ['./agregar-inmueble.component.css']
})
export class AgregarInmuebleComponent implements OnInit {

  data : ProyectoComponent[] = [];
  inmueble : InmuebleModel;
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiIn: InmuebleService, private apiService: ApiService, private router: Router
    ,private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      precio: [''],
      nombreInmueble:[''],
      descripcionInmueble:[''],
      proyectoID: ['']
    });

    return this.apiService.getProjects()
      .subscribe(res => {
      this.data = res;
      console.log(this.data);
    
    }, err => {
      console.log(err);
     
    });
 
  }

   
  onSubmit(){
    this.apiIn.addInmueble(this.addForm.value)
    .subscribe(data =>{
      this.toastr.success('Inmueble ha sido creado exitosamente','Inmueble.Registro');
      this.router.navigate(['listar-contenido']);
    });
  }

  
}
