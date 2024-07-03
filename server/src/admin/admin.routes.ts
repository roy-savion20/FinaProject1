import { Router } from "express";  
import { getAll, getUserById } from "../Trainer/trainer.controller";
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
    .put('/update/:id', )
    .delete('/physic/delete/:id', )

export default AdminRouter;