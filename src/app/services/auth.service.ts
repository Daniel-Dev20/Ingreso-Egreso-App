
import { Injectable } from '@angular/core';
import { RegisterForm } from '../models/usuario-register.model';

//AngularFire
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { formLogin } from '../models/usuario-login.model';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth:AngularFireAuth,
    private firestore:AngularFirestore
    ) { }

  initAuthListener = () => {

    this.auth.authState.subscribe(fauser => {

      console.log(fauser);
      console.log(fauser?.uid);
      console.log(fauser?.email);
      const email:any = fauser?.email;
      localStorage.setItem('email', email);
    })
  }

  crearUsuario = (formData:RegisterForm) =>{

    const {correo, password, nombre} = formData;
    //console.log(nombre, correo, password);

   return this.auth.createUserWithEmailAndPassword(correo, password)
              .then( ({user}) => {

                const newUser = new Usuario(user?.uid, nombre, correo);
                
                return this.firestore.doc(`usuarios/${user?.uid}`).set({...newUser});

              })

  }

  login = (formData:formLogin) => {

    const {correo, password} = formData;

    
    return this.auth.signInWithEmailAndPassword(correo, password);

  }

  logout = () => {

    localStorage.removeItem('email')
    return this.auth.signOut();
  }

  isAuth = () => {

    localStorage.getItem('email');
   
  }
}
