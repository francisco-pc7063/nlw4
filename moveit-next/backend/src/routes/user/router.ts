import express, { Request, Response } from 'express'
import { Logger } from "tslog"

var router = express.Router()
router.get("/", (req: Request, res: Response) => {
    res.json({ health: true })
})

// PREFIX = /user

//router.options('/user', user.options)



export default router