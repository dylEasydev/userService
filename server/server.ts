import expressServer from './app';
import http from 'http';
import { initDB } from './db/initDB';

export const launchHttpServer = ()=>{
    const port:unknown = process.env.PORT ;
    const hostName = process.env.HOSTNAME;
    
    const domainServer = http.createServer(expressServer);
    
    initDB().then(()=>console.log(`synchronisation réussi`)).catch(error => console.log(`Error:${error}`));
    
    try {
        domainServer.listen(port as number , hostName,()=>{
            console.log(`Notre serveur tourne à l'adresse http://${hostName}:${port}`)
        })
    } catch (error) {
        console.log(`Une erreur est survenu lors du démarrage du serveur\n.Veillez verifier erreur:${error} puis rédemarrer`)
    }
}
