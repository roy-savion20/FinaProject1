import { MongoClient, ObjectId } from "mongodb";
import { credit, Dates, TrainerUser } from "./trainer.type";

const DB_INFO = {
    connection: process.env.CONNECTION_STRING as string,
    name: process.env.DB_NAME,
    collection: 'Trainers'
}

/**
 * @param query - specify the criteria
 * @param project - specify which fields should be included or excluded in the query results.
 */
 

export async function NewPassfunc(password:string,id:ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            {_id: id},
            {$set: {password: password}}
        )
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}

export async function UpdateCard(card1 : credit) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { _id: card1.id },
            {$set: {payment: card1}}
        );
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}

export async function newdates(date: Dates, id: ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            {_id:id},
            {$addToSet: {openDates: date}}
        )
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}

export async function declareDate(date: Dates, id: ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect()
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            {_id: id},
            { $unset: { openDates: { date: date } } }
        )
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}

export async function NewPassfunc(password:string,id:ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            {_id: id},
            {$set: {password: password}}
        )
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}

export async function UpdateCard(card1 : credit) {
    let mongo = new MongoClient(DB_INFO.connection);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            { _id: card1.id },
            {$set: {payment: card1}}
        );
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}

export async function newdates(date: Dates, id: ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            {_id:id},
            {$addToSet: {openDates: date}}
        )
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}

export async function declareDate(date: Dates, id: ObjectId) {
    let mongo = new MongoClient(DB_INFO.connection);

    try {
        await mongo.connect()
        return await mongo.db(DB_INFO.name).collection(DB_INFO.collection).updateOne(
            {_id: id},
            { $unset: { openDates: { date: date } } }
        )
    } catch (error) {
        throw error;
    }
    finally{
        mongo.close();
    }
}