import { meneger } from "../admin/admin.type";
import { decryptPassword, encryptPassword } from "../utils/utils";
import { Request, Response } from "express"; 
import { logincost, regCostumer } from "./admin.model";
import { ObjectId } from "mongodb";

export async function RegisterCostumer(req : Request, res: Response) {
    let { email , password  } = req.body

    if(!password || !email)
        return res.status(400).json({ message: 'mossing info' })
    try {
        password = encryptPassword(password);
        let men : meneger = {
            email, password,
            id: new ObjectId
        }
        let result = await regCostumer(men)
        console.log(result)
        if(!result.insertedId)
            res.status(400).json({ message: 'registration faild' })
        else{
            men.id = result.insertedId;
            res.status(201).json({ men }) 
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function LoginCostumer(req: Request, res: Response) {
    let { email, password } = req.body;
    //בדיקה - אם לא נשלחו אימייל וסיסמה תחזיר את ההודעה 
    if (!email || !password)
        return res.status(400).json({ message: 'invalid email or password' });
    try {
        let user = await logincost(email);
        if (!user)
            res.status(404).json({ message: 'user not found' });
        //הפעלת הפונקציה לפענוח הסיסמה
        else if (decryptPassword(password, user.password))
            res.status(200).json({ user });
        else
            res.status(400).json({ message: 'invalid email or password' });
        
    } catch (error) {
        res.status(500).json({ error });
    }
}

