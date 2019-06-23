import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/shared/blog.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-post',
  templateUrl: './agregar-post.component.html',
  styleUrls: ['./agregar-post.component.css']
})
export class AgregarPostComponent implements OnInit {

  agregar: any;
  addForm: FormGroup;
  fileTo: any
  user: UsuarioModel;

  constructor(private FormBuilder: FormBuilder, private toastr: ToastrService, private apiBlog: BlogService, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.addForm = this.FormBuilder.group({
      tituloEntrada:['', [Validators.required]],
      textoEntrada:['',[Validators.required]],
      imgURL:['',[Validators.required]],
      usuarioID: this.user.usuarioID,
      timeStampBlog: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en')
    });
  }

  saveFileRequest(files : FileList){
    this.fileTo = files.item(0);
  }

  onSubmit(){
    if(this.addForm.get("tituloEntrada").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else if(this.addForm.get("textoEntrada").value.trim().length === 0){
      this.toastr.warning('Campo vacio','Registro.Fallido');
    }
    else{
      this.apiBlog.addPost(this.addForm.value).subscribe(res=> {
        let formData = new FormData(); 
        formData.append(this.fileTo.name, this.fileTo);
        formData.append('fileName',this.fileTo.name);
        this.apiBlog.sendFormData(formData);
        window.location.href = 'http://localhost:4200/blog';
      })
    }
  }

}
