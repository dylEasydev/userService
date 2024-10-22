import { Domain} from '../../interface';

export interface DomainServiceInterface{
    getDomainsubcribes(limit?:number):Promise<{message:string; data:Domain[];}>;
}