import { Router } from "express";
import { GetAllCostumrs, getCostumerById, LoginCostumer, RegisterCostumer } from "./Costumer.controler";

const CostumerRouter = Router();

CostumerRouter
    .get('/', GetAllCostumrs)
    .get('/:id/', getCostumerById)
    .post('/login',LoginCostumer)
    .post('/register', RegisterCostumer)

export default CostumerRouter;