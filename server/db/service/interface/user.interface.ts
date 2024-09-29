import { UserBaseServiceInterface } from './userBase.interface';
import { UserBaseInterface } from '../../interface';

/**
 * interface des services d'un utilisateur permanent
 */
export interface UserServiceInterface extends UserBaseServiceInterface{
    
    updatePassword(instance:UserBaseInterface , lastPass:string , newPass:string):Promise<UserBaseInterface>
    updatePasswordForget(instance:UserBaseInterface , newPass:string ,codeVerif:number):Promise<UserBaseInterface>;
    getUserFromPassAndName(userName:string , password:string):Promise<UserBaseInterface>;
    updateName(instance:UserBaseInterface , username:string):Promise<UserBaseInterface>;
    deleteUser(instance:UserBaseInterface):Promise<void>;
    suspendUser(instance:UserBaseInterface):Promise<void>;
    restoreUser(id:number):Promise<UserBaseInterface|null>;
} 