import { Router } from "express";
import { getUrlById, shortenUrl } from "../controllers/url.controller.js";
import { validateUrl, validateUrlExistence } from "../middlewares/url.middlewares.js";
import { validateAuth } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/urls/shorten', validateAuth, validateUrl, shortenUrl)

router.get('/urls/:id', validateUrlExistence, getUrlById)

router.get('/urls/open/:shortUrl',)

router.delete('/urls/:id',)

router.get('/ranking',)

export default router