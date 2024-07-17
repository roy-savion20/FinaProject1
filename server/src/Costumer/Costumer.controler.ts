import { Request,Response } from "express";
import { Costumer } from "./Costumer.type";
import { decryptPassword, encryptPassword } from "../utils/utils";
import { ChangePass, CheckInfo, checkUpdate, findcostumerbyID, getallcostumers1, logincost, regCostumer } from "./Costumer.model";
import { ObjectId } from "mongodb";

export async function GetAllCostumrs(req: Request, res : Response) {
    try {
        let costumers = await getallcostumers1();
        if(costumers?.length == 0)
            res.status(200).json({ message: 'no costumers inside', costumers })
        else
            res.status(200).json({ costumers })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function getCostumerById(req : Request, res: Response) {
    let { id } = req.params;
    if(id.length != 24)
        return res.status(500).json({message : 'most provide valid id'})
    try {
        let costumer = await findcostumerbyID(id)
        if(!costumer)
            res.status(400).json({ message: 'costumer not found' })
        else
            res.status(200).json({ costumer })
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

export async function RegisterCostumer(req : Request, res: Response) {
    let { name , email , location , password , dogBreed, payment } = req.body

    if(!name || !password || !email)
        return res.status(400).json({ message: 'mossing info' })
    try {
        password = encryptPassword(password);
        let costumer : Costumer = { name , email , location , password , dogBreed, payment }
        let result = await regCostumer(costumer)
        console.log(result)
        if(!result.insertedId)
            res.status(400).json({ message: 'registration faild' })
        else{
            costumer.id = result.insertedId;
            res.status(201).json({ costumer }) 
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function updatePayment(req: Request, res: Response) {
    let { id } = req.params
    let { card, date, ccv } = req.body

    if(!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    if(!card || !date || !ccv)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await checkUpdate(id,card,date,ccv);
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function UpdateInfo(req: Request, res: Response) {
    let { id } = req.params;
    let { name,location,dogBreed } = req.body;
    
    if(!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    if(!name || !location || !dogBreed)
        return res.status(400).json({ msg: "invalid info" })

    try {
        let result = await CheckInfo(id,name,location,dogBreed);
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }

}

export async function UpdatePassword(req: Request, res: Response) {
    let { id } = req.params;
    let { password } = req.body;
    
    if(!id || id.length < 24)
        return res.status(400).json({ msg: "invalid id" })

    if(!password)
        return res.status(400).json({ msg: "invalid info" })

    try {
        password = encryptPassword(password);
        let result = await ChangePass(password,id);
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}