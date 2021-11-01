export class Usuario{

    // static fromFirebase(uid:any, nombre:any, email:any){


    //     return new Usuario(uid, nombre, email);
    // }
    constructor(

        public uid:any,
        public nombre:any,
        public email:string
    ){}
}