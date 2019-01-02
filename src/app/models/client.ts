export class Client {
    
    constructor( public idUser?:number,
        public email?:string,
       public  password?: string,
       public address?: string,
       public phoneNumber?:string,
       public clientName?:string
       ) { 
    }
}
