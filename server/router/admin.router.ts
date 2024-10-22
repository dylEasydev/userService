import { AdminController } from '../controller'
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class AdminRouter extends BaseRouter<AdminController>{
    public initRoute(){
        this.routerServeur.delete('/:userName',auth.secureMiddleware,auth.verifPermToken('deleted:user'),this.controllerService.deletedUser);
        this.routerServeur.delete('/:userName',auth.secureMiddleware,auth.verifPermToken('suspend:user'),this.controllerService.suspendUser);
        this.routerServeur.post('/:id',auth.secureMiddleware,auth.verifPermToken('restored:user'),this.controllerService.restoreUser);
        this.routerServeur.get('/',auth.secureMiddleware,auth.verifPermToken('find:suspend'),this.controllerService.findAllUserSuspend)
    }
}
export default new AdminRouter(new AdminController()).routerServeur;