import { UserBaseInterface } from '../../interface';

/**
 * interface des services des services de Base d'un utilisateur
 */
export interface UserBaseServiceInterface{

    findUserById(id:number):Promise<UserBaseInterface | null>;
    findUserByName(userName?:string , mail?:string):Promise<UserBaseInterface | null>;
    findAllUsers(limit?:number,search?:string):Promise<{rows:UserBaseInterface[];count:number;}>;
    findAllUsersSuspend(limit?:number,search?:string):Promise<{rows:UserBaseInterface[];count:number;}>;
}