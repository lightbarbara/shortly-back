import { Router } from "express";
import { getUserData, signIn, signUp } from "../controllers/user.controller.js";
import { validateAuth, validateSignIn, validateSignUp, validateUserExistence } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/signup', validateSignUp, signUp)

router.post('/signin', validateSignIn, signIn)

router.get('/users/me', validateAuth, validateUserExistence, getUserData)

export default router