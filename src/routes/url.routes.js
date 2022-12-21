import { Router } from "express";
import { shortenUrl } from "../controllers/url.controller.js";
import { validateAuth } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/urls/shorten', validateAuth, shortenUrl)

router.get('/urls/:id',)

router.get('/urls/open/:shortUrl',)

router.delete('/urls/:id',)

router.get('/ranking',)

export default router