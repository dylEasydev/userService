import { NonAttribute } from 'sequelize';
import { RoleInterface } from '../interface';
import { UserBaseInterface } from './userBase.interface';

export interface UserInterface extends UserBaseInterface{
    
    image?:NonAttribute<string>|undefined;

    role?:NonAttribute<RoleInterface>|undefined; 
}