import { BaseController } from './base.controller';
import { Request , Response } from 'express';
import { statusResponse ,CodeStatut } from '../helper';
import { MatterService,DomainService, RequestError } from '../db/service';

export class ProfilUserController extends BaseController{

    async findProfilUser(req:Request , res :Response){
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(' ')[1];
            const limit = typeof req.query.limit === 'string'?parseInt(req.query.limit):undefined;

            const [domainSubcribes , matterSubcribes ] = await Promise.all(
                [
                    await new DomainService(token,req.ip).getDomainsubcribes(limit),
                    token?await new MatterService(token).getMatterSubcribes(limit):null
                ]
            )
            
            const profilUser={
                domainSubcribes:domainSubcribes.data , 
                matterSubcribes:matterSubcribes?.data
            };
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `votre profil à bien été envoyer`,
                profilUser
            )
        } catch (error) {
            if(error instanceof RequestError){
                return statusResponse.sendResponseJson(
                    error.status,
                    res,
                    error.message,
                    error.data
                )
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur , réessayer plus tard`,
                error
            )
        }
    }
}