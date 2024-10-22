import { Matter } from '../../interface';

export interface MatterServiceInterface {
    getMatterSubcribes(limit?:number):Promise<{message:string; data:Matter[]}>;
}