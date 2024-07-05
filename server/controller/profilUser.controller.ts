import { BaseController } from './base.controller';
import { Request , Response } from 'express';
import { statusResponse ,CodeStatut } from '../helper';
import { DomainService, RequestError } from '../db/service/domain.service';

export class ProfilUserController extends BaseController{

    async findDomainSubcribes(req:Request , res :Response){
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

            const [domainSubcribes] = await Promise.all(
                [
                    new DomainService(token).getDomainsubcribes()
                ]
            )
            const profilUser={domainSubcribes:domainSubcribes.data};
            return statusResponse.sendResponseJson(
                CodeStatut.CLIENT_STATUS,
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

        }
    }
}