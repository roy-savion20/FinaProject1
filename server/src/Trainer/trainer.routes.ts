//ייבוא אובייקט 
import { Router } from 'express';
import { physicDeleteUser, getAll, getUserById, login, register, update } from './trainer.controller';

const TrainerRouter = Router();

TrainerRouter
    .get('/', getAll) //READ
    .get('/:id/', getUserById) //READ
    .post('/login', login) //READ
    .post('/register', register) //CREATE
    .put('/update/:id', update) //UPDATE
    .delete('/physic/delete/:id', physicDeleteUser) //DELETE

export default TrainerRouter;