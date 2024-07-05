import { AdminController } from '../controller'
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class AdminRouter extends BaseRouter<AdminController>{
    public initRoute(){
        this.routerServeur.delete('/:userName',auth.secureMiddleware,this.controllerService.deletedUser);
        this.routerServeur.delete('/:userName',auth.secureMiddleware,this.controllerService.suspendUser);
    }
}
export default new AdminRouter(new AdminController()).routerServeur;