import { Scope } from '../models';
import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';


Scope.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    scopeName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    scopeDescript:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'scope'
})

export {Scope}