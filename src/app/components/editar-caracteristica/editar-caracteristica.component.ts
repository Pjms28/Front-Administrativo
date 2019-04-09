import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {first} from "rxjs/operators";
import { InmuebleModel } from '../../modelos/inmueble.model';
import { InmuebleService } from '../../shared/inmueble.service';
import { CaracteristicaModel } from '../../modelos/caracteristicas.model';
import { CaracteristicaService } from '../../shared/caracteristica.service';

@Component({
  selector: 'app-editar-caracteristica',
  templateUrl: './editar-caracteristica.component.html',
  styleUrls: ['./editar-caracteristica.component.css']
})
export class EditarCaracteristicaComponent implements OnInit {
  data : InmuebleModel[] = [];
  caracteristica : CaracteristicaModel;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiIn: InmuebleService, private apiCar:CaracteristicaService ,private router: Router
    ,private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['listar-contenido']);
      return;
    }
    this.editForm = this.formBuilder.group({
      caracteristicaID:['', [Validators.required]],
      carNombre: ['', [Validators.required]],
      carDescripcion:['', [Validators.required]]
    });

    this.apiCar.getCaracteristica(Number(userID))
    .subscribe(res => {
      this.editForm.patchValue(res);
    });

    return this.apiIn.getInmuebles()
      .subscribe(res => {
      this.data = res;
    }, err => {
      console.log(err);
     
    });
  }

  onSubmit(){
    if(this.editForm.get("carNombre").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("carDescripcion").value.trim().length == 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.apiCar.updateCaracteristica(this.editForm.value)
      .pipe(first())
      .subscribe(data =>{
        this.toastr.info('Caracteristica ha sido editada','Caracteristica.Info');
        this.router.navigate(['listar-contenido']);
      });
    }
  }

}
