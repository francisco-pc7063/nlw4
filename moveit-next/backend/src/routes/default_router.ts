import express, { Request, Response } from 'express'
var router = express.Router()

import { Logger } from "tslog"
const log = new Logger({ name: "RootRouterLogger" })

import authMiddleware from '../middleware/auth'

import authRouter from './auth/router'
import userRouter from './user/router'

router.get("/", (req: Request, res: Response) => {
    res.json({ health: true })
})

router.use("/auth", authRouter)

router.use("/user", authMiddleware)
router.use("/user", userRouter)


export default router