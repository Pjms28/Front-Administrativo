import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CaracteristicaModel } from '../../modelos/caracteristicas.model';
import { CaracteristicaService } from '../../shared/caracteristica.service';

@Component({
  selector: 'app-agregar-caracteristica',
  templateUrl: './agregar-caracteristica.component.html',
  styleUrls: ['./agregar-caracteristica.component.css']
})
export class AgregarCaracteristicaComponent implements OnInit {

  caracteristica : CaracteristicaModel;
  addForm: FormGroup;
  mensaje: string;

  constructor( private apiCar: CaracteristicaService,private formBuilder: FormBuilder,
    private router: Router,private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      carNombre: ['',[Validators.required]],
      carDescripcion:['',[Validators.required]],
      tipoCarProyecto:['',[Validators.required]]
    });

  }

  onSubmit(){
    if(this.addForm.get("carNombre").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("carDescripcion").value.trim().length == 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      
      this.apiCar.addCaracteristica(this.addForm.value)
      .subscribe(data =>{
        if(data == null){
          this.toastr.error('El nombre de la caracteristica ya ha sido registrado','Caracteristica.Registro');
        }
        else{
          this.toastr.success('Caracteristica ha sido creada exitosamente','Caracteristica.Registro');
          this.router.navigate(['listar-contenido']);
        }
      });
    }
  }

}



