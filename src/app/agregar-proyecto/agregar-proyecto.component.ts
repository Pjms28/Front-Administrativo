import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UbicacionService } from '../shared/ubicacion.service';
import {Router,ActivatedRoute} from "@angular/router";
import { UbicacionModel } from '../shared/Ubicacion.model';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  data: UbicacionModel[] =[];
  addForm : FormGroup ;
  fileTo: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private ubicacionService: UbicacionService
    , private toastr: ToastrService,public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nombreProyecto:[''],
      fechaTerminacion:[''],
      direccion:[''],
      imgURL:[''],
      ubicacionID: ['']
    });

    return this.ubicacionService.getLocantions()
      .subscribe(res => {
      this.data = res;
    }, err => {
      console.log(err);
     
    });


  }
  onSubmit() {

    this.apiService.addProject(this.addForm.value).subscribe(res =>{
      this.toastr.success('Proyecto ha sido creado exitosamente','Proyecto.Registro');
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

