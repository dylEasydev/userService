import express,{Application} from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { adminRouter, userRouter, indexRouter , profilRouter} from './router';
import bridge from 'http2-express-bridge';

class ExpressApp{
    public expressServer: Application;

    constructor(){
        this.expressServer = bridge(express);
        this.configServer();
    }

    private configServer(){
        this.expressServer.use(bodyParser.json())
                          .use(bodyParser.urlencoded({extended:true}))
                          .use(cors())
                          .use('/',indexRouter)
                          .use('/admin',adminRouter)
                          .use('/user',userRouter)
                          .use('/profil/user',profilRouter)
                          .use('*',(req,res)=>{
                                res.redirect('/docs');
                          })
    }
}

export default new ExpressApp().expressServer