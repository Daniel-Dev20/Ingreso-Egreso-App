import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

//Sweet Alert
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  
  formLogin:FormGroup;

  cargando:boolean = false;

  uiSubscription:Subscription;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private store:Store<AppState>,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      correo: ["test1@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required, Validators.minLength(4)]]
    });

   this.uiSubscription =  this.store.select('ui').subscribe( ui => {
    
    this.cargando = ui.isLoading
    console.log('subs');
    
    
    })
  }

  ngOnDestroy(){

    this.uiSubscription.unsubscribe();
  }

  login = () => {

    if(this.formLogin.invalid){return;}

    this.store.dispatch(ui.isLoading());

    // Swal.fire({

    //   title: 'Espere Por favor',
    //   html: 'I will close in <b></b> milliseconds.',
    //   timer: 2000,
    //   timerProgressBar: true,
    // })

    this.authService.login(this.formLogin.value).then(credenciales => {

      console.log(credenciales);
  
      // Swal.close();

      this.store.dispatch(ui.stopLoading());
      
      this.router.navigateByUrl('/');

    }).catch(err => {

      this.store.dispatch(ui.stopLoading());

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
