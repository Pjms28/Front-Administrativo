import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ForoService } from 'src/app/shared/foro.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  editForm : FormGroup;
  ID: any;
  constructor(private formBuilder: FormBuilder,private router: Router, private toastr: ToastrService, public ApiCtg: ForoService,private actvRoute: ActivatedRoute) { }

  ngOnInit() {    
    this.editForm = this.formBuilder.group({
      temaID:[''],
      nombreTema:['', [Validators.required]],
      descripcionTema:['', [Validators.required]]
    });
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    console.log(this.ID)
    this.ApiCtg.getTema(this.ID).subscribe(res => {
      this.editForm.patchValue(res);
    })
  }

  onSubmit(){

    if(this.editForm.get("nombreTema").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("descripcionTema").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.ApiCtg.updateCategoria(this.editForm.value).subscribe(res =>{
      this.toastr.success('La categoria ha sido creada exitosamente','Categoria.Registro');
      this.router.navigate(['temas-foros']);
      });
    }
  }

}
