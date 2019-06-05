import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from '../../shared/servicio.service';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent implements OnInit {

  addForm : FormGroup ;
  fileTo: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private apiSer: ServicioService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nombreServicio:['', [Validators.required]],
      descripcionServicio:['', [Validators.required]],  
      imgURL:['', [Validators.required]]   
    });
  }

  onSubmit() {

    if(this.addForm.get("nombreServicio").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("descripcionServicio").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.apiSer.addService(this.addForm.value).subscribe(res =>{
        if(res == null){
          this.toastr.success('El nombre del servicio ya ha sido registrado','Servicio.Registro');
        }
        else{
          this.toastr.success('Servicio ha sido creado exitosamente','Servicio.Registro');
          this.router.navigate(['servicios']);
          let formData = new FormData(); 
          formData.append(this.fileTo.name, this.fileTo);
          formData.append('fileName',this.fileTo.name);
          this.apiSer.sendFormData(formData);   
        }
      });
    }
  }
  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }
  
}
