import { Router } from "express";
import { getUrlById, openUrl, shortenUrl } from "../controllers/url.controller.js";
import { validateUrl, validateUrlExistenceById, validateUrlExistenceByShortUrl } from "../middlewares/url.middlewares.js";
import { validateAuth } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/urls/shorten', validateAuth, validateUrl, shortenUrl)

router.get('/urls/:id', validateUrlExistenceById, getUrlById)

router.get('/urls/open/:shortUrl', validateUrlExistenceByShortUrl, openUrl)

router.delete('/urls/:id',)

router.get('/ranking',)

export default router