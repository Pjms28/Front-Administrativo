import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ImagenProyecto } from 'imagen-proyecto.model';
import { Proyecto } from 'src/app/modelos/proyecto.model';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  addForm : FormGroup;
  fileTo: any;
  latitude: number = 20;
  longitude: number = 20;
  @Input() latlong:any;
  proyecto: Proyecto
  proyectImages: any[] = [];
  proyectImagesData: any[] = [];
  proyectPlanosPictures: any = [];
  

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nombreProyecto:['', [Validators.required]],
      fechaTerminacion:['', [Validators.required]],
      direccion:['',[Validators.required]],
      imgURL:['',[Validators.required]],
      latitude:[''],
      longitude:[''],

    });

  }

  onChangeLatLong(event){
    this.latitude = event.latitude;
    this.longitude = event.longitude;
  }




  onSubmit() {
    if(this.addForm.get("nombreProyecto").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("fechaTerminacion").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("direccion").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.addForm.controls["latitude"].setValue(this.latitude);
      this.addForm.controls["longitude"].setValue(this.longitude);
  

      this.buildProyect(this.addForm.value);
      this.proyecto.Imagenes = this.proyectImagesData;
      /* this.addForm.controls['Imagenes'].setValue("asdasdasd"); */
      console.log('this.addForm.value :', this.addForm.value);

      this.apiService.addProject(this.proyecto).subscribe(res =>{
        if (res == null){
          this.toastr.error('Existe un proyecto con ese nombre','Proyecto.Registro');
        }
        else{
          console.log('res :', res);
          this.toastr.success('Proyecto ha sido creado exitosamente','Proyecto.Registro');
          this.router.navigate(['proyectos']);
          let formData = new FormData(); 
         
          formData.append(this.fileTo.name, this.fileTo);
          formData.append('fileName',this.fileTo.name);
          this.apiService.sendFormData(formData);

          this.uploadFiles();
        }
      });
    }
  }
  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

  uploadFiles(){
   for(const file of this.proyectImages){
    let imagenProyecto = {
      'Url' : file.name,
      'Descripcion' : 'Imagen para proyecto',
      'Tipo' : 'imagen-proyecto'
    }

    this.proyectImagesData.push(imagenProyecto);
    let fd = new FormData(); 
         
    fd.append(file.name, file);
    fd.append('fileName',this.fileTo.name);
    this.apiService.sendFormData(fd);
   }

  }
  onFileProyectsSelect(files){
   /*  console.log('files :',files); */

   for (const file of files){
    let currentFile = <File>file;
    this.proyectImages.push(currentFile);
   }

    console.log('this.proyectImages :', this.proyectImages);
  }

  buildProyect(form){
    this.proyecto = new Proyecto;
    this.proyecto.Direccion = form.direccion;
    this.proyecto.ImgUrl = form.imgURL;
    this.proyecto.FechaTerminacion = form.fechaTerminacion;
    this.proyecto.Latitude = form.latitude;
    this.proyecto.Longitude = form.longitude;
    this.proyecto.NombreProyecto = form.nombreProyecto;

    return this.proyecto;
  }
  onChooseLocation(cords){
  this.latitude = cords.latitude;
  this.longitude = cords.longitude;
  

  }
  
  }

