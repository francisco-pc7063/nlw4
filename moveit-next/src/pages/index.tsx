import { useContext, useEffect, useState } from 'react'
import router from 'next/router'

import styles from '../styles/pages/LandingPage.module.css'
import { CookieContext } from '../contexts/CookieContext'
import { GetServerSideProps } from 'next'

import { HomeProps } from './Home'

export default function LandingPage(props:HomeProps) {
    const cookieContext = useContext(CookieContext)
    useEffect(() => {
        if(!props.userName && !props.avatarUrl){
            console.log("Rapaz, primeira opcao!")
            
        }
        else if(!props.userName && (typeof(props.avatarUrl) === 'string')){
            cookieContext.cleanUserCookie()
        }
        else {
            router.push('/Home')
        }
    }, [])
    
    const [ userName, setUsername ] = useState('')
    const [ userFetchError, setUserFetchError ] = useState(false)

    function renderButton(){
        if(userName === ''){
            return(
                <button className={styles.buttonDisabled}
                    onClick={getUser}>
                    <img src="/icons/submit.svg" alt="Submit"/>
                </button>
            )
        } else {
            return (
            <button className={styles.buttonReady}
                    onClick={getUser}>
                    <img src="/icons/submit.svg" alt="Submit"/>
            </button>
            )
        }
    }

    async function getUser(){
        const data = await cookieContext.setUser(userName)
        if(data.error === true) setUserFetchError(true)
        else {
            router.push('/Home')
        }
    }

    function renderError(){
        if(userFetchError){
            return(
                <>
                    <br/>
                    <p className={styles.error}>
                        Desculpe, nao foi possivel encontrar seu usuario, poderia verificar?
                    </p>
                </>
            )
        }
        else return null
    }

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
                            value={userName}
                            onChange={(value) => { setUsername(value.target.value) }}
                        />
                        {renderButton()}
                    </div>
                    {renderError()}
                </footer>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let { level, currentExperience, challengesCompleted, userData } = ctx.req.cookies
    const { userName, avatarUrl } = JSON.parse(userData)

    level = (level === '0') ? '1' : level

    return {
        props: {
            userName,
            avatarUrl,
            level: Number(level || 1),
            currentExperience: Number(currentExperience || 0),
            challengesCompleted: Number(challengesCompleted || 0)
        }
    }
}