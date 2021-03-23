import { useContext, useEffect, useState } from 'react'
import router, { useRouter } from 'next/router'

import styles from '../styles/pages/LandingPage.module.css'
import { CookieContext } from '../contexts/CookieContext'
import { GetServerSideProps } from 'next'

import axios, { AxiosResponse } from 'axios'

interface LandingPageProps {
    baseUrl: string
}

export default function LandingPage(props: LandingPageProps) {
    const router = useRouter()
    const queryData = router.query
    const cookieContext = useContext(CookieContext)

    const [ serverState, setserverState ] = useState('')

    useEffect(() => {
        try {
            axios({
                method: "GET",
                url: `http://localhost:3001/api/auth/github/state`
            }).then((response) => {
                setserverState(response.data.state)
            })
        } catch (err) {
            console.log("Error while trying to reach the backend")
        }
    }, [])

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
                        <a className={styles.buttonReady} href={`https://github.com/login/oauth/authorize?client_id=0b7b70e2b164e5e15c46&state=${serverState}`}>GITHUB</a>
                    </div>
                </footer>
            </div>
        </div>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = process.env.BACKEND_URL
    return {
        props: {
            baseUrl
        }
    }
}