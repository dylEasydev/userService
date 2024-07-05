import { 
    ForeignKey, InferAttributes, InferCreationAttributes, Model,
    CreationOptional,NonAttribute
} from 'sequelize';
import { RoleInterface,ScopeInterface } from '../interface';


export interface AuthPermissionInterface extends Model<
    InferAttributes<AuthPermissionInterface>,
    InferCreationAttributes<AuthPermissionInterface>
>{
    id:CreationOptional<number>;
    roleId:ForeignKey<RoleInterface['id']>;
    scopeId:ForeignKey<ScopeInterface['id']>;

    scope?:NonAttribute<ScopeInterface>|undefined;
    role?:NonAttribute<RoleInterface>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}