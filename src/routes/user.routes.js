import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller";
import { validateSignIn, validateSignUp } from "../middlewares/user.middlewares";

const router = Router()

router.post('/signup', validateSignUp, signUp)

router.post('/signin', validateSignIn, signIn)