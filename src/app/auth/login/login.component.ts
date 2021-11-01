import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

//Sweet Alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  formLogin:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      correo: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
  }

  login = () => {

    if(this.formLogin.invalid){return;}

    Swal.fire({

      title: 'Espere Por favor',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
    })

    this.authService.login(this.formLogin.value).then(credenciales => {

      console.log(credenciales);
  
      Swal.close();
      
      this.router.navigateByUrl('/');

    }).catch(err => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        
      })
    })

   
  }

  validarCampos = (campo:string) => {

    if(this.formLogin.get(`${campo}`)?.errors){

      return;
    }else{

      return true;
    }
  }

}
