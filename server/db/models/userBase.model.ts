import {
    Model,CreationOptional,NonAttribute
} from 'sequelize';
import { UserBaseInterface} from '../interface';

export abstract class UserBase extends Model implements UserBaseInterface{
    
    declare id: CreationOptional<number>;
    declare userName: string;
    declare password: string;
    declare addressMail: string;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    
    declare codeVerif?: NonAttribute<number> | undefined;
    
}