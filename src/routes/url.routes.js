import { Router } from "express";
import { deleteUrl, getRanking, getUrlById, openUrl, shortenUrl } from "../controllers/url.controller.js";
import { validateUrl, validateUrlExistenceById, validateUrlExistenceByShortUrl, validateUrlUser } from "../middlewares/url.middlewares.js";
import { validateAuth } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/urls/shorten', validateAuth, validateUrl, shortenUrl)

router.get('/urls/:id', validateUrlExistenceById, getUrlById)

router.get('/urls/open/:shortUrl', validateUrlExistenceByShortUrl, openUrl)

router.delete('/urls/:id',validateAuth, validateUrlExistenceById, validateUrlUser, deleteUrl)

router.get('/ranking', getRanking)

export default router