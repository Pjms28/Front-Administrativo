import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;         
  hidden: Boolean = true;  
  hideenButton: Boolean= false;         
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
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
       console.log(res);
       this.authService.setUser(res);
       this.router.navigate(['/']);
      }, err => {
        console.log(err);
       
      });
      
    }
    this.formSubmitAttempt = true;            
  }
}