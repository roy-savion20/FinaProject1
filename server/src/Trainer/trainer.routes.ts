//ייבוא אובייקט 
import { Router } from 'express';
import { physicDeleteUser, getAll, getUserById, login, register, update, UpdatePassword, updatePayment, addNewPost, getAllPostsById, showallposts, deletePost, AddNewDate, RemoveDate } from './trainer.controller';


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
    .post('/addnewpost/:id', addNewPost)
    .get('/getallpostsbyid/:id',getAllPostsById)
    .post('/showallposts',showallposts)
    .put('/deletePost/:id', deletePost)
    .post('/addnewdates/:id', AddNewDate)
    .put('/removedate/:id', RemoveDate)

export default TrainerRouter;