import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CountDown } from '../../components/Countdown'
import { ExperienceBar } from '../../components/ExperienceBar'
import { Profile } from '../../components/Profile'
import { CompletedChallenges } from '../../components/CompletedChallenges'
import { ChallengeBox } from '../../components/ChallengeBox'
import { SideBar } from '../../components/SideBar'

import { ChallengesProvider } from '../../contexts/ChallengesContext'
import { CountdownProvider } from '../../contexts/CountdownContext'
import { CookieContext } from '../../contexts/CookieContext'

import styles from '../../styles/pages/Home.module.css'
import { useContext } from 'react'
import axios, { AxiosResponse } from 'axios'



export interface ChallengeProviderInterface {
    level: number
    currentExperience: number
    challengesCompleted: number
}

export interface ProfileProps {
    userName: string
    avatarUrl: string
}

export interface HomeProps extends ProfileProps {

}


export default function Home(props: HomeProps) {
    const cookieContext = useContext(CookieContext)
    
    return (
        <ChallengesProvider
            level={1}
            currentExperience={0}
            challengesCompleted={0}
        >
             <Head>
                <title>Inicio | move.it </title>
            </Head>

            <div className={styles.container}>
                <SideBar />
                
                <div className={styles.homeContainer}>
                    <ExperienceBar />
                    <CountdownProvider>
                        <section>
                            <div>
                                <Profile userName={props.userName} avatarUrl={props.avatarUrl}/>
                                <CompletedChallenges />
                                <CountDown />
                            </div>
                            <div>
                                <ChallengeBox />
                            </div>  
                        </section>
                    </CountdownProvider>
                </div>
                
            </div>
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    

    return {
        props: {
            userName: 'Francisco Pena',
            avatarUrl: 'https://avatars.githubusercontent.com/u/54912223?v=4'
        }
    }
    
}