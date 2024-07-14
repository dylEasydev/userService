import expressServer from './app';
import http from 'http';

export const launchHttpServer = ()=>{
    const port:unknown = process.env.PORT ;
    const hostName = process.env.HOSTNAME;
    
    const domainServer = http.createServer(expressServer);
    
    try {
        domainServer.listen(port as number , hostName,()=>{
            console.log(`Notre serveur tourne à l'adresse http://${hostName}:${port}`)
        })
    } catch (error) {
        console.log(`Une erreur est survenu lors du démarrage du serveur\n.Veillez verifier erreur:${error} puis rédemarrer`)
    }
}
