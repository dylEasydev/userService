import {User} from '../associations';
import bcrypt from 'bcryptjs';

User.afterValidate((instances:User) =>{
    return new Promise<void>((resolve, reject) => {
        bcrypt.hash(instances.password , 10 ).then(passHash=>{
            instances.password = passHash
            resolve();
        }).catch(error=>{
            reject(error);
        });
    });
});

export {User};