import { 
    Association,NonAttribute
} from 'sequelize';
import { 
    RoleInterface,UserInterface 
} from '../interface';
import { UserBase } from './userBase.model';

export class User extends UserBase implements UserInterface{
     
    declare codeVerif?: NonAttribute<number> | undefined;
    declare image?: NonAttribute<string> | undefined;
    declare role?: NonAttribute<RoleInterface> | undefined;

    //declaration des alias associations 
    static associations: { 
        role: Association<UserInterface , RoleInterface>;
    };
}