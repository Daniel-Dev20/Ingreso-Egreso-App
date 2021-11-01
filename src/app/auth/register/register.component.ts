import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//Sweet Alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  formRegister:FormGroup;
  formSubmitted:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.formRegister = this.formBuilder.group({
      nombre: ["", Validators.required],
      correo:["", [Validators.email, Validators.required]],
      password:["", [Validators.required,Validators.minLength(4)]]
    })
  }

  crearUsuario = () => {

    if(this.formRegister.invalid){return;}

    
    Swal.fire({

      title: 'Espere Por favor',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
    })

    this.authService.crearUsuario(this.formRegister.value).then(credenciales => {

      console.log(credenciales);

      Swal.close();

      this.router.navigateByUrl('/')
      
    }).catch( err => {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        
      })
    })
 
  }

  validarCampos = (campo:string) => {

    if( this.formRegister.get(`${campo}`)?.errors){

      return;

    } else{

      return true;
    }
  }

}
