import { Admin, MongoClient, ObjectId } from "mongodb";
import { meneger } from "./admin.type";

const DB_INFO = {
    connection: process.env.CONNECTION_STRING  as string,
    name: process.env.DB_NAME,
    Collection : 'Admin'
}

export async function checkifexists(query = {}) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        //התחברות למסד הנתונים
        await mongo.connect();
        //החזרת כמות המסמכים   
        return await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).countDocuments(query);
    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}

export async function addcostumer(costumer: meneger) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        //התחברות למסד הנתונים
        await mongo.connect();
        //הוספת המשתמש למאגר
        return await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).insertOne(costumer);
    } catch (error) {
        throw error;
    }
    finally {
        //סגירת החיבור למסד הנתונים
        mongo.close();
    }
}

export async function findCostumer(query = {} , projection = {}) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();

        let costumers = await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).find(query, {projection}).toArray();
        return costumers

    } catch (error) {
        throw error
    }
    finally{
        mongo.close();
    }
}

