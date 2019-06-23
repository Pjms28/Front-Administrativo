import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/shared/upload.service';

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
  tipo: string = ""
  url: string[];

  constructor(private FormBuilder: FormBuilder, private actvRoute: ActivatedRoute, private updApi: UploadService) { }

  ngOnInit() {
    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    this.addForm = this.FormBuilder.group({
      url:[''],
      descripcion:[''],
      tipo:[''],
      proyectoid:this.ID
    })
  }

  saveFileRequest(files : FileList){
    this.fileTo = files;
  }

  Select(event:any){
    this.value = event.target.value;
  }

  onSubmit(){
   this.fileTo.forEach(element => {
    this.addForm.controls['url'].setValue(element.name);
    this.addForm.contains['tipo'].setValue(this.tipo);
    let formData = new FormData(); 
    formData.append(this.fileTo.name, this.fileTo);
    formData.append('fileName',this.fileTo.name);
    this.updApi.addImage(this.addForm.value).subscribe();
    this.updApi.sendFormData(formData);
   });
  }

}
