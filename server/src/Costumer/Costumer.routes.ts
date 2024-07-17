import { Router } from "express";
import { GetAllCostumrs, getCostumerById, LoginCostumer, RegisterCostumer, UpdateInfo, UpdatePassword, updatePayment } from "./Costumer.controler";



const CostumerRouter = Router();

CostumerRouter
    .get('/', GetAllCostumrs)
    .get('/:id/', getCostumerById)
    .post('/login',LoginCostumer)
    .post('/register', RegisterCostumer)
    .put('/updatePayment/:id', updatePayment)
    .put('/updateinfo/:id',UpdateInfo)
    .put('/updatepassword/:id',UpdatePassword)

export default CostumerRouter;