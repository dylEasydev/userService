# Service de gestion de matière du site d'E-learning [easyclass.edu](https://www.easyclass.edu).

## Description du projet

Il sagit d'un serveur destinée aux opérations CRUD sur un utilisateur . Dans l'optique d'appliquer notre architecture **micro-service** , ce service utilise comme jeton de securité de ses **end-point** , le token fournis par le service d'authentification disponnible [oauthEasyclass](https://github.com/dylEasydev/Oauth2Easyclass)


## Prérequis
Avant de se lancer à coeur joie vers le demarage de se projet rassurez vous d'avoir :
- **nodejs** et **npm** d'installer sur votre ordinateur.
* un **SGBD**(sytème de gestion de base de donnée) dans notre **postgresql** et **mysql**
> [!IMPORTANT]
> vous pouvez utiliser un autre SGBD il vous suffit juste d'installer sont driver
> et de verifier s'il est pris en charge par [sequelize](https://sequelize.org)

+ possèder git et savoir faire des pull `git pull` ou des **fork**

## installation
Pour lancer le projet il faut tous d'abord installer les dependences .
ouvrez le terminal et deplacez vous au dossier où vous avez effectué le pull.
>[!NOTE]
>commande du pull
>```
>    mkdir doc-service
>    cd ./doc-service
>    git init 
>    git add remote origin (addresse ssh du depôt )
>    git pull
>```
et  lancer `npm install`

## configuration

Créer un fichier `.env`à la racine du projet puis copiez le code si dessous à l'interieur .

```js

PORT = 3003//
DB_NAME = 
DB_HOST = localhost
DB_DRIVER = 
DB_PASSWORD = 
DB_USER = 
NODE_ENV = developemnent
HOSTNAME = 127.0.0.1
COMPANING_MAIl = 
PASSWORD_MAIL=
PRIVATE_KEY = 
ADMIN_NAME =
ADMIN_PASS = 

```

Généré les clés pour sécurisé le serveur HTTP/2 . Vous auriez besion d'[openssl]() .

```
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365  -in server.csr -signkey server.key -out server.crt
```
## demarage du serveur
ouvrez le terminal et lancez la commande `npm run dev` .

pour les adepte de javascripts vous pouvez compiler grâce à la commande `npm build`.
Puis lancer le serveur avec la commande `node -r dotenv/config ./dist/index.js`

## Documentation
la documentation est à l'adresse `https://127.0.0.1:${process.env.PORT}/docs` .
son fichier html [ici](/docs/index.html) à enrichir si vous voulez bien . 

## conctact
Mon addresse: 
> easyclassgroup@gmail.com
