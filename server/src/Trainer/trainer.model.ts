import { ObjectId } from "mongodb";
import { checkIfDocumentExists, findUsers, insertUser, updateDoc, deleteUser, decativateUser, NewPassfunc, UpdateCard, newdates, declareDate } from "./trainer.db";
import { credit, Dates, TrainerUser } from "./trainer.type";

export async function getAllUsers() {
    let query = {
        $or: [
            { isActive: { $exists: false } },
            { isActive: true }
        ]
    }
    return await findUsers(query);
}

export async function findUserById(id: string) {
    try {
        let query = { _id: new ObjectId(id) }
        let users = await findUsers(query);
        return users[0];
    } catch (error) {
        throw error;
    }

}

export async function loginUser(email: string) {
    try {
        let query = { email: email}
        let users = await findUsers(query);
        return users[0];
    } catch (error) {
        throw error;
    }
}

export async function registerUser(user: TrainerUser) {
    try {
        //האם המייל קיים כבר במאגר
        let query = { email: user.email }
        let userExists = await checkIfDocumentExists(query);
        if (userExists > 0) {
            console.log('userExists', userExists);
            throw new Error("email already exists!");
        }

        //הצפנת הסיסמה

        //הוספה למאגר
        return await insertUser(user);
    } catch (error) {
        throw error;
    }
}

export async function updateUser(id: string, email: string, password: string, location: any) {
    try {
        let user: TrainerUser = {
            email, password, _id: new ObjectId(id), location,
        }
        console.log(user)
        return await updateDoc(user);
    } catch (error) {
        throw error;
    }
}



export async function removeUser(id: string) {
    try {
        return await deleteUser(id);
    } catch (error) {
        throw error;
    }
}

export async function deactiveUser(id: string) {
    try {
        return await decativateUser(id);
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

export async function checkUpdate(id: string, card: string, date: string, ccv: string) {
    try {
        let credit1: credit = { id: new ObjectId(id), card, date, ccv }
        return await UpdateCard(credit1);
    } catch (error) {
        throw error;
    }
}



export async function AddDate(date: string,time:string, id: string) {
    try {
        let _id = new ObjectId(id);
        let newdate : Dates =  { date ,time }
        return await newdates(newdate,_id)
    } catch (error) {
        throw error;
    }
}

export async function DeleteDate(date: string,time:string, id: string) {
    try {
        let _id = new ObjectId(id);
        let newdate : Dates =  { date ,time }
        console.log(newdate)
        return await declareDate(newdate,_id)
    } catch (error) {
        throw error;
    }
}