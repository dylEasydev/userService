import { 
    AuthPermission, CodeVerif, Image,
    Role, Scope, User, sequelizeConnect 
} from './index';

export function initDB(){
    return new Promise<void>(async (resolve, reject) => {
        const test = process.env.NODE_ENV === 'developemnent'
        try {
            await sequelizeConnect.authenticate();
            await User.sync({alter:test});
            await Role.sync({alter:test});
            await Scope.sync({alter:test});
            await AuthPermission.sync({alter:test});
            await Image.sync({alter:test});
            await CodeVerif.sync({alter:test});
            await sequelizeConnect.sync({alter:test});
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}