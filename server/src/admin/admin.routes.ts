import { Router } from "express";  
import { getAll, getUserById, logicDeleteUser, update } from "../Trainer/trainer.controller";
import { GetAllCostumrs, getCostumerById } from "../Costumer/Costumer.controler";
import { RegisterCostumer, LoginCostumer } from "./admin.controller";

const AdminRouter = Router();

AdminRouter
    .get('/allTrainers', getAll)
    .get('/allcostumers', GetAllCostumrs)
    .get('/allTrainers/:id', getUserById)
    .get('/allcostumers/:id', getCostumerById)
    .post('/login', LoginCostumer)
    .post('/register', RegisterCostumer)
    .put('/update/:id', update)
    .delete('/logic/delete/:id', logicDeleteUser)

export default AdminRouter;