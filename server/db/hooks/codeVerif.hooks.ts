import { mailer } from '../../helper';
import { CodeVerif } from '../init';
import { NotFountError } from '../service';

CodeVerif.afterSave((instance,options)=>{
    return new Promise<void>(async (resolve, reject) => {
        try {
            const user = await instance.getForeignObject({transaction:options.transaction});
            if(user  !== null){
                const message = `Bienvenue chez easy class companing<br>utiliser ce code pour verifier votre mail<br> code:${instance.codeverif}`;
                const subject = `Verification de compte`;
                await mailer.sendMail(user.addressMail,message,subject);
                resolve();
            }
            reject(new NotFountError(`Aucun utilisateur associer à se code de verification`));   
        } catch (error) {
            reject(error);
        }
    })
})


export {CodeVerif};