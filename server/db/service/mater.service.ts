import { MatterServiceInterface } from './interface';
import { Matter} from '../interface';
import axios,{ AxiosInstance } from 'axios';
import { RequestError } from './domain.service';

export class MatterService implements MatterServiceInterface{
    public axiosRequest: AxiosInstance;

    constructor(jeton?:string){
        this.axiosRequest = axios.create({
            baseURL:'http://localhost:3003/',
            timeout:3000,
            headers:{
                Authorization:`Bearer ${jeton}`,
                Connection:"keep-alive",
                Upgrade:"h2"
            }
        })
    }
    getMatterSubcribes(){
        return new Promise<{message:string; data:Matter[] ;}>(async(resolve, reject) => {
            try {
                const matterSubcribes = await this.axiosRequest.get<
                {message:string; data:any;}
                >(`/follow`,{
                    validateStatus:(status:number)=>{return status < 500}
                });
                if(matterSubcribes.status < 200 || matterSubcribes.status > 300){
                    reject(
                        new RequestError(
                            matterSubcribes.status,
                            matterSubcribes.data.data,
                            matterSubcribes.data.message
                        )
                    )
                }else resolve(matterSubcribes.data as {message:string,data:Matter[]}); 
            } catch (error) {
               reject(error);
            }
        })
    }
}