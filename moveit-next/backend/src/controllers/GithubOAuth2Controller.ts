import axios, { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import knex from '../database/connection'
import shell from 'shelljs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie'

const jwtSecret = process.env.JWT_SECRET

function randomString(length: number) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}


class GithubOAuth2Controller {
    async options(req: Request, res: Response){
        return res.json({})
    }


    async createState(req: Request, res: Response){
        const { userHeaders, userIp } = req.body
        const headerData = userHeaders['user-agent'] + userHeaders['accept-encoding'] + userHeaders['accept-language']

        if(userHeaders === undefined) return res.status(400).json({ error: true, code: 400, message: "no client headers" })
    

        const checksum = shell.exec(`echo "${headerData}" | md5sum | cut -d " " -f1`).stdout
        const state = randomString(150)
        

        let userJwt = jwt.sign( { state, userHeaders: checksum, userIp }, jwtSecret)
        return res.status(200).json({
            state,
            jwt: userJwt,
        })
    }

    async resumeState(req: Request, res: Response){
        let { cookie, userHeaders } = req.body
        if(cookie == undefined || userHeaders == undefined) return res.status(400).json({ error: true, code: 400, message: "no client header OR cookie" })

        let userCookie = cookieParser.parse(cookie)
        let cookieData: any = jwt.verify(userCookie['JWT'], jwtSecret)
        
        return res.status(200).json({ state: cookieData.state })
    }


    async login(req: Request, res: Response){
        const { code, cookie, userHeaders, userIp } = req.body

        const cookieData: any = jwt.verify(cookie['JWT'], jwtSecret)
        const state = cookieData.state
        const oldHeaders = cookieData.userHeaders
        const oldIp = cookieData.userIp

        const headerData = userHeaders['user-agent'] + userHeaders['accept-encoding'] + userHeaders['accept-language']
        const checksum = shell.exec(`echo "${headerData}" | md5sum | cut -d " " -f1`).stdout

        if(checksum !== oldHeaders) console.log("Different headers from JWT to current")
        if(oldIp !== userIp) return console.log("Different ip from JWT to current")
        

        if(state === undefined) return res.status(400).json({ error: true, code: 400, message: "No state" })
        if(code === undefined) return res.status(400).json({ error: true, code: 400, message: "No code" })


        const response: AxiosResponse<any> = await axios({
            method: "POST",
            url: "https://github.com/login/oauth/access_token",
            headers: {
                Accept: 'application/json'
            },
            data: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
                state
            }
        })
        const { access_token, token_type } = response.data
        console.log("Got access_token")

        const userId = await knex('moveit.users').insert({
            access_token,
            token_type
        }).returning('id')
        //await knex('moveit.session')


        return res.status(200).json({ error: true, code: 200, message: "You shall pass" })
    }
}


export default GithubOAuth2Controller