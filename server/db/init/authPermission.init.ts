import sequelizeConnect from '../config';
import { AuthPermission, Role, Scope } from '../models';
import { DataTypes } from 'sequelize';

AuthPermission.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    roleId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Role,
            key:'id'
        }
    },
    scopeId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Scope,
            key:'id'
        }
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'authPermission'
});

export {AuthPermission};