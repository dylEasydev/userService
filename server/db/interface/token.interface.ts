export interface Token{
    userId:number;
    userName:string;

    //ensembles des permissions d'un token  
    scope?:string|string[];
    
    //identifiant du client demandant le token
    clientId:number;
}
