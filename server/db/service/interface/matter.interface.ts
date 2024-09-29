import { Matter } from '../../interface';

export interface MatterServiceInterface {
    getMatterSubcribes():Promise<{message:string; data:Matter[]}>;
}