import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ForoService } from 'src/app/shared/foro.service';

@Component({
  selector: 'app-categorias-foro',
  templateUrl: './categorias-foro.component.html',
  styleUrls: ['./categorias-foro.component.css']
})
export class CategoriasForoComponent implements OnInit {
  addForm : FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private toastr: ToastrService, public ApiCtg: ForoService) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      nombreTema:['', [Validators.required]],
      descripcionTema:['', [Validators.required]]
    });

  }

  onSubmit(){

    if(this.addForm.get("nombreTema").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("descripcionTema").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.ApiCtg.addCategoria(this.addForm.value).subscribe(res =>{
        if(res == null){
          this.toastr.success('El nombre de la categoria ya ha sido registrado','Categoria.Registro');
        }
        else{
          this.toastr.success('La categoria ha sido creada exitosamente','Categoria.Registro');
          this.router.navigate(['temas-foros']);
        }
      });
    }
  }

}
