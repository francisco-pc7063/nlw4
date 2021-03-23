import axios, { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import knex from '../database/connection'
import shell from 'shelljs'
import jwt from 'jsonwebtoken'


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
        let userHeaders = req.body.userHeaders || req.headers
        if(userHeaders === undefined) return res.status(400).json({ error: true, code: 400, message: "no client headers" })
    

        const checksum = shell.exec(`echo "${userHeaders}" | md5sum | cut -d " " -f1`).stdout
        const state = randomString(150)
        const data = await knex('moveit.users').select('id').where({
            user_headers: checksum
        })
        if(data.length === 0){
            await knex('moveit.users').insert({
                state,
                user_headers: checksum
            })
        }
        else if(data.length === 1){
            await knex('moveit.users').update({state}).where({ user_headers: checksum })
        }
        else {
            return res.status(500).json({ error: true, code: 500, message: "Uknown error" })
        }

        const token = jwt.sign({ userHeadersChecksum: checksum }, process.env.JWT_SECRET)

        res.cookie('auth', token)
        return res.status(200).json({
            state
        })
    }


    async login(req: Request, res: Response){
        const { code } = req.body
        const userHeaders = req.headers
        const checksum = shell.exec(`echo "${userHeaders}" | md5sum | cut -d " " -f1`).stdout

        const data = await knex('moveit.users').select("*").where({
            user_headers: checksum
        })
        console.log("DATABASE:", data.length)
        if(data.length === 0) return res.status(400).json({ error: true, code: 400, message: "Oops, something went wrong" })
        else if (data.length > 1) return res.status(400).json({ error: true, code: 500, message: "You shall not pass" })
        const { state  } = data[0]

        


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
                state: state
            }
        })
        const { access_token } = response.data
        console.log("Got access_token")

        await knex('moveit.users').update({
            access_token: access_token
        }).where({
            state,
            user_headers: checksum
        })
        return res.status(200).json({ error: true, code: 200, message: "You shall pass" })
    }
}


export default GithubOAuth2Controller