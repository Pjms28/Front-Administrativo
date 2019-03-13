import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { InmuebleModel } from '../shared/inmueble.model';
import { InmuebleService } from '../shared/inmueble.service';
import { CaracteristicaModel } from '../shared/caracteristicas.model';
import { CaracteristicaService } from '../shared/caracteristica.service';

@Component({
  selector: 'app-agregar-caracteristica',
  templateUrl: './agregar-caracteristica.component.html',
  styleUrls: ['./agregar-caracteristica.component.css']
})
export class AgregarCaracteristicaComponent implements OnInit {

  data : InmuebleModel[] = [];
  caracteristica : CaracteristicaModel;
  addForm: FormGroup;


  constructor( private apiCar: CaracteristicaService, private apiIn: InmuebleService,private formBuilder: FormBuilder,
    private router: Router,private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      carNombre: [''],
      carDescripcion:['']
    });

    return this.apiIn.getInmuebles()
      .subscribe(res => {
      this.data = res;
    
    }, err => {
      console.log(err);
     
    });
  }

  onSubmit(){
    this.apiCar.addCaracteristica(this.addForm.value)
    .subscribe(data =>{
      this.router.navigate(['listar-contenido']);
    });
  }

}
