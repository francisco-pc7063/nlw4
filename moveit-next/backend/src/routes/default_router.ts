import express from 'express'
var router = express.Router()

import { Logger } from "tslog"
const log = new Logger({ name: "RootRouterLogger" })

import Controller from '../controllers/controller'
const controller = new Controller()
import authRouter from './auth/router'
import UserController from '../controllers/UserController'
const userController = new UserController()

router.use("/auth", authRouter)

router.use("/user", userController.getUserInfo)


export default router