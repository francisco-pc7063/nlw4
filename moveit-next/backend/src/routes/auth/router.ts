import express, { Request, Response } from 'express'
import { Logger } from "tslog"

var router = express.Router()
router.get("/", (req: Request, res: Response) => {
    res.json({ health: true })
})

// PREFIX = /auth
import GithubOAuth2Controller from '../../controllers/GithubOAuth2Controller'
const githubOAuth2Controller = new GithubOAuth2Controller()
//router.options('/github', githubOAuth2Controller.options)
router.post('/github/state', githubOAuth2Controller.createState)
router.get('/github/state', githubOAuth2Controller.resumeState)
router.post('/github/login', githubOAuth2Controller.login)


export default router