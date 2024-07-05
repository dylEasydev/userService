import { 
    Model,CreationOptional,InferAttributes , 
    InferCreationAttributes, FindOptions 
} from 'sequelize';
import { 
    UserBaseInterface,UserInterface
} from '../interface';


export interface CodeVerifInterface extends Model<
    InferAttributes<CodeVerifInterface>,
    InferCreationAttributes<CodeVerifInterface>
>{

    id:CreationOptional<number>;
    codeverif:number;
    expiresAt:Date;
    nameTable:CreationOptional<string>;

    foreignId:CreationOptional<number>;

    [key: string]: (
        (options?: FindOptions<
            InferAttributes<UserBaseInterface>    
        >) => Promise<UserBaseInterface>
    )|any;

    getUser(
        options?:FindOptions<UserInterface>
    ):Promise<UserInterface|null>;

    getForeignObject(
        options?:FindOptions<InferAttributes<UserBaseInterface>>
    ):Promise<UserBaseInterface|null>;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}