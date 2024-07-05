import {
     InferAttributes, InferCreationAttributes, Model,
     CreationOptional,Association,ForeignKey,NonAttribute
} from 'sequelize';
import { 
    RoleInterface, ScopeInterface, UserInterface
} from '../interface';

export class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> implements RoleInterface{

    declare id: CreationOptional<number>;
    declare roleName: string;
    declare roleDescript: CreationOptional<string>;

    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    declare userId: ForeignKey<UserInterface['id']>;

    declare user?: NonAttribute<UserInterface>| undefined;
    declare scopes?: NonAttribute<ScopeInterface[]>| undefined;

    declare static associations: { 
        user: Association<RoleInterface, UserInterface>;
        scopes: Association<RoleInterface , ScopeInterface>; 
    };

}