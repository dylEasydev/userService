import { ProfilUserController } from '../controller';
import { BaseRouter } from './base.router';

class ProfilUserRouter extends BaseRouter<ProfilUserController>{
    public initRoute(){
        this.routerServeur.get('/',this.controllerService.findDomainSubcribes);
    }
}

export default new ProfilUserRouter(new ProfilUserController()).routerServeur;