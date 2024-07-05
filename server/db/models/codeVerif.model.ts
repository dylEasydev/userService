import { 
    InferAttributes, InferCreationAttributes,Model ,
    CreationOptional,NonAttribute,FindOptions
} from 'sequelize';
import { 
    CodeVerifInterface , UserBaseInterface, UserInterface
} from '../interface';
import { upperCaseFirst } from '../../helper';
import { User } from '../../db';

export class CodeVerif extends Model<
    InferAttributes<CodeVerif>,
    InferCreationAttributes<CodeVerif>
>implements CodeVerifInterface{

    declare id: CreationOptional<number>;
    declare codeverif: number;
    declare expiresAt:Date;
    declare nameTable: CreationOptional<string>; 

    //declaration des clés étrangère
    declare foreignId:CreationOptional<number>;
    
    [key: string]: (
        (options?: FindOptions<InferAttributes<UserBaseInterface>>) => Promise<UserBaseInterface>
    )|any;
    getForeignObject(
        options?:FindOptions<FindOptions<UserBaseInterface>>
    ):Promise<UserBaseInterface|null>{
        if(!this.nameTable) return Promise.resolve(null);
        const mixinName = `get${upperCaseFirst(this.nameTable)}`; 
        return this[mixinName](options);
    }

    getUser(
        options?:FindOptions<InferAttributes<UserInterface>>
    ){
        return new Promise<UserInterface|null>(async(resolve, reject) => {
            try {
                if(this.nameTable !== 'user')resolve(null);
                else{
                    const user = await User.findByPk(this.foreignId,options);
                    resolve(user)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    declare foreignData?: NonAttribute<UserBaseInterface> | undefined;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

}