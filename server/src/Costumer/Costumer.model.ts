import { ObjectId } from "mongodb";
import { Costumer, credit } from "./Costumer.type";
import { addcostumer, checkifexists, findCostumer, updateDoc } from "./Costumer.db";
import { TrainerUser } from "../Trainer/trainer.type";

export async function getallcostumers1() {
    let query = {
        $or: [
            { isActive: { $exists: false } },
            { isActive: true }
        ]
    }
    return await findCostumer(query)
}

export async function findcostumerbyID(id: string) {
    try {
        let query = { _id: new ObjectId(id) }
        let costumers = await findCostumer(query)
        return costumers[0];
    } catch (error) {
        throw error
    }
}

export async function logincost(email: string) {
    try {
        let query = { email: email }
        let costumers = await findCostumer(query);
        return costumers[0];
    } catch (error) {
        throw error;
    }
}

export async function regCostumer(costumer: Costumer) {
    try {
        let query = { email: costumer.email }
        let costumerExists = await checkifexists(query)
        if (costumerExists > 0) {
            console.log('costumerExists', costumerExists);
            throw new Error("email already exists")
        }
        return await addcostumer(costumer)
    } catch (error) {
        throw error
    }
}

export async function checkUpdate(id: string, card: string, date: string, ccv: string) {
    try {
        let credit1: credit = { id: new ObjectId(id), card, date, ccv }
        return await updateDoc(credit1);
    } catch (error) {
        throw error;
    }
}