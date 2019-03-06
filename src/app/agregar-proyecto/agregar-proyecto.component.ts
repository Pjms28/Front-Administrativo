import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router,) { }

  addForm: FormGroup;

    ProyectoID: number;
    NombreProyecto: string;
    FechaTerminacion: Date;
    Direccion: string;
    ImgURL: string;
    UbicacionID: number;
    Ciuda: string;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      ProyectoID: [],
      NombreProyecto: ['', Validators.required],
      FechaTerminacion: ['', Validators.required],
      Direccion: ['', Validators.required],
      ImgURL: ['', Validators.required],
      UbicacionID: ['', Validators.required],
      Ciudad: ['', Validators.required]
    });

  }

  onSubmit(form:NgForm){
    this.apiService.addProject(form)
    .subscribe(data => {
      this.router.navigate(['/listar-contenido']);
    })
  }

}
