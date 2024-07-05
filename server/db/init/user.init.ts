import sequelizeConnect from '../config';
import { User } from '../models';
import { DataTypes } from 'sequelize';

User.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    userName:{
        type:DataTypes.STRING,
        unique:{
            msg:`Ce nom d'utilisateur est déjà pris !`,
            name:`userNameKey`
        },
        allowNull:false,
        validate:{
            is:{
                args:/^[a-zA-Z0-9]+$/,
                msg:`Veillez fournir un nom d'utilisateur sans carractères spéciaux !`
            },
            len:{
                msg:` le nom d'utilisateur doit être entre 4 et30 carractères !`,
                args:[4,30]
            },
            notNull:{msg:`Veillez founir une autre valeur que <<null>> pour le nom d'utilisateur !`},
            notEmpty:{msg:`Veillez passer une chaîne de carractères non vide pour le nom de l'utilisateur !`},
            isNameValid(value:string){
                if(!value) throw new Error(`Votre nom d'utilisateur ne doit pas être null !`);
                if(value.length < 4) throw new Error(`Fournissez au moins 4 carractères pour votre nom d'utilisateur !`);
                if(value.includes(' ')) throw new Error(`Pas espace blancs dans le nom d'utilisateur !`);
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{msg:`Veillez fournir un mots de passe !`},
            notEmpty:{msg:`Veillez fournir un mots de passe`},
            is:{
                args: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                msg: `Veillez fournir un mots de passe ayant au moins un chiffre , une ou plusieurs lettres majuscules , plus de 8 carractères et pas d'espace blancs !`
            },
            isPassValid(value:string){
                if(!value) throw new Error(`Veillez fournir un mots de passe !`);
                if(value.length < 8) throw new Error(`Veillez fournir un mots de passe ayant au moins un chiffre , une ou plusieurs lettres majuscules , plus de 8 carractères et pas d'espace blancs  !`);
                if(value.includes(' ')) throw new Error(`Veillez fournir un mots de passe ayant au moins un chiffre , une ou plusieurs lettres majuscules , plus de 8 carractères ! et pas d'espace blancs !`);
            }
        }
    },
    addressMail:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:{
            msg:`Cette addresse électronique possède déjà un compte ! `,
            name:`mailKey`
        },
        validate:{
            notNull:{msg:`Veillez founir une adresse électronique Valide !`},
            notEmpty:{msg:`Veillez founir une adresse électronique Valide`},
            isEmail:{msg:`Veillez founir une adresse électronique Valide`} ,
        },
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'user'
})

export {User};