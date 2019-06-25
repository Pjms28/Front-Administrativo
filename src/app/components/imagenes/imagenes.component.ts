import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/shared/upload.service';
import { ImagenesMultiples } from 'src/app/modelos/imagenesMultiple.model';
import { ImagenesModel } from 'src/app/modelos/imagenes.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {

  addForm: FormGroup;
  fileTo: any;
  ID:any;
  value: string ="";
  url: string[];
  tipo="";
  file: any;
  imagenesMultiples: ImagenesMultiples = new ImagenesMultiples();
  

  constructor(private actvRoute: ActivatedRoute, private updApi: UploadService, private toastr: ToastrService) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
  }

  saveFileRequest(files : FileList){
    this.fileTo = files;
  }

  Select(event:any){
    this.value = event.target.value;
  }

  onSubmit(){
    this.imagenesMultiples.imagenes = [];
    this.imagenesMultiples.proyectoID = this.ID;
    for (let i = 0; i < this.fileTo.length; i++){
       
      let obj: ImagenesModel = ({
        url: this.fileTo[i].name,
        tipo: this.value,
        descripcion: "Imagenes del proyecto" + this.ID
      }); 
      this.imagenesMultiples.imagenes.push(obj);
      
      let formData = new FormData(); 
      formData.append(this.fileTo[i].name, this.fileTo[i]);
      formData.append('fileName',this.fileTo[i].name);
      
      this.updApi.sendFormData(formData);
      
    }
      this.updApi.addImage(this.imagenesMultiples).subscribe();
      this.tipo = "";
      this.file = "";
      this.toastr.success('Imagenes han sido agregadas al proyecto exitosamente');
  }

}
