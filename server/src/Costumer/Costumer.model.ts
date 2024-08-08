import { ObjectId } from "mongodb";
import { Costumer, credit } from "./Costumer.type";
import { addcostumer, checkifexists, findCostumer, NewPassfunc, updateDoc, Updateuserinfo } from "./Costumer.db";
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
        let query = { email: costumer.email };
        let CostumerExists = await checkifexists(query);

        if (CostumerExists > 0) {
            console.log('CostumerExists', CostumerExists);
            throw new Error("email already exists");
        }

        return await addcostumer(costumer);
    } catch (error) {
        throw error;
    }
}

export async function checkUpdate(id: string, card: string, date: string, cvv: string) {
    try {
        let credit1 = { id: new ObjectId(id), card, date, cvv }
        return await updateDoc(credit1);
    } catch (error) {
        throw error;
    }
}

export async function CheckInfo(id:string,first_name:string,last_name:string,email:string,phone:string,dob:string,image:string,update_details:string,clientType:string,location:string,password:string,payment:credit) {
    try {
        let updateuser : Costumer = {id : new ObjectId(id),first_name,last_name,email,phone,dob,image,update_details,clientType,location,password,payment};
        return await Updateuserinfo(updateuser)
    } catch (error) {
        throw error;
    }
}

export async function ChangePass(password: string,id:string) {
    try {
        let newPass: string = password
        let _id = new ObjectId(id)
        return await NewPassfunc(newPass,_id);
    } catch (error) {
        throw error;
    }
}