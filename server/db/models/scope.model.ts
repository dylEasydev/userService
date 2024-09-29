import { 
    InferAttributes, Model,InferCreationAttributes,
    CreationOptional,NonAttribute,Association
} from 'sequelize';
import { RoleInterface, ScopeInterface } from '../interface';

export class Scope extends Model<
    InferAttributes<Scope>,
    InferCreationAttributes<Scope>
>implements ScopeInterface{

    declare id: CreationOptional<number>;
    declare scopeName: string;
    declare scopeDescript: CreationOptional<string>;
    
    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    declare roles?: NonAttribute<RoleInterface[]>| undefined;

    //declartion des alias d'associations 
    declare static associtions:{
        roles: Association<ScopeInterface , RoleInterface>;
    }
}