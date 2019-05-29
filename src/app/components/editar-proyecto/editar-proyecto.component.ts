import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  
  proyecto : ProyectoComponent = new ProyectoComponent();
  editForm: FormGroup;
  fileTo: any;
  imgNombre: string;
  lat: number = 18.4855;
  lng: number = -69.8731;
 
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, 
    private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      proyectoID:['',[Validators.required]],
      nombreProyecto:['',[Validators.required]],
      fechaTerminacion:['',[Validators.required]],
      direccion: ['',[Validators.required]],
      imgURL:['']
    });

    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      this.router.navigate(['listar-contenido']);
      alert("Acción Invalida")
      return;
    }
    window.localStorage.removeItem("editUserID");
    
    this.apiService.getProject(Number(userID))
    .subscribe(res => {
      this.editForm.controls['proyectoID'].setValue(res.proyectoID);
      this.editForm.controls['nombreProyecto'].setValue(res.nombreProyecto);
      this.editForm.controls['fechaTerminacion'].setValue(res.fechaTerminacion);
      this.editForm.controls['direccion'].setValue(res.direccion);
      this.imgNombre = res.imgURL;
    });
  }  
  onChooseLocation(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
   
    
   }

  onSubmit(){

    if(this.editForm.get("nombreProyecto").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("fechaTerminacion").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("direccion").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      if(this.editForm.get("imgURL").value == ""){
        this.proyecto.proyectoID = this.editForm.get("proyectoID").value;
        this.proyecto.direccion = this.editForm.get("direccion").value;
        this.proyecto.nombreProyecto = this.editForm.get("nombreProyecto").value;
        this.proyecto.fechaTerminacion = this.editForm.get("fechaTerminacion").value;
        this.proyecto.imgURL = this.imgNombre;
        this.apiService.updateProject(this.proyecto).subscribe(res =>{
          this.toastr.info('Proyecto ha sido editado','Proyecto.Info');
          this.router.navigate(['listar-contenido']);
        })
      }
      else{
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
    }
  }


  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

}