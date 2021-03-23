import { Request, Response } from 'express'

class UserController {
    async createUser(req: Request, res: Response){
        res.send("BATATA!")
    }
}


export default UserController