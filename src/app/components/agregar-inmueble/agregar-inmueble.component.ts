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
import { CaracteristicaInmuebleModel } from 'src/app/modelos/caracteristicainmueble.model';

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
  caracteristicainmueble: CaracteristicaInmuebleModel = new CaracteristicaInmuebleModel();
  
  constructor(private formBuilder: FormBuilder, private apiIn: InmuebleService, private apiService: ApiService, private router: Router
    ,private toastr: ToastrService,  public actRoute: ActivatedRoute, private apiCar: CaracteristicaService) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      precio: ['',[Validators.required]],
      nombreInmueble:['', [Validators.required]],
      descripcionInmueble:['', [Validators.required]],
      proyectoID: ['', [Validators.required]]
    });

    

    this.apiService.getProjects()
      .subscribe(res => {
      this.data = res;
    
    }, err => {
      console.log(err);
     
    });

    this.apiCar.getCaracteristicas()
    .subscribe(res =>{
      res.forEach(element => {
        var obj: Object ={
          caracteristicaID: element.caracteristicaID,
          carNombre: element.carNombre,
          selected: false
        }

        this.checkbox.push(obj);
      });
   
      
    })
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
          var array = this.getSelected();
          if(array.length != 0){
            array.forEach(element => {
              this.caracteristicainmueble.caracteristicaID = element;
              this.caracteristicainmueble.inmuebleID = data.inmuebleID;
              this.apiCar.addCaracteristicaInmueble(this.caracteristicainmueble).subscribe(res => {
              this.router.navigate(['listar-contenido']);
              })
          });
        }
        }
      });
    }
  }

  public getSelected() {
    let result = this.checkbox.filter((c) => { return c.selected })
                     .map((c) => { return c.caracteristicaID });
    return result;
}


}
