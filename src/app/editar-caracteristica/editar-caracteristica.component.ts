import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {first} from "rxjs/operators";
import { InmuebleModel } from '../shared/inmueble.model';
import { InmuebleService } from '../shared/inmueble.service';
import { CaracteristicaModel } from '../shared/caracteristicas.model';
import { CaracteristicaService } from '../shared/caracteristica.service';

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
      caracteristicaID:[''],
      carNombre: [''],
      carDescripcion:['']
    });

    this.apiCar.getCaracteristica(Number(userID))
    .subscribe(res => {
      this.editForm.patchValue(res);
    });

    return this.apiIn.getInmuebles()
      .subscribe(res => {
      this.data = res;
      console.log(this.data);
    
    }, err => {
      console.log(err);
     
    });
  }

  onSubmit(){
    console.log(this.editForm.value);
    this.apiCar.updateCaracteristica(this.editForm.value)
    .pipe(first())
    .subscribe(data =>{
      this.router.navigate(['listar-contenido']);
    });
  }

}
