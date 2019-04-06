import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitaService } from 'src/app/shared/visita.service';

@Component({
  selector: 'app-editar-visita',
  templateUrl: './editar-visita.component.html',
  styleUrls: ['./editar-visita.component.css']
})
export class EditarVisitaComponent implements OnInit {
  
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private ageService: VisitaService) { }

  ngOnInit() {
    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['listar-contenido']);
      return;
    }
    window.localStorage.removeItem("solID");

    this.editForm = this.formBuilder.group({
      hora_Inicio:[''],
      hora_Fin:[''],
      motivo: [''],
      descripcion:['']
    });

    this.ageService.getVisit(Number(userID))
    .subscribe(res => {
      this.editForm.patchValue(res);
    });

  }
  
}
