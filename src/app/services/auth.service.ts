
import { Injectable } from '@angular/core';
import { RegisterForm } from '../models/usuario-register.model';

//AngularFire
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { formLogin } from '../models/usuario-login.model';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unsetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth:AngularFireAuth,
    private firestore:AngularFirestore,
    private store:Store<AppState>
    ) { }

  initAuthListener = () => {

    this.auth.authState.subscribe(fauser => {

      if(fauser){

        //si existe
        this.firestore.doc(`usuarios/${fauser.uid}`).valueChanges().subscribe((fireUser:any) => {

            console.log(fireUser);
              // const {uid, nombre, email} = fireUser;
            // const user = Usuario.fromFirebase(uid, nombre, email)

            // const tempUser = new Usuario('2212', 'DANIEL', 'daniel@gmail.com');

            // this.store.dispatch(setUser({user}));

            
        })

      }else{

        //no existe
        console.log('llamar unset');

        this.store.dispatch(unsetUser());
        
      }
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
