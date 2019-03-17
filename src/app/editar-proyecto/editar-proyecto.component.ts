import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UbicacionService } from '../shared/ubicacion.service';
import {Router, ActivatedRoute} from "@angular/router";
import { UbicacionModel } from '../shared/Ubicacion.model';
import { ToastrService } from 'ngx-toastr';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  
  data : UbicacionModel[] = [];
  inmueble : ProyectoComponent;
  editForm: FormGroup;

 
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private ubicacionService: UbicacionService
    , private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['listar-contenido']);
      return;
    }

    this.editForm = this.formBuilder.group({
      proyectoID:[''],
      nombreProyecto:[''],
      fechaTerminacion:[''],
      ubicacionID: [''],
      imgURL:[''],
      direccion: ['']
    });
    
    this.apiService.getProject(Number(userID))
    .subscribe(res => {
      console.log(res)
      this.editForm.patchValue(res);
    });
    
    return this.ubicacionService.getLocantions()
      .subscribe(res => {
      this.data = res;
      console.log(this.data);
    
    }, err => {
      console.log(err);
     
    });

    

  }  
  
  onSubmit(){
<<<<<<< HEAD
    console.log(this.editForm.value);
    return;
    
=======
>>>>>>> e7cb0df43c53c4395db77d8d28f93eab5e4519e0
    this.apiService.updateProject(this.editForm.value)
    .pipe(first())
    .subscribe(data =>{
      this.toastr.info('Proyecto ha sido editado','Proyecto.Info');
      this.router.navigate(['listar-contenido']);
    });
  }


 

}