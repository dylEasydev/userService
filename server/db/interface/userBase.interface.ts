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
    
    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date|null>;

    //code de verification (util pour la mis à jour du password !)
    codeVerif?:NonAttribute<number> |undefined;
}