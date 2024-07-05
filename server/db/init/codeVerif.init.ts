import { CodeVerif } from '../models';
import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';

CodeVerif.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    codeverif:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:{msg:`Votre code de verifications doit être un entier !`}
        }
    },
    expiresAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
    nameTable:{
        type:DataTypes.STRING,
        allowNull:false
    },
    foreignId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'codeVerif'
})

export {CodeVerif}