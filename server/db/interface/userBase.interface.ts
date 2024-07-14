import { 
    CreationOptional, InferAttributes, InferCreationAttributes,
    Model, NonAttribute
} from 'sequelize';

export interface UserBaseInterface extends Model<
    InferAttributes<UserBaseInterface>,
    InferCreationAttributes<UserBaseInterface>
>{

    id:CreationOptional<number>;
    userName:string;
    password:string;
    addressMail:string;
    
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;

    codeVerif?:NonAttribute<number> |undefined;
}