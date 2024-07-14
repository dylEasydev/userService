import sequelizeConnect from '../config';
import { Role, User } from '../../db';
import { UserServiceInterface } from './interface';
import * as bcrypt from 'bcryptjs';
import { Op} from 'sequelize';
import { UserBaseInterface } from '../interface';

export class NotFountError extends Error{};
export class PassWordError extends Error{};

class UserService implements UserServiceInterface{

    findUserById(id: number){
        return new Promise<User| null>(async (resolve, reject) => {
            try {
                const userFind = await sequelizeConnect.transaction(async t=>{
                    return await User.findByPk(id,{
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(
                                        sequelizeConnect.getDialect() !== 'postgres'?
                                        `(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = User.id
                                            AND
                                            picture.nameTable ="user"
                                        LIMIT 1
                                    )`:  `(
                                        SELECT "urlPictures" FROM "image"
                                        WHERE 
                                            "foreignId" = "User"."id"
                                            AND
                                            "nameTable" ='user'
                                        LIMIT 1
                                    )`),`image`
                                ]
                            ]
                        },
                        include:[
                            {
                                association:User.associations.role,
                                include:[
                                    {
                                        association:Role.associations.scopes,
                                        through:{
                                            attributes:[]
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                });
                resolve(userFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    findUserByName(userName?: string , mail?:string){
        return new Promise<User| null>(async(resolve, reject) => {
            try {
                const name = (userName)? userName:' ';
                const email = (mail)? mail:' ';
                const  userFind = await sequelizeConnect.transaction(async t =>{
                    return User.findOne({
                        where:{
                            [Op.or]:{
                                userName:name,
                                addressMail:email
                            }
                        },
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(
                                        sequelizeConnect.getDialect() !=='postgres'?
                                        `(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = User.id
                                            AND
                                            picture.nameTable = "user"
                                        LIMIT 1
                                    )`:  `(
                                        SELECT "urlPictures" FROM "image"
                                        WHERE 
                                            "foreignId" = "User"."id"
                                            AND
                                            "nameTable" = 'user'
                                        LIMIT 1
                                    )`,),`image`
                                ]
                            ]
                        },
                        include:[
                            {
                                association:User.associations.role,
                                include:[
                                    {
                                        association:Role.associations.scopes,
                                        through:{
                                            attributes:[]
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                });
                resolve(userFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllUsers(limit?:number, search=''){
        return new Promise<{
            rows:UserBaseInterface[];
            count:number;
        }>(async(resolve, reject) => {
            try {
                const tableUser = await sequelizeConnect.transaction(async t=>{
                    return await User.findAndCountAll({
                        where:{
                            [Op.or]:[
                                {
                                    userName:{
                                        [Op.like]:`%${search}%`
                                    }
                                },
                                {
                                    addressMail:{
                                        [Op.like]:`%${search}%`
                                    }
                                }
                            ]
                        },
                        limit,
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(
                                        sequelizeConnect.getDialect() !=='postgres'?
                                        `(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = User.id
                                            AND
                                            picture.nameTable = "user"
                                        LIMIT 1
                                    )`:  `(
                                        SELECT "urlPictures" FROM "image"
                                        WHERE 
                                            "foreignId" = "User"."id"
                                            AND
                                            "nameTable" = 'user'
                                        LIMIT 1
                                    )`,),`image`
                                ]
                            ]
                        },
                        include:[
                            {
                                association:User.associations.role,
                                include:[
                                    {
                                        association:Role.associations.scopes,
                                        through:{
                                            attributes:[]
                                        }
                                    }
                                ]
                            }
                        ],
                        order:[[
                            'userName','DESC'
                        ]]
                    })
                });
                resolve(tableUser);
            } catch (error) {
                reject(error);
            }
        })
    }

    updatePassword(instance:User , lastPass:string , newPass:string){
        return new Promise<User>(async(resolve, reject) => {
            try {
                const test = await bcrypt.compare(lastPass ,instance.password);
                if(!test) reject(new PassWordError(`Ancien mots de passe incorrect !`));
                else{
                    const userUpdate = await sequelizeConnect.transaction(async t=>{
                        return await instance.update({
                            password:newPass
                        },{hooks:true})
                    })
                    resolve(userUpdate);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    updatePasswordForget(instance:User , newPass:string){
        return new Promise<User>(async(resolve, reject) => {
            try {
                const userUpdate = await sequelizeConnect.transaction(async t=>{
                    return await instance.update({
                        password:newPass
                    },{hooks:true});
                })
                resolve(userUpdate)
            
            } catch (error) {
                reject(error);
            }
        })
    }

    updateName(instance:User , username:string){
        return new Promise<User>(async (resolve, reject) => {
            try {
                const userUpdate = await sequelizeConnect.transaction(async t =>{
                    return await instance.update({
                        username
                    },{hooks:true});
                })
                resolve(userUpdate);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteUser(instance:User){
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve(
                    await sequelizeConnect.transaction(async t=>{
                        await instance.destroy({
                            force:true
                        })
                    })
                )
            } catch (error) {
                reject(error);
            }
        })
    }

    suspendreUser(instance:User){
        return new Promise<void>(async (resolve, reject) => {
            try {
                resolve(
                    await sequelizeConnect.transaction(async t=>{
                        await instance.destroy();
                    })
                )
            } catch (error) {
                reject(error);
            }
        })
    }

    getUserFromPassAndName(userName: string, password: string){
        return new Promise<User>(async (resolve, reject) => {
            try {
                const userFind = await this.findUserByName(userName);
                if(userFind !== null){
                    const test =await bcrypt.compare(password ,userFind.password);
                    if(!test) reject(new PassWordError(`vous avez fournis un mauvais mots de passe !`));
                    else resolve(userFind) 
                }
                reject(new NotFountError(`Aucun utilisateur existant !`))
            } catch (error) {
                reject(error)
            }
        })
    }

}

const userService = new UserService();
export default userService; 