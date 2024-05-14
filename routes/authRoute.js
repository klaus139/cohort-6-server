import express from 'express';
import { getAllUsers, loginUser, logoutUser, registerUser } from '../controller/user.controller.js';
import {authorizeRoles} from '../middleware/isAdmin.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser);
userRouter.get('/all-users',  getAllUsers);
userRouter.get('/logout', authorizeRoles(""), logoutUser);


export default userRouter;