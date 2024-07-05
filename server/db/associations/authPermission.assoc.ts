import { AuthPermission, Role, Scope } from '../init';

AuthPermission.belongsTo(Role,{
    foreignKey:{
        name:'roleId',
        allowNull:false
    },
    targetKey:'id',
    as:'role',
    hooks:true,
    onDelete:'CASCADE'
});

AuthPermission.belongsTo(Scope,{
    foreignKey:{
        name:'scopeId',
        allowNull:false
    },
    targetKey:'id',
    as:'scope',
    hooks:true,
    onDelete:'CASCADE'
});

export {AuthPermission};