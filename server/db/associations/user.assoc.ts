import { 
    User,Role
} from '../init';

User.hasOne(Role,{
    foreignKey:{
        name:'userId',
        allowNull:false
    },
    sourceKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'role'
});


export {User};