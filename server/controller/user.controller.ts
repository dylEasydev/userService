import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { PassWordError, userService,codeVerifService ,NotFountError} from '../db/service';
import { CodeStatut, statusResponse } from '../helper';
import { Token } from '../db';
import { ValidationError } from 'sequelize';

export class UserController extends BaseController{
    async findUserById(req:Request , res:Response){
        if(req.params.id){
            try {
                const id = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
               const userFind = await userService.findUserById(id);
               if(userFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun utilisateur d'identifiant ${req.params.id}`
                    );
               }
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `Utilisateur bien trouvé ! `,
                    userFind
                );
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS,
                    res,
                    `Erreur au niveau du serveur , réesayer plus tard`,
                    error
                );
            }
        }
    }

    async findUserByName(req:Request , res:Response){
        if(req.params.username){
            try {
                const userFind = await userService.findUserByName(req.params.username);
                if(userFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun utilisateur du nom ${req.params.username}`
                    );
                }
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `utilisateur bien trouvé !!`,
                    userFind
                );
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS,
                    res,
                    `Erreur au niveau du serveur ,réessayer plus tard !`,
                    error
                );
            }
        }
    }

    async findAllUser(req:Request ,res:Response){
        try {
            const limit = (typeof req.query.limit === 'string' )? parseInt(req.query.limit):undefined;
            if(req.query.search){
                const search = typeof req.query.search === 'string'?req.query.search:'';
                const tableUser = await userService.findAllUsers(limit,search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `nous avons ${tableUser.count} utilisateur trouvé au termes de recherche ${search}!`,
                    tableUser.rows
                );
            }
            const tableUser = await userService.findAllUsers(limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `nous avons ${tableUser.count} utilisateurs!`,
                tableUser.rows
            );
        } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur ,réessayer plus tard !`,
                error
            )
        }
    }

    async deleteUser(req:Request , res:Response){
        try {
            const userToken = req.body.token as Token;
            const userDeleted = await userService.findUserById(userToken.userId);
            if(userDeleted === null){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucun utilisateur associer à ce jeton !`
                )
            }
            await userService.deleteUser(userDeleted);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `votre compte à bien été supprimer`,
                userDeleted
            );
        } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur , réessayer plus tard !`,
                error
            );
        }
    }

    async updateName(req:Request , res:Response){
        try {
            const userToken = req.body.token as Token;
            const userFind = await userService.findUserById(userToken.userId);
            if(userFind === null){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucun utilisateur associer à ce jeton !`
                )
            }
            const {userName}= req.body;
            const userUpdated = await userService.updateName(userFind, userName);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `nom d'utilisateur bien mis à jour !`,
                userUpdated
            )
        } catch (error) {
            if(error instanceof ValidationError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                )
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur réesayer plus tard`,
                error
            )
        }
    }

    async updatePassword(req:Request , res:Response){
        try {
            const userToken = req.body.token as Token;
            const userFind = await userService.findUserById(userToken.userId);
            if(userFind === null){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucun utilisateur associer à ce jeton !`
                )
            }
            const {lastPass , newPass} =  req.body;
            const userUpdated = await userService.updatePassword(userFind,lastPass,newPass);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `mots de passe bien mis à jour !`,
                userUpdated
            )
        } catch (error) {
            if(error instanceof PassWordError){
                return statusResponse.sendResponseJson(
                   CodeStatut.NOT_FOUND_STATUS,
                   res,
                   error.message,
                   error 
                )
            }
            if(error instanceof ValidationError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                )
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur réesayer plus tard`,
                error
            )
        }
    }
   
    async updatePasswordForget(req:Request , res:Response){
        try {
            if(req.params.id){
                const id = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                let {codeverif , password } = req.body;
                if(typeof codeverif !== 'number') codeverif = typeof codeverif === 'string'? parseInt(codeverif):0;

                const codeUser = await codeVerifService.findCodeVerif(codeverif,id);
                if(codeUser.expiresAt.getMilliseconds() > Date.now()){
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Le code de verification à expirer !!`
                    )
                }
                const user = await codeVerifService.getForeingData(codeUser);
                const userUpdated = await userService.updatePasswordForget(user,password);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `votre mots de passe à bien été mis à jour ${userUpdated.userName}`,
                    userUpdated
                )
            }
        } catch (error) {
            if(error instanceof NotFountError){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_PERMISSION_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            if(error instanceof ValidationError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur survenue au niveau du serveur , réesayez dans quelques instants !!`,
                error
            );
        }
    }

    async verifCode(req:Request , res:Response){
        try {
            if(req.params.id){
                const id = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                let {codeverif } = req.body;
                if(typeof codeverif !== 'number') codeverif = typeof codeverif === 'string'? parseInt(codeverif):0;

                const codeUser = await codeVerifService.findCodeVerif(codeverif,id);
                if(codeUser.expiresAt.getMilliseconds() > Date.now()){
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Le code de verification à expirer !!`
                    )
                }
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `Code de verification valide pour l'utilisateur d'identifiant ${req.params.id}`,
                    codeUser
                )
            }
        } catch (error) {
            if(error instanceof NotFountError){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_PERMISSION_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur survenue au niveau du serveur , réesayez dans quelques instants !!`,
                error
            );
        }
    }

}