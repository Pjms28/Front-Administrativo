import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;         
  hidden: Boolean = true;  
  hideenButton: Boolean= false;  
  logginFail: Boolean = true;
  failMessage: string ='Usuario o contraseña incorrectos.';       
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if(this.authService.getCurrentUser()){
      this.router.navigate(['/']);
    }
    this.form = this.fb.group({    
    email: ['', Validators.required],
    password: ['', Validators.required]
    });
    
   
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {

    if (this.form.valid) {
      this.hidden = false;
      this.hideenButton = true;
      this.authService.login(this.form.value).subscribe(res => {
       if(res['status'] == 'error')
       {
         //console.log(res['message']);
         let message = res['message'];
        this.toastr.error(message,'Datos incorrectos');
          this.hidden = true;
          this.hideenButton = false;
       }
       else
       {
        
        let message = res['message'];
        //console.log('message :', message);
        this.authService.setUser(res);
        this.router.navigate(['/']);
        this.toastr.success('Sesión iniciada con éxito');
       }
      
      }, err => {
        //console.log('error en login:',err);
       
      });
      
    }
    this.formSubmitAttempt = true;            
  }
}