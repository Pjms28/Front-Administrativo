import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/blog.service';
import { ToastrService } from 'ngx-toastr';
import { BlogModel } from 'src/app/modelos/Blog.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-editar-post',
  templateUrl: './editar-post.component.html',
  styleUrls: ['./editar-post.component.css']
})
export class EditarPostComponent implements OnInit {
 ID: any;
 data: BlogModel;
 editForm: FormGroup;
 fileTo: any;
  constructor(private actvRoute: ActivatedRoute, private blogApi: BlogService, private toastr: ToastrService, private formBuilder: FormBuilder, private autApi: AuthService) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      blogID:[""],
      tituloEntrada:['',[Validators.required]],
      textoEntrada:['',[Validators.required]],
      imgURL:['',[Validators.required]],
      usuarioID:[''],
      timeStampBlog:['']
    });


    this.ID = this.actvRoute.snapshot.paramMap.get(' id');
    this.blogApi.getBlog(this.ID).subscribe(res =>{
      if(res == null){
        this.toastr.error("Accion invalida", "Error");
      }
      else {
        this.data = res;
        this.editForm.controls['blogID'].setValue(res.blogID);
        this.editForm.controls['tituloEntrada'].setValue(res.tituloEntrada);
        this.editForm.controls['textoEntrada'].setValue(res.textoEntrada);
        this.editForm.controls['usuarioID'].setValue(res.usuarioID);
        this.editForm.controls['timeStampBlog'].setValue(res.timeStampBlog);
      }
    })

  }

  onSubmit(){

    if(this.editForm.get("tituloEntrada").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.editForm.get("textoEntrada").value.length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.blogApi.updatePost(this.editForm.value)
      .subscribe(data =>{
       this.toastr.info('El post ha sido actualizado','Post.Info');
        let formData = new FormData(); 
        formData.append(this.fileTo.name, this.fileTo);
        formData.append('fileName',this.fileTo.name);
        this.blogApi.sendFormData(formData);
        this.autApi.change();
        window.location.href = "http://localhost:4200/blog";
      });
    }
  }

  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }


}
