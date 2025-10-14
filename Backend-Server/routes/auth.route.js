import express from 'express';
import { Signout, Singin, Singup,sendotp,verifiedOTP,Reserpassword } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup',Singup);
authRouter.post('/signin',Singin);
authRouter.get('/signout',Signout);
authRouter.post('/send-otp',sendotp);
authRouter.post('/Reset-password',Reserpassword);
authRouter.post('/verifiy-otp',verifiedOTP);

export default authRouter;