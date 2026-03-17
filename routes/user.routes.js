// user routes API
// get all users or get user by id
// create user , update user , and delete user   APIs

import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers)

userRouter.get('/:id', getUser)

userRouter.post('/', (req, res) => res.send({ title: 'create new user' }))

userRouter.put('/:id', (req, res) => res.send({ title: 'Update user' }))

userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user' }))


export default userRouter;