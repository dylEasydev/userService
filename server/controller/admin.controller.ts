import { Request , Response} from 'express';
import { BaseController } from './base.controller';
import { statusResponse , CodeStatut} from '../helper';
import { Token } from '../db';
import { userService } from '../db/service';

export class AdminController extends BaseController{
    async deletedUser(req:Request ,res:Response){   
        if(req.params.userName){
            try {
                const userToken = req.body.token as Token;
                if(typeof userToken.scope ==='string'){
                    if(userToken.scope !== 'deleted:user')
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune Permission de suppression d'un compte!`
                        );
                }else if(typeof userToken.scope === 'undefined'){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune Permission de suppression d'un compte !`
                    );
                }else{
                    if(!userToken.scope.includes('deleted:user'))
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune Permission de suppression d'un compte !`
                        );
                }

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
                const userToken = req.body.token as Token;
                if(typeof userToken.scope ==='string'){
                    if(userToken.scope !== 'suspend:user')
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune Permission de suspenssion  d'un compte!`
                        );
                }else if(typeof userToken.scope === 'undefined'){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune Permission de suspenssion  d'un compte!`
                    );
                }else{
                    if(!userToken.scope.includes('suspend:user'))
                        return statusResponse.sendResponseJson(
                            CodeStatut.NOT_PERMISSION_STATUS,
                            res,
                            `Aucune Permission de suspenssion  d'un compte!`
                        );
                }

                const userFind = await userService.findUserByName(req.params.userName);
                if(userFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun utilisateur du nom ${req.params.userName}`
                    )
                }
                await userService.suspendreUser(userFind);
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
}