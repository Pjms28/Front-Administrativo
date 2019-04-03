import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisitaService } from '../shared/visita.service';
import { VisitaModel } from '../shared/visita.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar-visita',
  templateUrl: './agregar-visita.component.html',
  styleUrls: ['./agregar-visita.component.css']
})
export class AgregarVisitaComponent implements OnInit {
  addForm : FormGroup ;

  constructor(public ageService: VisitaService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      proyectoID:[''],
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo:[''],
      descripcion:[''],
      solicitudID:['']
      });
  }

  OnSubmit(){
    console.log('entre');
    this.ageService.addVisit(this.addForm.value).subscribe(res =>{
      console.log('entre');
      this.router.navigate(['agendar-visita']);
    });
  }

}
