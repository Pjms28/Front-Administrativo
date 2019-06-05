import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from 'src/app/shared/servicio.service';
import {first} from "rxjs/operators";
import { ServicioModel } from 'src/app/modelos/servicio.model';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  editForm: FormGroup;
  fileTo: any;
  img: any;
  imgNombre: string;
  servicio: ServicioModel = new ServicioModel();

  constructor(private formBuilder: FormBuilder, private apiSer: ServicioService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      servicioID:['', [Validators.required]],
      nombreServicio:['', [Validators.required]],
      descripcionServicio:['', [Validators.required]],
      imgURL:['']
    });

    let userID = window.localStorage.getItem("editUserID");
    if(!userID){
      alert("Accion Invalida")
      this.router.navigate(['servicios']);
      return;
    }
    window.localStorage.removeItem("editUserID");

    this.apiSer.getService(Number(userID))
    .subscribe(res => {
      this.editForm.controls['servicioID'].setValue(res.servicioID);
      this.editForm.controls['nombreServicio'].setValue(res.nombreServicio);
      this.editForm.controls['descripcionServicio'].setValue(res.descripcionServicio);
      this.imgNombre = res.imgURL;
    });

  }

  onSubmit(){

     if(this.editForm.get("nombreServicio").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("descripcionServicio").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      if(this.editForm.get("imgURL").value == ""){
        this.servicio.servicioID = this.editForm.get("servicioID").value;
        this.servicio.nombreServicio = this.editForm.get("nombreServicio").value;
        this.servicio.descripcionServicio = this.editForm.get("descripcionServicio").value;
        this.servicio.imgURL = this.imgNombre;
        this.apiSer.updateService(this.servicio).subscribe(res =>{
          this.toastr.info('Servicio ha sido editado','Servicio.Info');
          this.router.navigate(['listar-contenido']);
        })
      }
      this.apiSer.updateService(this.editForm.value)
      .pipe(first())
      .subscribe(data =>{
        this.toastr.info('Servicio ha sido editado','Servicio.Info');
        this.router.navigate(['servicios']);
        let formData = new FormData(); 
        formData.append(this.fileTo.name, this.fileTo);
        formData.append('fileName',this.fileTo.name);
        this.apiSer.sendFormData(formData);
      });
    }
  }


  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }


}
