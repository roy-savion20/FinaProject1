import { MongoClient, ObjectId } from "mongodb";
import { Costumer, credit } from "./Costumer.type";

const DB_INFO = {
    connection: process.env.CONNECTION_STRING as string,
    name: process.env.DB_NAME,
    Collection: 'Costumers'
}

export async function findCostumer(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();

        let costumers = await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).find(query, { projection }).toArray();
        return costumers

    } catch (error) {
        throw error
    }
    finally {
        mongo.close();
    }
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

export async function addcostumer(costumer: Costumer) {
    let mongo = new MongoClient(DB_INFO.connection);
    costumer.id = new ObjectId();
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).insertOne(costumer);
    } catch (error) {
        throw error;
    } finally {
        mongo.close();
    }
}

export async function updateDoc(card1: credit) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).updateOne(
            { _id: card1.id },
            { $set: { payment: card1 } }
        );
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function Updateuserinfo(user: Costumer) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();

        return await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).updateOne(
            { _id: user.id },
            { $set: user }
        )


    } catch (error) {
        throw error
    }
    finally {
        mongo.close();
    }
}

export async function NewPassfunc(password: string, id: ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        return await mongo.db(DB_INFO.name).collection(DB_INFO.Collection).updateOne(
            { _id: id },
            { $set: { password: password } }
        )
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}