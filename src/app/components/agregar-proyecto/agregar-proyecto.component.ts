import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  addForm : FormGroup;
  fileTo: any;
  fileTo2: any;
  latitude: number = 20;
  longitude: number = 20;
  @Input() latlong:any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nombreProyecto:['', [Validators.required]],
      fechaTerminacion:['', [Validators.required]],
      direccion:['',[Validators.required]],
      imgURL:['',[Validators.required]],
      latitude:[''],
      longitude:[''],
      documentoResumenPdf:['']
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

      this.apiService.addProject(this.addForm.value).subscribe(res =>{
        if (res == null){
          this.toastr.error('Existe un proyecto con ese nombre','Proyecto.Registro');
        }
        else{
          this.toastr.success('Proyecto ha sido creado exitosamente','Proyecto.Registro');
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
        }
      });
    }
  }
  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

  savePDFRequest(files : FileList){
    this.fileTo2 = files.item(0);
  }

  onChooseLocation(cords){
  this.latitude = cords.latitude;
  this.longitude = cords.longitude;
  

  }
  
  }

