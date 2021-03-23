import axios from 'axios'
import { Request, Response } from 'express'
import knex from '../database/connection'

class UserController {
    async getUserInfo(req: Request, res: Response){


        let access_token = 'batata'
        const response2 = await axios({
            method: "POST",
            url: "https://api.github.com/user",
            headers: {
                Authorization: `token ${access_token}`,
                Accept: 'application/json'
            },
        })
    }
}


export default UserController