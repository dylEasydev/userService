import {
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional,ForeignKey, NonAttribute, Association
} from 'sequelize';
import { 
    AuthPermissionInterface, RoleInterface, ScopeInterface 
} from '../interface';


export class AuthPermission extends Model<
    InferAttributes<AuthPermission>,
    InferCreationAttributes<AuthPermission>
> implements AuthPermissionInterface{

    declare id: CreationOptional<number>;
    declare roleId: ForeignKey<RoleInterface['id']>;
    declare scopeId: ForeignKey<ScopeInterface['id']>;

    //timestamps
    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;

    declare scope?: NonAttribute<ScopeInterface> | undefined;
    declare role?: NonAttribute<RoleInterface> | undefined;

    //declarations d'alias d'associations
    declare static associations:{
        scope: Association<AuthPermissionInterface,ScopeInterface>;
        role: Association<AuthPermissionInterface,RoleInterface>;
    }
}