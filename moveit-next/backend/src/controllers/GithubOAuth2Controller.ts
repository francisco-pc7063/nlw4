import axios, { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import knex from '../database/connection'
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
        const state = randomString(150)
        

        let userJwt = jwt.sign( { state }, jwtSecret)
        return res.status(200).json({
            state,
            jwt: userJwt,
        })
    }

    async resumeState(req: Request, res: Response){
        let { cookie } = req.body
        if(cookie == undefined) return res.status(400).json({ error: true, code: 400, message: "no client header OR cookie" })

        let userCookie = cookieParser.parse(cookie)
        let cookieData: any = jwt.verify(userCookie['JWT'], jwtSecret)
        
        return res.status(200).json({ state: cookieData.state })
    }


    async login(req: Request, res: Response){
        const { code, state } = req.body
        
        console.log(req.headers)
        console.log(req.headers.cookie)
        const cookies = cookieParser.parse(req.headers.cookie)
        //console.log(cookies)
        const jwtData: any = jwt.verify(cookies['JWT'], jwtSecret)
        //console.log(jwtData)
        const stateJwt = jwtData.state
        //console.log(code)
        

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
        if(access_token === undefined) return res.status(400).json({ error: true, code: 400, message: "Unable to generate token" })
        if(token_type === undefined) return res.status(400).json({ error: true, code: 400, message: "No token type" })

        axios({
            method: "GET",
            url: "https://api.github.com/user",
            headers: {
                Accept: 'application/json',
                Authorization: `token ${access_token}`
            }
        }).then(async (response) => {
            //console.log(response.data)
            const githubId = response.data['id']
            const avatarUrl = response.data['avatar_url']
            const apiUrl = response.data['url']
            const htmlUrl = response.data['html_url']
            try {
                await knex.raw(`
                        insert into moveit."user"(githubId, avatarurl, apiUrl, htmlUrl)
                        values(?, ?, ?, ?);
                    `, [githubId, avatarUrl, apiUrl, htmlUrl])
            } catch(err) {
                console.log(err)
                return res.status(500).json({ error: true, code: 500, message: "Server Error" })
            }
            try {
                await knex.raw(`
                    INSERT INTO moveit."session"
                    (user_id, access_token, token_type)
                    VALUES(?, ?, ?);
                `, [githubId, access_token, token_type])
            } catch(err) {
                console.log(err)
                return res.status(500).json({ error: true, code: 500, message: "Server Error" })
            }


            let userJwt = jwt.sign( { oauth: "GITHUB", githubId }, jwtSecret)

            return res.status(200).cookie("JWT", userJwt).json({
                redirectUrl: '/Home',
                redirectMsg: 'Successful',
                error: false, code: 200, message: "You shall pass"
            })
        })
    }
}


export default GithubOAuth2Controller