import { generateCode } from '../../helper';
import sequelizeConnect from '../config';
import { CodeVerifInterface, UserBaseInterface } from '../interface';
import { CodeVerif } from '../models';
import { CodeVerifInterfaceService } from './interface';
import userService, { NotFountError } from './user.service';

class CodeVerifService implements CodeVerifInterfaceService{

    findCodeVerif(code: number, foreignId: number){
        return new Promise<CodeVerifInterface>(async (resolve, reject) => {
            try {
                const codeVerif = await sequelizeConnect.transaction(async t =>{
                    return CodeVerif.findOne({
                        where:{
                            codeverif:code,
                            foreignId
                        }
                    })
                })
                if(codeVerif === null){
                    reject(new NotFountError(`Mauvais Code de Verification !`))
                }else{
                    resolve(codeVerif);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    getForeingData(code: CodeVerifInterface){
        return new Promise<UserBaseInterface>(async (resolve, reject) => {
            try {
                const user = await sequelizeConnect.transaction(async t=>{
                    return await code.getForeignObject({transaction:t});
                });
                if(user === null)reject(new NotFountError(`Aucun utilisateur ne possède ce code !`))
                else resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }

    updateCodeVerif(user:UserBaseInterface){
        return new Promise<CodeVerifInterface>(async (resolve, reject) => {
            try {
                if(user.get('codeVerif')){
                    const code = user.get('codeVerif') as number;
                    const beforeCode = await this.findCodeVerif(code,user.id);
                    if(beforeCode === null){
                        reject(new NotFountError(`Aucun code de verification pour cette utilisateur`));
                    }else{
                        const codeVerif = await sequelizeConnect.transaction(async t=>{
                            const expiresAt = new Date(Date.now());
                            expiresAt.setHours(expiresAt.getHours()+1);
                            return beforeCode.update({
                                codeverif:parseInt(generateCode.generateId(6)),
                                expiresAt
                            },{hooks:false});
                        })
                        resolve(codeVerif)
                    }
                }else{
                    reject(new NotFountError(`Aucun code de verification pour cette utilisateur`));
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    getUserByNameTable(nameTable:string,userName:string){
        return new Promise<UserBaseInterface>(async(resolve, reject) => {
            try {
                let user:UserBaseInterface|null;
                switch(nameTable){
                    case 'user':
                        user = await userService.findUserByName(userName) as UserBaseInterface;
                        break;
                    default :
                        user = null;
                        break;
                }
    
                if(user === null)reject(new NotFountError(`Aucun Utilisateur existant`));
                else resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new CodeVerifService();