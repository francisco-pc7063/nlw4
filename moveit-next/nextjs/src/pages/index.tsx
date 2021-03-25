import { useContext, useEffect, useState } from 'react'
import router, { useRouter } from 'next/router'

import styles from '../styles/pages/LandingPage.module.css'
import { CookieContext } from '../contexts/CookieContext'
import { GetServerSideProps } from 'next'

import axios, { AxiosResponse } from 'axios'

interface LandingPageProps {
    state: string
}

export default function LandingPage(props: LandingPageProps) {
    const router = useRouter()
    const queryData = router.query
    const cookieContext = useContext(CookieContext)

    return (
        <div className={styles.LandingPageContainer}>
            <div className={styles.backgroundLogoContainer}>
                <img src="/background-logo.svg" />
            </div>
            <div className={styles.loginContainer}>
                <header>
                    <img src="/full-logo.svg" alt="move.it"/>
                </header>

                <main>
                    <p>Bem-vindo</p>
                    <div>
                        <img src="/icons/github.svg" alt="Github"/>
                        <p>Faça login com seu Github para começar</p>
                    </div>
                </main>
                <footer>
                    <div>
                        <input
                            type="text"
                            autoFocus
                            placeholder="Digite o seu username"
                            onChange={(value) => {  }}
                        />
                        <a className={styles.buttonReady} href={`https://github.com/login/oauth/authorize?client_id=0b7b70e2b164e5e15c46&state=${props.state}`}>GITHUB</a>
                    </div>
                </footer>
            </div>
        </div>
    )
}


import cookie from 'cookie'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const backendUrl = process.env.BACKEND_URL
    

    let response: AxiosResponse<any>
    let userCookie: any
    try {
        userCookie = cookie.parse(ctx.req.headers.cookie)
    } catch (err) {
        
    }
    if(userCookie !== undefined){
        try {
            response = await axios({
                method: 'GET',
                url: `${backendUrl}auth/github/state`,
                data: {
                    cookie: ctx.req.headers.cookie,
                    userHeaders: ctx.req.headers,
                    userIp: ctx.req.headers['x-forwarded-for']
                }
            })
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            response = await axios({
                method: 'POST',
                url: `${backendUrl}auth/github/state`,
                data: {
                    userHeaders: ctx.req.headers,
                    userIp: ctx.req.headers['x-forwarded-for']
                }
            })
            const jwt = response.data.jwt

            const sessionCookie = cookie.serialize("JWT", jwt)
            ctx.res.setHeader('Set-Cookie', sessionCookie)
            console.log(sessionCookie)

            
        } catch (err) {
            console.log(err)
        }
    }
    return {
        props: {
            state: response.data.state
        }
    }
}