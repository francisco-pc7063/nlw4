import express from 'express'
import { Logger } from "tslog"

var router = express.Router()


// PREFIX = /auth
import GithubOAuth2Controller from '../../controllers/GithubOAuth2Controller'
const githubOAuth2Controller = new GithubOAuth2Controller()
router.options('/github', githubOAuth2Controller.options)
router.get('/github/state', githubOAuth2Controller.createState)
router.post('/github/login', githubOAuth2Controller.login)


export default router