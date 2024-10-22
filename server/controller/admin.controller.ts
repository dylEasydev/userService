import { Request , Response} from 'express';
import { BaseController } from './base.controller';
import { statusResponse , CodeStatut} from '../helper';
import { Token } from '../db';
import { userService } from '../db/service';

export class AdminController extends BaseController{

    async deletedUser(req:Request ,res:Response){   
        if(req.params.userName){
            try {
                const userFind = await userService.findUserByName(req.params.userName);
                if(userFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun utilisateur du nom ${req.params.userName}`
                    )
                }
                await userService.deleteUser(userFind);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `utilisateur ${req.params.userName} bien supprimer !`,
                    userFind
                )
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS,
                    res,
                    `Erreur au niveau du serveur , réessayer plus tard`,
                    error
                )
            }
        }
    }

    async suspendUser(req:Request , res:Response){
        if(req.params.userName){
            try {
                const userFind = await userService.findUserByName(req.params.userName);
                if(userFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun utilisateur du nom ${req.params.userName}`
                    )
                }
                await userService.suspendUser(userFind);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `utilisateur ${req.params.userName} bien suspendu !`,
                    userFind
                )
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS,
                    res,
                    `Erreur au niveau du serveur ,réessayer plus tard !`,
                    error
                )
            }
        }
    }

    async restoreUser(req:Request , res:Response){
        if(req.params.id){
            try {
                const id = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                const userRestore = await userService.restoreUser(id);
                if(userRestore === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune compte avec identifiant ${req.params.id}!`
                    );
                }
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `utilisateur ${userRestore.userName}à bien été restaurer !`,
                    userRestore
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
    }

    async findAllUserSuspend(req:Request ,res:Response){
        try {
            const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit ):undefined;
            if(req.query.search){
                const search = typeof req.query.search === 'string' ? req.query.search:'';
                const tableUser = await userService.findAllUsersSuspend(limit,search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `nous avons ${tableUser.count} utilisateur trouvé au termes de recherche ${search}!`,
                    tableUser.rows
                );
            }
            const tableUser = await userService.findAllUsersSuspend(limit);
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
}