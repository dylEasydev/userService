import { Domain} from '../../interface';

export interface DomainServiceInterface{
    getDomainsubcribes():Promise<{message:string; data:Domain[];}>;
}