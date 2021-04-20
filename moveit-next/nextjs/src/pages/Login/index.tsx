import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import cookieParser from 'cookie'

import styles from '../../styles/pages/Login.module.css'

import { SideBar } from '../../components/SideBar'

export interface LoadingProps {
    redirectUrl: string,
    redirectMessage: string
}

export default function Loading(props: LoadingProps){
    const router = useRouter()

    useEffect(() => {
        console.log("Redirecting to:", props.redirectUrl)
        if(props.redirectUrl !== '/') router.push(props.redirectUrl)
    }, [])

    return(
        <div className={styles.loginContainer}>
            <SideBar />
            <img src="/icons/loading.svg"/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const backendUrl = process.env.BACKEND_URL

    const queryStr = ctx.query
    const { code, state } = queryStr

    let redirectUrl: string, redirectMsg: string
    let props: {
        redirectUrl: string,
        redirectMsg: string
    }
    try {
        let response = await axios({
            method: "POST",
            url: backendUrl + 'auth/github/login',
            headers: {
                Cookie: ctx.req.headers.cookie
            },
            data: {
                code,
                state
            }})
            let { data } = response
            redirectUrl = data.redirectUrl
            redirectMsg = data.redirectMsg
            console.log(redirectUrl, redirectMsg)
            
            props = {
                redirectUrl,
                redirectMsg
            }
            
    } catch (err) {
        console.log("AXIOS ERROR:", err.response.data)
        props = {
            redirectUrl: '/',
            redirectMsg: "Uknown error"
        }
    }

    return { props }
}