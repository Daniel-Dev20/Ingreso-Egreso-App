import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//Sweet Alert
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy{

  formRegister:FormGroup;

  formSubmitted:boolean = false;

  uiSubscription:Subscription;

  cargando:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private store:Store<AppState>,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.formRegister = this.formBuilder.group({
      nombre: ["", Validators.required],
      correo:["", [Validators.email, Validators.required]],
      password:["", [Validators.required,Validators.minLength(4)]]
    })


    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)


  }

  ngOnDestroy(){

    this.uiSubscription.unsubscribe();
  }

  crearUsuario = () => {

    if(this.formRegister.invalid){return;}

    this.store.dispatch(ui.isLoading())
    
    // Swal.fire({

    //   title: 'Espere Por favor',
    //   html: 'I will close in <b></b> milliseconds.',
    //   timer: 2000,
    //   timerProgressBar: true,
    // })

    this.authService.crearUsuario(this.formRegister.value).then(credenciales => {

      console.log(credenciales);

      // Swal.close();

      this.store.dispatch(ui.stopLoading());

      this.router.navigateByUrl('/')
      
    }).catch( err => {

      this.store.dispatch(ui.stopLoading());

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
