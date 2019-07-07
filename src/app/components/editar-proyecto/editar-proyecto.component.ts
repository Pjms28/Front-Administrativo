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
  fileTo2: any;
  imgNombre: string;
  pdf: string;
  latitude: number;
  longitude: number;
 
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, 
    private toastr: ToastrService,  public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      proyectoID:['',[Validators.required]],
      nombreProyecto:['',[Validators.required]],
      fechaTerminacion:['',[Validators.required]],
      direccion: ['',[Validators.required]],
      imgURL:[''],
      documentoResumenPdf:['']
    });

    let userID = this.actRoute.snapshot.paramMap.get(' id')
    if(!userID){
      this.router.navigate(['proyectos']);
      this.toastr.error("Accion invalida");
      return;
    }
    
    this.apiService.getProject(Number(userID))
    .subscribe(res => {

      this.editForm.controls['proyectoID'].setValue(res.proyectoID);
      this.editForm.controls['nombreProyecto'].setValue(res.nombreProyecto);
      this.editForm.controls['fechaTerminacion'].setValue(res.fechaTerminacion);
      this.editForm.controls['direccion'].setValue(res.direccion);
      this.imgNombre = res.imgURL;
      this.pdf = res.documentoResumenPdf;
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      
      if(this.latitude != undefined || this.latitude != null)
      {
        localStorage.setItem('latitude', this.latitude.toString());
        localStorage.setItem('longitude', this.longitude.toString());
        
      } 
    },
    err=>{
      this.toastr.error("Ha ocurrido un error:" + err);
      this.router.navigate['proyectos']
    }
    
    );
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
      if(this.editForm.get("imgURL").value == "" || this.editForm.get("documentoResumenPdf").value == ""){
        this.proyecto.proyectoID = this.editForm.get("proyectoID").value;
        this.proyecto.direccion = this.editForm.get("direccion").value;
        this.proyecto.nombreProyecto = this.editForm.get("nombreProyecto").value;
        this.proyecto.fechaTerminacion = this.editForm.get("fechaTerminacion").value;
        this.proyecto.imgURL = this.imgNombre;
        this.proyecto.latitude = this.latitude;
        this.proyecto.longitude = this.longitude;
        this.apiService.updateProject(this.proyecto).subscribe(res =>{
          this.toastr.info('Proyecto ha sido editado','Proyecto.Info');
          this.router.navigate(['proyectos']);
        })
      }
      else{
        this.apiService.updateProject(this.editForm.value)
        .pipe(first())
        .subscribe(data =>{
          this.toastr.info('Proyecto ha sido editado','Proyecto.Info');
          this.router.navigate(['proyectos']);

          //IMG
          let formData = new FormData(); 
          formData.append(this.fileTo.name, this.fileTo);
          formData.append('fileName',this.fileTo.name);
          this.apiService.sendFormData(formData);


          //PDF
          let formData2 = new FormData();
          formData2.append(this.fileTo2.name, this.fileTo2);
          formData2.append('fileName',this.fileTo2.name);
          this.apiService.sendPDFData(formData2);
        }); 
      }
    }
  }
  onChangeLatLong(event){
    console.log('event :', event);
    this.latitude = event.latitude;
    this.longitude = event.longitude;
    if(this.latitude != undefined || this.latitude != null)
    {
      localStorage.setItem('latitude', this.latitude.toString());
      localStorage.setItem('longitude', this.longitude.toString());
      
    } 
  }

  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

  savePDFRequest(files : FileList){
    this.fileTo2 = files.item(0);
  }
}