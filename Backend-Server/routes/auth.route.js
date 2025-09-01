import express from 'express';
import { Signout, Singin, Singup } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/signup',Singup);
authRouter.post('/signin',Singin);
authRouter.post('/signout',Signout);

export default authRouter;