import { 
    Model , CreationOptional, InferAttributes,InferCreationAttributes,
    NonAttribute, ForeignKey
} from 'sequelize';
import { ScopeInterface, UserInterface } from '../interface';


export interface RoleInterface extends Model<
    InferAttributes<RoleInterface>,
    InferCreationAttributes<RoleInterface>
>{

    id:CreationOptional<number>;
    roleName:string;
    roleDescript:CreationOptional<string>;

    userId:ForeignKey<UserInterface['id']>;

    user?:NonAttribute<UserInterface>|undefined;
    scopes?:NonAttribute<ScopeInterface[]>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}