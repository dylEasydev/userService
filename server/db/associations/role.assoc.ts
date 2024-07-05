import {Role , Scope, User,AuthPermission} from '../init';

Role.belongsTo(User,{
    foreignKey:{
        name:'userId',
        allowNull:false
    },
    targetKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'user'
});

Role.belongsToMany(Scope,{
    through:AuthPermission,
    foreignKey:{
        name:'roleId',
        allowNull:false
    },
    otherKey:{
        name:'scopeId',
        allowNull:false
    },
    targetKey:'id',
    sourceKey:'id',
    as:'scopes',
    hooks:true,
    onDelete:'CASCADE'
});

Role.hasMany(AuthPermission,{
    foreignKey:{
        name:'roleId',
        allowNull:false
    },
    sourceKey:'id',
    as:'authPermissions',
    hooks:true,
    onDelete:'CASCADE'
});

export {Role};