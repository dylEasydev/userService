import { CodeVerifInterface, UserBaseInterface } from '../../interface';

export  interface CodeVerifInterfaceService{
    findCodeVerif(code:number ,foreignId:number):Promise<CodeVerifInterface>;
    getForeingData(code:CodeVerifInterface):Promise<UserBaseInterface>;
}