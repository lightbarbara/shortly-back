import { Router } from "express";
import { shortenUrl } from "../controllers/url.controller.js";
import { validateUrl } from "../middlewares/url.middlewares.js";
import { validateAuth } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/urls/shorten', validateAuth, validateUrl, shortenUrl)

router.get('/urls/:id',)

router.get('/urls/open/:shortUrl',)

router.delete('/urls/:id',)

router.get('/ranking',)

export default router