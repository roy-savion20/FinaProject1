//ייבוא אובייקט 
import { Router } from 'express';
import { physicDeleteUser, getAll, getUserById, login, register, update, UpdatePassword, updatePayment } from './trainer.controller';


const TrainerRouter = Router();

TrainerRouter
    .get('/', getAll) 
    .get('/:id/', getUserById) 
    .post('/login', login) 
    .post('/register', register) 
    .put('/update/:id', update) 
    .delete('/physic/delete/:id', physicDeleteUser)
    .put('/updatepassword/:id',UpdatePassword)
    .put('/updatePayment/:id', updatePayment)

export default TrainerRouter;