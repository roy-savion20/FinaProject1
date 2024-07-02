//ייבוא אובייקט 
import { Router } from 'express';
import { physicDeleteUser, getAll, getUserById, login, register, update, logicDeleteUser } from './trainer.controller';

const TrainerRouter = Router();

TrainerRouter
    .get('/', getAll) //READ
    .get('/:id/', getUserById) //READ
    .post('/login', login) //READ
    .post('/register', register) //CREATE
    .put('/update/:id', update) //UPDATE
    .delete('/logic/delete/:id', logicDeleteUser) //DELETE
    .delete('/physic/delete/:id', physicDeleteUser) //DELETE

export default TrainerRouter;