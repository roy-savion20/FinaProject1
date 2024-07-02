import { ObjectId } from "mongodb";
import { checkIfDocumentExists, decativateUser, findUsers, insertUser, updateDoc, deleteUser } from "./trainer.db";
import { User } from "./trainer.type";

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

export async function registerUser(user: User) {
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
        let user: User = { email, password, _id : new ObjectId(id),location }
        console.log(user)
        return await updateDoc(user);
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

export async function removeUser(id: string) {
    try {
        return await deleteUser(id);
    } catch (error) {
        throw error;
    }
}