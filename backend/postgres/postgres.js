import { Sequelize } from "sequelize";
import { createUserModel } from "../model/contact.schema.js";

const sequelize = new Sequelize('postgres','postgres','postgre',{
    host:'localhost',
    dialect:'postgres'
})

let userModel = null;
const connection = async()=>{
    try {
        await sequelize.authenticate();
        console.log("connection successfull");
        userModel = await createUserModel(sequelize);
        await sequelize.sync();
        console.log("database synced")
    } catch (error) {
        console.log("Unable to connect with database ",error.message)
    }
}

export {connection,userModel};