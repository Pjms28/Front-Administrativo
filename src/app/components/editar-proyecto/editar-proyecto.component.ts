import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { UbicacionService } from '../../shared/ubicacion.service';
import {Router, ActivatedRoute} from "@angular/router";
import { UbicacionModel } from '../../modelos/Ubicacion.model';
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
  fileTo: any;
  img: any;

 
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private ubicacionService: UbicacionService
    , private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['listar-contenido']);
      return;
    }
    window.localStorage.removeItem("editUserID");

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
      this.editForm.patchValue(res);
      
    });
    
    return this.ubicacionService.getLocantions()
      .subscribe(res => {
      this.data = res;
    }, err => {
      console.log(err);
     
    });

    

  }  
  
  onSubmit(){
    console.log(this.editForm.value);
    this.apiService.updateProject(this.editForm.value)
    .pipe(first())
    .subscribe(data =>{
      this.toastr.info('Proyecto ha sido editado','Proyecto.Info');
      this.router.navigate(['listar-contenido']);
      let formData = new FormData(); 
      formData.append(this.fileTo.name, this.fileTo);
      formData.append('fileName',this.fileTo.name);
      this.apiService.sendFormData(formData);
    });
  }


  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

}