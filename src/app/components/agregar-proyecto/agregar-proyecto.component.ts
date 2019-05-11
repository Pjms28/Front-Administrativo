import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { UbicacionService } from '../../shared/ubicacion.service';
import {Router} from "@angular/router";
import { UbicacionModel } from '../../modelos/Ubicacion.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  data: UbicacionModel[] =[];
  addForm : FormGroup ;
  fileTo: any;
  lat: number;
  lng: number;
  @Input() latlong:any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private ubicacionService: UbicacionService
    , private toastr: ToastrService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nombreProyecto:['', [Validators.required]],
      fechaTerminacion:['', [Validators.required]],
      direccion:['',[Validators.required]],
      imgURL:['',[Validators.required]]
    });

    return this.ubicacionService.getLocantions()
      .subscribe(res => {
      this.data = res;
    }, err => {
      console.log(err); 
    });

  }

  onNotify(latlong:any):void {
    console.log('***** :', latlong);
    this.lat = latlong.latitude;
    this.lng = latlong.longitude;

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
      this.apiService.addProject(this.addForm.value).subscribe(res =>{
        if (res == null){
          this.toastr.error('Existe un proyecto con ese nombre','Proyecto.Registro');
        }
        else{
          this.toastr.success('Proyecto ha sido creado exitosamente','Proyecto.Registro');
          this.router.navigate(['listar-contenido']);
          let formData = new FormData(); 
          formData.append(this.fileTo.name, this.fileTo);
          formData.append('fileName',this.fileTo.name);
          this.apiService.sendFormData(formData);
        }
      });
    }
  }
  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

  onChooseLocation(cords){
   this.lat = cords.latitude;
   this.lng = cords.longitude;
  
   
  }
  
  }

