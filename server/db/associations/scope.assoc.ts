import { Role, Scope ,AuthPermission} from '../init';

Scope.belongsToMany(Role,{
    through:AuthPermission,
    foreignKey:{
        name:'scopeId',
        allowNull:false
    },
    otherKey:{
        name:'roleId',
        allowNull:false
    },
    targetKey:'id',
    sourceKey:'id',
    as:'roles',
    hooks:true,
    onDelete:'CASCADE'
});

Scope.hasMany(AuthPermission,{
    foreignKey:{
        name:'scopeId',
        allowNull:false
    },
    sourceKey:'id',
    as:'authPermissions',
    hooks:true,
    onDelete:'CASCADE'
});

export {Scope};