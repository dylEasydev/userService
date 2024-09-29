import { Response ,Request } from 'express';
import { CodeStatut, generateToken, statusResponse } from '../helper';
import { Token } from '../db';

class AuthToken {

    async secureMiddleware(req:Request ,res:Response ,next :()=>void){
       try {
            const bearerToken = req.headers.authorization;

            if(!bearerToken){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_PERMISSION_STATUS,
                    res,
                    `Aucun Token n'as été fourni !`
                );
            }

            const token = bearerToken.split(' ')[1];
            if(!token){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_PERMISSION_STATUS,
                    res,
                    `Aucun Token n'as été fourni !`
                );
            }
            req.body.token = await generateToken.verifyToken<Token>(token);
            next();
       } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur réesayer plus tard !`
            )
       }
    }
}

export default new AuthToken();