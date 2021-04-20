import jwt from 'jsonwebtoken'
import cookieParser from 'cookie'
import { Request, Response, NextFunction } from 'express'
import { Logger } from 'tslog'


function middleware(req: Request, res: Response, next: NextFunction){
    const log = new Logger({ name: "authMiddleware" })

    const jwtSecret = process.env.JWT_SECRET
    const cookies = cookieParser.parse(req.headers.cookie)
    const jwtData: any = jwt.verify(cookies['JWT'], jwtSecret)

    res.locals.cookie = jwtData
    log.debug(jwtData)
    
    next()
}


export default middleware