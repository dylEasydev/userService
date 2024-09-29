import { UserController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class UserRouter extends BaseRouter<UserController>{

    public initRoute(){
        this.routerServeur.get('/:id',this.controllerService.findUserById);
        this.routerServeur.get('/:userName',this.controllerService.findUserByName);
        this.routerServeur.get('/',this.controllerService.findAllUser);

        this.routerServeur.put('/update/name',auth.secureMiddleware,this.controllerService.updateName);
        this.routerServeur.put('/update/password',auth.secureMiddleware,this.controllerService.updatePassword);
        this.routerServeur.put('/update/forget/:id',this.controllerService.updatePasswordForget);

        this.routerServeur.post('/verifCode/:id',this.controllerService.verifCode)

        this.routerServeur.delete('/',this.controllerService.deleteUser)
    }
}

export default new UserRouter(new UserController()).routerServeur;