import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CaracteristicaModel } from '../shared/caracteristicas.model';
import { CaracteristicaService } from '../shared/caracteristica.service';

@Component({
  selector: 'app-agregar-caracteristica',
  templateUrl: './agregar-caracteristica.component.html',
  styleUrls: ['./agregar-caracteristica.component.css']
})
export class AgregarCaracteristicaComponent implements OnInit {

  caracteristica : CaracteristicaModel;
  addForm: FormGroup;


  constructor( private apiCar: CaracteristicaService,private formBuilder: FormBuilder,
    private router: Router,private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      carNombre: [''],
      carDescripcion:['']
    });

  }

  onSubmit(){
    this.apiCar.addCaracteristica(this.addForm.value)
    .subscribe(data =>{
      this.toastr.success('Caracteristica ha sido creada exitosamente','Caracteristica.Registro');
      this.router.navigate(['listar-contenido']);
    });
  }

}
